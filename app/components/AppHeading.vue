<template>
  <ActionBar :title="title">
    <template v-if="canGoBack">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="goBack()"></NavigationButton>
    </template>
  </ActionBar>
</template>

<script>
import Home from "./Screens/Home";

export default {
  props: {
    title: {
      type: String,
      default: 'Coeliac Sanctuary - On the Go'
    },
    canGoBack: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    goBack() {
      this.$navigateTo(Home, {
        clearHistory: true,
      })
    }
  }
}
</script>

<style>
ActionBar {
  background-color: #80CCFC;
  color: #ffffff;
}
</style>
