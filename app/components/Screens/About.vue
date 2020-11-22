<template>
  <Page @loaded="loaded()">
    <AppHeading title="About" can-go-back></AppHeading>

    <ScrollView>
      <StackLayout>
        <Label :textWrap="true"
               text="Coeliac Sanctuary - On the Go can be used to find gluten free places to eat around the UK and Ireland, it connects to the eating out guide on the Coeliac Sanctuary website to display places around you using your GPS location."></Label>
        <Label :textWrap="true"
               text="All of the places on our Eating Out guide and this app are user contributed, but we do verify them before we add them to our database by checking the eateries website, menus and reviews to make sure they do offer gluten free options, but if yu do find a place we have listed that doesn't exist anymore or doesn't do gluten free, then you can report it to us through the app."></Label>
        <Label :textWrap="true"
               text="If you know of somewhere that offers gluten free which we haven't got on your website or app, then you can use use our app or website to recommend a place to us."></Label>

        <Label class="title" :textWrap="true" text="Reviewed Places"></Label>

        <Label :textWrap="true"
               text="You may see some eateries on the app that have been reviewed by the Coeliac Sanctuary team, this means that we have visited the establishment ourselves and written about our experiences. Due to where we are based in the UK reviewed places are limited and there may be none near your location."></Label>

        <Label class="title" :textWrap="true" text="User Ratings"></Label>

        <Label :textWrap="true"
               text="Through our app and website we give users the ability to give places an anonymous rating of between 1 and 5 stars, and we also have the option where users can leave a short text review of an establishment."></Label>

        <Label class="title" :textWrap="true" text="Nationwide Eateries"></Label>

        <Label :textWrap="true"
               text="Due to the number of Nationwide chains that offer gluten free, it is impossible for us to mark them all on our map or place list, our eating out database focuses on independent eateries. We do however have a generic lst of nationwide eateries on our website and app, but we do not list any specific location or branches."></Label>
        <Label :textWrap="true"
               text="We define a chain as a nationwide chain when there are 25 or more branches across the UK, there are however certain exceptions when the majority of a chains branches are focussed on one part of the country, for example the majority of Leon's branches can be found in and around London, so therefore we don't class them as a nationwide eatery."></Label>

        <Label class="line"></Label>

        <Label class="title" :textWrap="true" text="Privacy Policy"></Label>

        <Label :textWrap="true"
               text="While we require your GPS location to show eateries around you, we do not log it nor use it in any other way except to find gluten free places around you."></Label>
        <Label :textWrap="true"
               text="All requests sent to the Coeliac Sanctuary server are sent over HTTPS and protected by an SSL Certificate"></Label>
        <Label :textWrap="true"
               text="We use anonymous analytical data to show us how users use this app, if you'd prefer to not share anonymous usage reports you can opt out below."></Label>

        <FlexboxLayout alignItems="center">
          <Switch :checked="analyticsOptIn" @tap="analyticsOptIn = !analyticsOptIn"
                  :color="analyticsOptIn ? '#DBBC25' : '#777'" backgroundColor="white" offBackgroundColor="white"/>
          <Label :textWrap="true" text="I consent to anonymous usage reports."></Label>
        </FlexboxLayout>

        <Label class="small" :textWrap="true" text="App Version 2.0.1, published 22nd November 2020"></Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import AppHeading from "../AppHeading";

const AppSettings = require("tns-core-modules/application-settings");

import HasAnalytics from "../../mixins/HasAnalytics";
import DisplaysAd from "../../mixins/DisplaysAd";

export default {
  mixins: [
    HasAnalytics,
    DisplaysAd,
  ],

  components: {AppHeading},

  data: () => ({
    analyticsOptIn: true,
  }),

  methods: {
    loaded() {
      this.createAd();
      this.pushScreenView('about');

      this.analyticsOptIn = AppSettings.getBoolean('enableAnalytics', true);
    },
  },

  watch: {
    analyticsOptIn: function () {
      this.logAnalyticEvent('updated-analytics-tracking', [
        {
          key: 'tracking_enabled',
          value: this.analyticsOptIn
        }
      ])

      AppSettings.setBoolean('enableAnalytics', this.analyticsOptIn);
      console.log(AppSettings.getAllKeys());

    }
  },
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
  padding-bottom: 50;
}

.title {
  font-size: 18;
  font-weight: bold;
}

.line {
  height: 2;
  background-color: #DBBC25;
  margin: 10;
}

.small {
  font-size: 12;
}

FlexboxLayout {
  padding: 10;

  Label {
    font-size: 14;
  }
}
</style>
