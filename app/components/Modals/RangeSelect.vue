<template>
  <Page @loaded="loaded()">
    <StackLayout orientation="vertical">
      <Label text="1 Mile" :class="currentValue === 1 ? 'selected' : ''" @tap="selectValue(1)"></Label>
      <Label text="2 Miles" :class="currentValue === 2 ? 'selected' : ''" @tap="selectValue(2)"></Label>
      <Label text="5 Miles" :class="currentValue === 5 ? 'selected' : ''" @tap="selectValue(5)"></Label>
      <Label text="10 Miles" :class="currentValue === 10 ? 'selected' : ''" @tap="selectValue(10)"></Label>
      <Label text="20 Miles" :class="currentValue === 20 ? 'selected' : ''" @tap="selectValue(20)"></Label>
    </StackLayout>
  </Page>
</template>

<script>
import HasAnalytics from "../../mixins/HasAnalytics";

export default {
  mixins: [
    HasAnalytics,
  ],

  props: {
    currentValue: {
      type: Number,
      required: true,
    }
  },

  methods: {
    loaded() {
      this.pushModalView('range-select')
    },

    selectValue(value) {
      this.logAnalyticEvent('changed-search-range', [
        {
          key: 'range',
          value: value,
        }
      ])

      this.$root.$emit('search-range-change', value);
      this.$modal.close();
    }
  }
}
</script>

<style>
Label {
  padding: 20 60;
  font-size: 15;
  border-bottom: 1px solid #ccc;
}

.selected {
  background: #80CCFC;
}
</style>
