<template>
  <Home/>
</template>

<script>
import Home from "./Screens/Home";
import * as firebase from "nativescript-plugin-firebase";

export default {
  components: {Home},

  mounted() {
    firebase.init({});
  }
}
</script>
