<template>
  <Label @tap="onClick()" :textWrap="true">
    <Span :text="text" class="title"></Span>
    <Span v-if="subText !== ''" :text="'\n\n' + subText" class="subtext"></Span>
  </Label>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    subText: {
      type: String,
      default: '',
    }
  },

  methods: {
    onClick() {
      this.$root.$emit('menu-click', this.to);
    }
  }
}
</script>

<style scoped lang="scss">
Label {
  border-radius: 5;
  border-width: 1;
  margin-bottom: 10;
  font-weight: normal;
  box-shadow: none;
  text-align: center;
  padding: 5;
  background-color: #addaf9;
  border-color: #80ccfc;
  color: black;

  Span {
    background-color: transparent;
    font-weight: normal;
  }

  .title {
    font-size: 15;
    font-weight: normal;
    display: block;
    background-color: transparent;
  }

  .subtext {
    color: transparentize(#000, 0.5);
    display: block;
    font-size: 12;
    padding-top: 50;
    line-height: 1.5;
    background-color: transparent;
  }
}
</style>
