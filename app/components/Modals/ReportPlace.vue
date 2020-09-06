<template>
  <Page>
    <ScrollView>
      <StackLayout>
        <Label :textWrap="true"
               text="Is this place now closed, or does it no longer offer gluten free options, or doesn't follow correct procedures? Let us know using the form below and we'll review it."></Label>

        <TextView v-model="details"></TextView>

        <FlexboxLayout justifyContent="space-between">
          <Button class="cancel" text="Cancel" @tap="cancel"></Button>

          <Button text="Submit" @tap="submit"></Button>
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import MakesApiRequests from "../../mixins/MakesApiRequests";
import * as nstoasts from "nativescript-toasts";

export default {
  mixins: [
    MakesApiRequests,
  ],

  props: {
    placeId: {
      required: true,
      type: Number,
    }
  },

  data: () => ({
    details: '',
  }),

  methods: {
    cancel() {
      this.$modal.close();
    },

    submit() {
      if (this.details.trim() === '') {
        alert('Please tell us some information about this place...');
        return;
      }

      const report = `${this.details}\n\nThis report is for place ID ${this.placeId}`;

      this.apiSubmitPlaceRequest(report, 'remove').then(() => {
        nstoasts.show({
          text: 'Thank you for your report, we\'ll check it out!',
          position: nstoasts.POSITION.CENTER,
        });

        this.$modal.close();
      }).catch(() => {
        nstoasts.show({
          text: 'Sorry, there was a problem submitting your report.',
          position: nstoasts.POSITION.CENTER,
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
  width: 300;
  padding: 10;
}

TextView {
  margin: 10;
  background: white;
  padding: 5;
  border-width: 0;
  border-radius: 5;
  height: 200;
  font-size: 14;
}

Button {
  background: #DBBC25;
}

Button.cancel {
  background: #80CCFC;
}
</style>
