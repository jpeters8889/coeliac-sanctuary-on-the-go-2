<template>
  <Page @loaded="loaded()">
    <AppHeading title="Map of Places" can-go-back/>

    <FlexboxLayout flexDirection="column" justifyContent="space-between">
      <SearchBar v-model="search.term" @submit="runSearch()" @loaded="searchLoaded($event)" flexShrink="0"/>

      <template v-if="loading">
        <ActivityIndicator :busy="true" width="100" height="100"></ActivityIndicator>
      </template>

      <template v-else>
        <MapView iosOverflowSafeArea="true"
                 :latitude="search.lat"
                 :longitude="search.lng"
                 :zoom="zoom"
                 :moveOnMarkerPress="false"
                 height="100%"
                 flexGrow="1"
                 @mapReady="onMapReady"
                 @cameraChanged="mapMoved"
                 @markerSelect="onMarkerSelect"
                 @markerInfoWindowTapped="onMarkerInfoWindowTapped">
        </MapView>
      </template>

      <StackLayout orientation="horizontal" class="bottomBar" flexShrink="0">
        <Button text="Filters" @tap="openFiltersModal()"></Button>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Filters from "../Modals/Filters";
import AppHeading from "../AppHeading";
import GetsLocation from "../../mixins/GetsLocation";
import MakesApiRequests from "../../mixins/MakesApiRequests";
import HasVenueTypeFilter from "../../mixins/HasVenueTypeFilter";
import {isAndroid, isIOS} from "tns-core-modules/platform";
import PlaceDetails from "../Modals/PlaceDetails";
import HasAnalytics from "../../mixins/HasAnalytics";
import DisplaysAd from "../../mixins/DisplaysAd";

const application = require("tns-core-modules/application");
const mapsModule = require("nativescript-google-maps-sdk");

export default {
  mixins: [
    GetsLocation,
    HasAnalytics,
    MakesApiRequests,
    HasVenueTypeFilter,
    DisplaysAd,
  ],

  components: {
    AppHeading,
  },

  data: () => ({
    search: {
      term: 'London',
      lat: 51.5073509, // London
      lng: -0.1277583, // London
      range: 18,
    },

    zoom: 10,

    places: [],

    mapView: undefined,

    openedMarker: null,

    loading: true,
  }),

  methods: {
    loaded() {
      this.createAd();

      this.pushScreenView('map');

      this.loadVenueTypes(() => {
        this.getLocation().then((coordinates) => {
          this.search.term = '';
          this.search.lat = coordinates.latitude;
          this.search.lng = coordinates.longitude;

          this.loading = false;
          this.runSearch();
        }).catch(() => {
          this.runSearch();
        });
      });
    },

    getPlaces() {
      this.apiSearchPlaces(this.search, {venueType: this.getFilters()}, 1, 50).then((response) => {
        this.totalPages = response.data.data.last_page;

        let places = response.data.data.data;

        places.forEach((place) => {
          if (this.places.filter((currentPlace) => currentPlace.id === place.id).length > 0) {
            return;
          }

          this.places.push(place);
        });

        this.placesLoaded();
      });
    },

    placesLoaded(tryAgain = true) {
      if (this.mapView) {
        this.places.forEach((place) => {
          const marker = new mapsModule.Marker();

          marker.position = mapsModule.Position.positionFromLatLng(
              place.lat,
              place.lng
          );

          marker.place = place;
          marker.title = place.name;
          marker.info = place.info;
          marker.address = place.address.replace(/\<br \/\>/g, ', ');
          marker.color = '#80CCFC'

          this.mapView.addMarker(marker);
        });
      }

      if (tryAgain) {
        setTimeout(() => this.placesLoaded(false), 500);
      }
    },

    mapMoved() {
      this.search.lat = this.mapView.latitude;
      this.search.lng = this.mapView.longitude;

      this.getPlaces();
    },

    onMapReady(args) {
      this.mapView = args.object;
      this.mapView.myLocationEnabled = true;
      this.mapView.zoomGesturesEnabled = true;

      const gMap = this.mapView.gMap;

      this.mapView.settings.zoomGesturesEnabled = true;
      this.mapView.settings.zoomControlsEnabled = true;
      this.mapView.settings.mapToolbarEnabled = false;
      this.mapView.settings.moveOnMarkerPress = false;

      if (isAndroid) {
        const uiSettings = gMap.getUiSettings();
        uiSettings.setMyLocationButtonEnabled(true);
        gMap.setMyLocationEnabled(true);
      }

      if (isIOS) {
        gMap.myLocationEnabled = true;
        gMap.settings.myLocationButton = true;

        this.mapView.on("myLocationTapped", this.goToCurrentLocation());
      }

      this.mapView.infoWindowTemplate = `<StackLayout orientation="vertical" width="240" height="auto" maxHeight="350" padding="2">
        <ScrollView>
          <StackLayout>
            <Label text="{{title}}" margin="0" textWrap="true" color="black" fontSize="18" />
            <Label text="{{info}}" margin="0" textWrap="true" color="gray" fontSize="15" />
            <Button text="More Info"></Button>
          </StackLayout>
        </ScrollView>
      </StackLayout>`;
    },

    onMarkerSelect($event) {
      this.logAnalyticEvent('tapped-map-marker', [
        {
          key: 'place_id',
          value: $event.marker.place.id,
        }
      ]);

      if (application.android) {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, function () {
          $event.marker.hideInfoWindow();
          return true;
        });
      }
    },

    onMarkerInfoWindowTapped($event) {
      this.$showModal(PlaceDetails, {
        fullscreen: true,
        props: {
          place: $event.marker.place,
        },
      });
    },

    runSearch() {
      if (this.search.term !== '') {
        this.search.lat = 0;
        this.search.lng = 0;
      }

      this.places = [];

      if (this.mapView) {
        this.mapView.removeAllMarkers();
      }

      this.logAnalyticEvent('loaded_eateries', [
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

      this.getPlaces();
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

      this.logAnalyticEvent('loaded-current-location');
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
    }
  },

  watch: {
    venueTypes: {
      deep: true,
      handler: function () {
        this.runSearch();
      },
    },
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
  padding-bottom: 50;
}

SearchBar {
  background-color: #ffffff;
  padding: 5;
}

.bottomBar {
  padding: 2;
  background: #fff;
}

.gps-button {
  width: 60;
  padding: 0;
}

ActivityIndicator {
  color: #DBBC25;
}
</style>
