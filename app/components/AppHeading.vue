<template>
  <ActionBar :title="title">
    <template v-if="canGoBack">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </template>
  </ActionBar>
</template>

<script>
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
  }
}
</script>

<style>
ActionBar {
  background-color: #80CCFC;
  color: #ffffff;
}
</style>
