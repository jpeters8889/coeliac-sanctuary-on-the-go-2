<template>
  <Page>
    <AppHeading title="Nationwide Places" can-go-back/>

    <FlexboxLayout flexDirection="column">
      <StackLayout flexShink="0" class="heading">
        <FlexboxLayout justifyContent="space-between" alignItems="center" class="trigger">
          <Label text="What are Nationwide Eateries?" @tap="showNationwideInfo = !showNationwideInfo"
                 flexGrow="1"></Label>
          <Label class="fas" :text="nationwideAccordionIcon | fonticon" flexShrink="0"
                 @tap="showNationwideInfo = !showNationwideInfo"></Label>
        </FlexboxLayout>
        <Label :textWrap="true" v-if="showNationwideInfo"
               :text="'Our list of Nationwide Eateries are Restaurants, Pubs, Cafe\'s etc accross the UK that offer gluten free options or have a full gluten free menu.\n\nUnfortunately due to number of branches some of these eateries have we are unable to list any locations, please refer to the eateries website to find your nearest branch.'"></Label>
      </StackLayout>

      <template v-if="!hasLoaded">
        <ActivityIndicator :busy="true" width="100" height="100"></ActivityIndicator>
      </template>

      <template v-else>
        <ListView flexGrow="1" for="place in places" @loadMoreItems="loadMoreEateries($event)">
          <v-template>
            <StackLayout class="eatery">
              <FlexboxLayout justifyContent="space-between" align-items="baseline" class="header">
                <Label flexGrow="1" :text="place.name"></Label>
                <Label class="icon" :class="place.type.type === 'att' ? 'fab' : 'fas'"
                       :text="placeIcon(place) | fonticon"></Label>
              </FlexboxLayout>
              <Label class="description" :text="placeInfo(place)" :textWrap="true"></Label>
            </StackLayout>
          </v-template>
        </ListView>
      </template>
    </FlexboxLayout>
  </Page>
</template>

<script>
import AppHeading from "../AppHeading";
import MakesApiRequests from "../../mixins/MakesApiRequests";

export default {
  components: {
    AppHeading
  },

  mixins: [
    MakesApiRequests,
  ],

  data: () => ({
    showNationwideInfo: false,

    hasLoaded: false,

    currentPage: 1,
    totalPages: 1,
    places: [],
  }),

  mounted() {
    this.runSearch();
  },

  methods: {
    runSearch() {
      this.hasLoaded = false;
      this.currentPage = 1;
      this.places = [];

      this.getPlaces();
    },

    getPlaces() {
      this.apiGetNationwidePlaces(this.currentPage)
          .then((response) => {
            this.totalPages = response.data.data.last_page;

            let places = response.data.data.data;

            this.places.push(...places);
          })
          .finally(() => {
            this.hasLoaded = true;
          });
    },

    loadMoreEateries() {
      if (this.currentPage < this.totalPages) {
        setTimeout(() => {
          this.currentPage++;

          this.getPlaces();
        }, 500);
      }
    },

    placeInfo(place) {
      let info = place.info;

      if (place.type.type === 'att') {
        info = place.restaurants[0].info;
      }

      return info.replace(/\<br \/\>/g, '\n')
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
    }
  },

  computed: {
    nationwideAccordionIcon() {
      return this.showNationwideInfo ? 'fa-caret-up' : 'fa-caret-down';
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
}

.heading {
  background-color: transparentize(#80CCFC, 0.5);
  width: 100%;
  flex-shrink: 0;
  border-bottom-width: 1;
  border-color: #DBBC25;

  .trigger {
    Label {
      font-size: 18;
      font-weight: bold;
    }
  }
}

ListView {
  background-color: #addaf9;
}

ActivityIndicator {
  color: #DBBC25;
}

.eatery {
  margin-bottom: 10;

  .header Label {
    font-size: 18;
    font-weight: bold;
  }
}
</style>
