<template>
  <Page>
    <StackLayout>
      <FlexboxLayout justifyContent="space-between" class="title">
        <Label flexGrow="1" :text="place.name"></Label>
        <Label flexShrink="0" class="fas" :text="'fa-ellipsis-v' | fonticon" @tap="openKebabMenu"></Label>
      </FlexboxLayout>

      <ScrollView>
        <StackLayout>
          <Label :text="place.info" :textWrap="true"></Label>

          <Label :text="place.address.replace(/\<br \/\>/g, '\n')" :textWrap="true"></Label>

          <Label :text="place.phone" v-if="place.phone"></Label>

          <Label class="link" :text="place.website" v-if="place.website" @tap="openWebsite(place.website)"></Label>

          <Label class="line"></Label>

          <template v-if="place.reviews.length">
            <Label text="Our Reviews" class="ratings-title"></Label>

            <Label class="reviewLink" v-for="review in place.reviews" :text="reviewLabel(review)"
                   @tap="openWebsite(review.link, true)"></Label>
            <Label class="line"></Label>
          </template>

          <template>
            <Label text="Visitor Ratings" class="ratings-title"></Label>

            <Button text="Leave a rating" @tap="openSubmitRatingModal"></Button>

            <template v-if="place.average_rating">
              <Label :textWrap="true">
                <Span :text="'Rated ' + formattedRating(place.average_rating) + ' '"></Span>
                <Span class="fas" :text="'fa-star' | fonticon"></Span>
                <Span :text="` from ${place.ratings.length} ratings`"></Span>
              </Label>

              <Label class="rating-wrapper" :textWrap="true" v-if="place.ratings.length > 0"
                     v-for="rating in place.ratings">
                <Span v-for="star in ratingArray(rating.rating)" class="fas star" :text="star | fonticon"></Span>
                <Span :text="'\n'"></Span>
                <Span v-if="rating.body" :text="rating.body" :textWrap="true"></Span>
                <Span v-else>Reviewer left no text with their rating...</Span>
                <Span :text="'\n\n'"></Span>
                <Span v-if="rating.name" :text="rating.name + ', '" :textWrap="true"></Span>
                <Span :text="formatDate(rating.created_at)" :textWrap="true"></Span>
              </Label>
            </template>

            <Label v-else text="No visitor ratings yet, why not leave one?"></Label>
          </template>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import PlaceDetailsMenu from "./Menus/PlaceDetailsMenu";
import RatePlace from "./RatePlace";

const utilsModule = require("tns-core-modules/utils/utils");
const moment = require("moment");

export default {
  props: {
    place: {
      required: true,
    }
  },

  methods: {
    openWebsite(url, internal = false) {
      if (internal) {
        url = 'https://develop.coeliacsanctuary.co.uk' + url;
      }

      utilsModule.openUrl(url)
    },

    reviewLabel(review) {
      return `Our review from ${this.formatDate(review.created_at)}`;
    },

    formattedRating(rating) {
      return Math.round(rating * 2) / 2;
    },

    formatDate(date, format = 'MMM Do YYYY') {
      return moment(date).format(format);
    },

    ratingArray(rating) {
      let rtr = [];
      rating = rating.split('.');

      for (let x = 0; x < rating[0]; x++) {
        rtr.push('fa-star');
      }

      if (rating[1] === '5') {
        rtr.push('fa-star-half');
      }

      return rtr;
    },

    openSubmitRatingModal() {
      this.$showModal(RatePlace, {
        props: {
          placeId: this.place.id,
        },
      });
    },

    openKebabMenu() {
      this.$showModal(PlaceDetailsMenu, {
        props: {
          placeId: this.place.id,
        },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
Page {
  background-color: transparentize(#addaf9, 0.5);
}

.title {
  background-color: #80CCFC;
  padding: 10;

  Label {
    font-size: 20;
    padding: 0;
  }
}

.link {
  font-weight: bold;
}

.reviewLink {
  margin-bottom: 0;
  font-weight: bold;
  padding-top: 0;
  padding-bottom: 0;
}

.line {
  height: 1;
  background: #addaf9;
  margin: 10 0;
}

.ratings-title {
  font-weight: bold;
  font-size: 18;
  color: #80CCFC;
}

.rating-wrapper {
  background: #addaf9;
  padding: 10;
  margin: 5;
  border-radius: 10;
}

.star {
  color: #DBBC25;
}

Button {
  background: #DBBC25;
}
</style>
