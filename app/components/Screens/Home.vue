<template>
  <Page @loaded="loaded()">
    <AppHeading/>

    <ScrollView>
      <StackLayout orientation="vertical">

        <FlexboxLayout justifyContent="space-between">
          <SquareMenuButton text="Map" :icon="['far', 'fa-map']" to="map"></SquareMenuButton>

          <SquareMenuButton text="List" to="list" :icon="['fas', 'fa-th-list']"></SquareMenuButton>
        </FlexboxLayout>

        <FlexboxLayout justifyContent="space-between">
          <SquareMenuButton text="Nationwide Chains" to="nationwide"
                            :icon="['fas', 'fa-hamburger']"></SquareMenuButton>

          <SquareMenuButton text="Recommend a Place" to="suggest"
                            :icon="['far', 'fa-envelope-open']"></SquareMenuButton>
        </FlexboxLayout>

        <SubMenuButton text="Check out our online shop for translation cards, wristbands, stickers and more!"
                       sub-text="(Opens in mobile browser)" to="shop"></SubMenuButton>

        <SubMenuButton text="Visit the Coeliac Sanctuary website for recipes, blogs, reviews and more!"
                       sub-text="(Opens in mobile browser)" to="website"></SubMenuButton>

        <SubMenuButton text="About Coeliac Sanctuary on the Go" to="about"></SubMenuButton>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import SquareMenuButton from "../SquareMenuButton";
import SubMenuButton from "../SubMenuButton";
import AppHeading from "../AppHeading";
import List from "./List";
import Map from "./Map";
import Nationwide from "./Nationwide";
import SuggestPlace from "./SuggestPlace";
import About from "./About";
import HasAnalytics from "../../mixins/HasAnalytics";
import DisplaysAd from "../../mixins/DisplaysAd";
import {Frame} from "tns-core-modules/ui/frame/frame";
import Home from './Home';

const utilsModule = require("tns-core-modules/utils/utils");

export default {
  mixins: [
    DisplaysAd,
    HasAnalytics
  ],

  components: {
    AppHeading,
    SubMenuButton,
    SquareMenuButton,
  },

  methods: {
    loaded() {
      this.createAd();

      this.pushScreenView('home');

      if (Frame.topmost().backStack.length === 0) {
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
      }
    },

    navigateToMap() {
      this.$navigateTo(Map, {
        backstackVisible: false
      });
    },

    navigateToList() {
      this.$navigateTo(List, {
        backstackVisible: false
      });
    },

    navigateToNationwide() {
      this.$navigateTo(Nationwide, {
        backstackVisible: false
      });
    },

    navigateToSuggest() {
      this.$navigateTo(SuggestPlace, {
        backstackVisible: false
      });
    },

    navigateToAbout() {
      this.$navigateTo(About, {
        backstackVisible: false
      });
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  padding-bottom: 50;
  background-color: transparentize(#addaf9, 0.5);
}

StackLayout {
  padding: 10;
}

FlexboxLayout {
  margin-bottom: 10;
}
</style>
