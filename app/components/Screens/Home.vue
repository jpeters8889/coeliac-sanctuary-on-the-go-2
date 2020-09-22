<template>
  <Page @loaded="loaded()">
    <AppHeading/>

    <ScrollView>
      <StackLayout orientation="vertical">
        <MenuButton text="Coeliac Sanctuary Map" sub-text="Independent Eateries Only" to="map"></MenuButton>

        <MenuButton text="List of Places" sub-text="Independent Eateries Only" to="list"></MenuButton>

        <MenuButton text="Nationwide Chains" to="nationwide"></MenuButton>

        <MenuButton text="Recommend a Place" to="suggest"></MenuButton>

        <MenuButton theme="link" text="Visit the Coeliac Sanctuary website for recipes, blogs, reviews and more!"
                    sub-text="(Opens in mobile browser)" to="website"></MenuButton>

        <MenuButton theme="link" text="About Coeliac Sanctuary on the Go" to="about"></MenuButton>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import MenuButton from "../MenuButton";
import AppHeading from "../AppHeading";
import List from "./List";
import Map from "./Map";
import Nationwide from "./Nationwide";
import SuggestPlace from "./SuggestPlace";
import About from "./About";
import HasAnalytics from "../../mixins/HasAnalytics";
import DisplaysAd from "../../mixins/DisplaysAd";

const utilsModule = require("tns-core-modules/utils/utils");

export default {
  mixins: [
    DisplaysAd,
    HasAnalytics
  ],

  components: {
    AppHeading,
    MenuButton
  },

  methods: {
    loaded() {
      this.createAd();

      this.pushScreenView('home');

      this.$root.$on('menu-click', (item) => {
        this.logAnalyticEvent('clicked_button', [
          {
            key: 'button',
            value: item,
          }
        ]);

        switch (item) {
          case 'map':
            this.navigateToMap();
            break;
          case 'list':
            this.navigateToList();
            break;
          case 'nationwide':
            this.navigateToNationwide();
            break;
          case 'suggest':
            this.navigateToSuggest();
            break;
          case 'shop':
            utilsModule.openUrl('https://www.coeliacsanctuary.co.uk/shop');
            break;
          case 'website':
            utilsModule.openUrl('https://www.coeliacsanctuary.co.uk');
            break;
          case 'about':
            this.navigateToAbout();
            break;
        }
      });
    },

    navigateToMap() {
      this.$navigateTo(Map);
    },

    navigateToList() {
      this.$navigateTo(List);
    },

    navigateToNationwide() {
      this.$navigateTo(Nationwide);
    },

    navigateToSuggest() {
      this.$navigateTo(SuggestPlace);
    },

    navigateToAbout() {
      this.$navigateTo(About);
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  padding-bottom: 50;
  background-color: #addaf9;
}

StackLayout {
  padding: 10;
}
</style>
