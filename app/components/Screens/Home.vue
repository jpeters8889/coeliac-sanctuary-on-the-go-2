<template>
  <Page>
    <AppHeading/>

    <StackLayout orientation="vertical">

      <MenuButton text="Coeliac Sanctuary Map" sub-text="Independent Eateries Only" to="map"></MenuButton>

      <MenuButton text="List of Places" sub-text="Independent Eateries Only" to="list"></MenuButton>

      <MenuButton text="Nationwide Chains" to="nationwide"></MenuButton>

      <MenuButton text="Recommend a Place" to="suggest"></MenuButton>

    </StackLayout>
  </Page>
</template>

<script>
import MenuButton from "../MenuButton";
import AppHeading from "../AppHeading";
import List from "./List";
import Map from "./Map";
import Nationwide from "./Nationwide";
import SuggestPlace from "./SuggestPlace";

export default {
  components: {
    AppHeading,
    MenuButton
  },

  mounted() {
    this.$root.$on('menu-click', (item) => {
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
      }
    });
  },

  methods: {
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
    }
  }
}
</script>

<style scoped>
StackLayout {
  padding: 10;
  background-color: #addaf9;
}
</style>
