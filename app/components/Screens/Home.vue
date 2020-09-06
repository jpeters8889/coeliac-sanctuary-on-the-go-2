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

export default {
  components: {AppHeading, MenuButton},

  mounted() {
    this.$root.$on('menu-click', (item) => {
      switch (item) {
        case 'list':
          this.navigateToList();
          break;
      }
    });
  },

  methods: {
    navigateToMap() {
      //
    },

    navigateToList() {
      this.$navigateTo(List);
    },

    navigateToNationwide() {
      //
    },

    navigateToSuggest() {
      //
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
