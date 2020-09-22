<template>
  <Page @loaded="loaded()">
    <AppHeading title="Place List" can-go-back/>

    <template v-if="!hasLoaded">
      <ActivityIndicator :busy="true" width="100" height="100"></ActivityIndicator>
    </template>

    <template v-else>
      <FlexboxLayout flexDirection="column" justifyContent="space-between">
        <SearchBar v-model="search.term" @submit="runSearch()" @loaded="searchLoaded($event)" flexShrink="0"/>

        <template v-if="places.length > 0">
          <ListView flexGrow="1" v-if="places.length > 0" for="place in places"
                    @loadMoreItems="loadMoreEateries($event)">
            <v-template>
              <FlexboxLayout flexDirection="row" class="eatery">
                <StackLayout class="details">
                  <Label :textWrap="true" class="title" :text="place.name + ' - ' + place.town.town"></Label>
                  <Label :textWrap="true" class="info" :text="placeInfo(place)"></Label>
                  <Label :textWrap="true" class="info" :text="place.address.replace(/\<br \/\>/g, ', ')"></Label>
                </StackLayout>
                <FlexboxLayout flexDirection="column" justifyContent="space-between" class="buttons" flexShrink="0">
                  <StackLayout class="meta" flexGrow="1">
                    <Label class="icon" :class="place.type.type === 'att' ? 'fab' : 'fas'"
                           :text="placeIcon(place) | fonticon"></Label>
                    <Label class="rating" v-if="place.average_rating" :textWrap="true">
                      <Span :text="formattedRating(place.average_rating) + ' '"></Span>
                      <Span class="fas" :text="'fa-star' | fonticon"></Span>
                      <Span :text="`\n(${place.ratings.length} ratings)`"></Span>
                    </Label>
                  </StackLayout>
                  <Button text="Details" @tap="viewPlaceDetails(place)"></Button>
                </FlexboxLayout>
              </FlexboxLayout>
            </v-template>
          </ListView>
        </template>

        <Label class="noPlaces" v-else>
          No places found...
        </Label>

        <StackLayout orientation="horizontal" class="bottomBar" flexShrink="0">
          <Button class="fas gps-button" :text="'fa-map-marker-alt' | fonticon" @tap="goToCurrentLocation()"></Button>
          <Button text="Filters" @tap="openFiltersModal()"></Button>
          <Button :text="'Range: ' + search.range + 'm'" @tap="openRangeSelectModal"></Button>
        </StackLayout>
      </FlexboxLayout>
    </template>
  </Page>
</template>

<script>
import AppHeading from "../AppHeading";
import MakesApiRequests from "../../mixins/MakesApiRequests";
import RangeSelect from "../Modals/RangeSelect";
import HasVenueTypeFilter from "../../mixins/HasVenueTypeFilter";
import Filters from "../Modals/Filters";
import GetsLocation from "../../mixins/GetsLocation";
import PlaceDetails from "../Modals/PlaceDetails";
import HasAnalytics from "../../mixins/HasAnalytics";
import DisplaysAd from "../../mixins/DisplaysAd";

export default {
  components: {AppHeading},

  mixins: [
    GetsLocation,
    HasAnalytics,
    HasVenueTypeFilter,
    MakesApiRequests,
    DisplaysAd,
  ],

  data: () => ({
    hasLoaded: false,

    search: {
      term: 'London',
      lat: 0,
      lng: 0,
      range: 5,
    },

    currentPage: 1,
    totalPages: 1,

    places: [],
  }),

  methods: {
    loaded() {
      this.createAd();

      this.pushScreenView('list');

      this.loadVenueTypes(() => {
        this.getLocation().then((coordinates) => {
          this.search.term = '';
          this.search.lat = coordinates.latitude;
          this.search.lng = coordinates.longitude;

          this.runSearch();
        }).catch(() => {
          this.runSearch();
        });
      });

      this.$root.$on('search-range-change', (value) => {
        this.search.range = value;
        this.runSearch();
      });
    },

    placeIcon(place) {
      switch (place.type.type) {
        case 'att':
          return 'fa-fort-awesome';
        case 'hotel':
          return 'fa-bed';
        default:
          return 'fa-utensils';
      }
    },

    loadMoreEateries() {
      if (this.currentPage < this.totalPages) {
        setTimeout(() => {
          this.currentPage++;

          this.getPlaces();
        }, 500);

        this.logAnalyticEvent('loaded_more_eateries', [
          {
            key: 'lat',
            value: this.search.lat,
          },
          {
            key: 'lng',
            value: this.search.lng,
          },
          {
            key: 'search_string',
            value: this.search.term,
          },
          {
            key: 'page_number',
            value: this.currentPage,
          }
        ])
      }
    },

    getPlaces() {
      this.apiSearchPlaces(this.search, {venueType: this.getFilters()}, this.currentPage)
          .then((response) => {
            this.totalPages = response.data.data.last_page;

            let places = response.data.data.data;

            //
            // Object.keys(response.data.data.appends).forEach((id) => {
            //   const index = this.places.findIndex((place) => {
            //     console.log(place);
            //     return place.id === id;
            //   });
            //   alert(index);
            //   this.$set(this.places[index], 'distance', response.data.data.appends[id].distance);
            // });

            this.places.push(...places);
          })
          .finally(() => {
            this.hasLoaded = true;
          })
    },

    placeInfo(place) {
      let info = place.info;

      if (place.type.type === 'att') {
        info = place.restaurants[0].info;
      }

      return info.replace(/\<br \/\>/g, '\n')
    },

    runSearch() {
      if (this.search.term !== '') {
        this.search.lat = 0;
        this.search.lng = 0;
      }

      this.hasLoaded = false;
      this.currentPage = 1;
      this.places = [];
      this.getPlaces();

      this.logAnalyticEvent('ran-place-search', [
        {
          key: 'lat',
          value: this.search.lat,
        },
        {
          key: 'lng',
          value: this.search.lng,
        },
        {
          key: 'search_string',
          value: this.search.term,
        }
      ])
    },

    searchLoaded($event) {
      if ($event.object.android) {
        $event.object.android.clearFocus();
      }
    },

    goToCurrentLocation() {
      this.getLocation().then((coordinates) => {
        this.search.term = '';
        this.search.lat = coordinates.latitude;
        this.search.lng = coordinates.longitude;
      }).finally(() => {
        this.runSearch();
      });

      this.logAnalyticEvent('gone-to-location')
    },

    openRangeSelectModal() {
      this.$showModal(RangeSelect, {
        props: {
          currentValue: this.search.range
        }
      });
    },

    openFiltersModal() {
      this.$showModal(Filters, {
        fullscreen: true,
        props: {
          filters: this.venueTypes,
        }
      }).then(() => {
        this.runSearch();
      });
    },

    formattedRating(rating) {
      return Math.round(rating * 2) / 2;
    },

    viewPlaceDetails(place) {
      this.$showModal(PlaceDetails, {
        fullscreen: true,
        props: {
          place: place,
        },
      });
    }
  },

  watch: {
    venueTypes: {
      deep: true,
      handler: function () {
        this.runSearch();
      },
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
  padding-bottom: 50;
}

ListView {
  background-color: #addaf9;
}

ActivityIndicator {
  color: #DBBC25;
}

SearchBar {
  background-color: #ffffff;
  padding: 5;
}

.eatery {
  margin-bottom: 10;
  display: flex;
  color: black;

  .details {
    flex: 1;
    flex-direction: column;

    .title, .info {
      padding: 10;
      margin: 0;
    }

    ƒ
    .title {
      font-weight: bold;
      padding-bottom: 5;
      font-size: 16;
    }

    .info {
      font-weight: normal;
      padding-top: 0;
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    text-align: right;

    .meta {
      flex-grow: 1;

      .icon {
        font-size: 30;
        color: #DBBC25;
        padding: 10;
        text-align: right;
      }

      .rating {
        text-align: right;
        color: #000;

        .fas {
          color: #DBBC25;
        }
      }
    }

    Button {
      background: #DBBC25;
      text-align: center;
      margin-top: auto;
      flex-shrink: 1;
    }
  }
}

.bottomBar {
  padding: 2;
  background: #fff;
}

.fa {
  font-size: 25;
}

.gps-button {
  width: 60;
  padding: 0;
}

.noPlaces {
  text-align: center;
  font-size: 20;
  padding-top: 30;
  flex-grow: 1;
}
</style>
