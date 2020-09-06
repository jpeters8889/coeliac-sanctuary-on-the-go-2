<template>
  <Button :class="theme" @tap="onClick()">
      <Span :text="text" class="title"></Span>
      <Span v-if="subText !== ''" :text="'\n' + subText" class="subtext"></Span>
  </Button>
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
    },
    theme: {
      type: String,
      default: 'primary',
    }
  },

  methods: {
    onClick() {
      this.$root.$emit('menu-click', this.to);
    }
  }
}
</script>

<style scoped>
Button {
  border-radius: 5;
  border-width: 1;
  margin-bottom: 20;
  font-weight: normal;
  box-shadow: none;
}

.primary {
  background-color: rgba(219, 188, 37, 0.8);
  border-color: rgba(219, 188, 37, 1);
  color: black;
}

.title {
  display: block;
  font-size: 18;
  font-weight: normal;
}

.subtext {
  display: block;
  font-size: 12;
  padding-top: 50;
  line-height: 1.5;
}
</style>
