<template>
  <Page @loaded="loaded()"  ios:class="ios">
    <ScrollView>
      <StackLayout>
        <Label :text="'Please select your rating below'" :textWrap="true" class="title"></Label>

        <FlexboxLayout justifyContent="space-around">
          <Label v-for="thisRating in possibleRatings"
                 :key="thisRating"
                 class="ratingSelect"
                 :class="thisRating <= rating ? 'fas' : 'far'"
                 :text="'fa-star' | fonticon"
                 @tap="rating = thisRating"></Label>
        </FlexboxLayout>

        <Label :textWrap="true"
               text="Do you also want to leave a short review with your rating, please enter some details below"></Label>

        <TextField v-model="name" hint="Your name..." returnKeyType="next"></TextField>

        <TextField v-model="email" hint="Your email..." keyboardType="email" returnKeyType="next"></TextField>

        <TextView v-model="comment" hint="Your review ..."></TextView>

        <Label class="small" :textWrap="true"
               text="Please note, your email is only required for validation purposes and will never be shown to anyone on the app or website."></Label>

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
import HasAnalytics from "../../mixins/HasAnalytics";

export default {
  mixins: [
    MakesApiRequests,
    HasAnalytics
  ],

  props: {
    placeId: {
      required: true,
      type: Number,
    },
  },

  data: () => ({
    rating: 0,
    name: '',
    email: '',
    comment: '',

    possibleRatings: [1, 2, 3, 4, 5]
  }),

  methods: {
    loaded() {
      this.pushModalView('rate-place', [
        {
          key: 'place_id',
          value: this.placeId,
        }
      ]);
    },

    cancel() {
      this.logAnalyticEvent('canceled-place-rating', [
        {
          key: 'place_id',
          value: this.placeId,
        }
      ])

      this.$modal.close();
    },

    submit() {
      if (!this.validateForm()) {
        alert('Please enter your name, email and comment to submit a review with your rating...');
        return;
      }

      this.logAnalyticEvent('submitted-place-rating', [
        {
          key: 'place_id',
          value: this.placeId,
        }
      ])

      this.apiSubmitPlaceRating(this.placeId, this.rating, this.name, this.email, this.comment).then((response) => {
        nstoasts.show({
          text: 'Thank you for your review and for helping other coeliacs find places to eat easily!',
          position: nstoasts.POSITION.CENTER,
        });

        this.$modal.close();
      }).catch((err) => {
        nstoasts.show({
          text: 'Sorry, there was a problem submitting your review and rating.',
          position: nstoasts.POSITION.CENTER,
        });
      });
    },

    validateForm() {
      const inputs = [
        this.name.trim(),
        this.email.trim(),
        this.comment.trim(),
      ];

      const emptyInputs = inputs.filter((value) => value === '');

      return emptyInputs.length === 3 || emptyInputs.length === 0;
    }
  }
}
</script>

<style scoped lang="scss">
Page {
  background-color: #addaf9;
}

.title {
  font-size: 18;
  font-weight: bold;
  text-align: center;
}

.ratingSelect {
  font-size: 35;
  margin: 0;
}

.fas {
  color: #DBBC25;
}

.small {
  font-size: 12;
}

TextField, TextView {
  background: white;
  padding: 5;
  font-size: 15;
  margin: 5 10;
}

TextView {
  height: 100;
}

Button {
  background: #DBBC25;
  margin: 0 10
}

Button.cancel {
  background: #80CCFC;
}

.ios Button {
  padding: 10;
  border-radius: 5;
}
</style>
