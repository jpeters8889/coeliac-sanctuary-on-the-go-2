<template>
  <Page>
    <AppHeading title="Suggest a Place" can-go-back/>

    <ScrollView>
      <StackLayout>
        <Label :textWrap="true"
               text="Do you know of a place that offers gluten free which we don't have listed on our app or website? Let us know about it by filling in the form below, please give us as much detail as possible including where it is, the name, whats on the menu, if they use correct cross contamination controls etc."></Label>

        <TextView v-model="body"></TextView>

        <Button text="Send Suggestion" @tap="submit"></Button>

        <Label :textWrap="true" class="small"
               text="Once we've received your suggestion we'll check it out and verify that they do gluten free before we add it to our app and website."></Label>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import AppHeading from "../AppHeading";
import MakesApiRequests from "../../mixins/MakesApiRequests";
import * as nstoasts from "nativescript-toasts";
import Home from "./Home";

export default {
  components: {AppHeading},

  mixins: [MakesApiRequests],

  data: () => ({
    body: '',
  }),

  methods: {
    submit() {
      this.apiSubmitPlaceRequest(this.body)
          .then(() => {
            nstoasts.show({
              text: 'Thank you for your suggestion, we\'ll check it out!',
              position: nstoasts.POSITION.CENTER,
            });

            this.$navigateTo(Home);
          })
          .catch(() => {
            nstoasts.show({
              text: 'Sorry, there was a problem submitting your suggestion.',
              position: nstoasts.POSITION.CENTER,
            });
          })
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
}

TextView {
  background: white;
  padding: 5;
  margin: 5 10 10;
  font-size: 12;
  height: 130;
  boder-radius: 5;
}

Button {
  background: #DBBC25;
  font-weight: bold;
  padding: 5;
  margin: 0 5;
}

.small {
  font-size: 12;
}
</style>
