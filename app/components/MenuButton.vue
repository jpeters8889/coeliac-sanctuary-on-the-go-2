<template>
  <Label :class="theme" @tap="onClick()" :textWrap="true">
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

<style scoped lang="scss">
Label {
  border-radius: 5;
  border-width: 1;
  margin-bottom: 10;
  font-weight: normal;
  box-shadow: none;
  text-align: center;
  padding: 5;

  Span {
    background-color: transparent;
  }
}

.primary {
  background-color: rgba(219, 188, 37, 0.8);
  border-color: rgba(219, 188, 37, 1);
  color: black;
}

.link {
  background-color: rgba(128, 204, 252, 0.3);
  border-color: rgba(128, 204, 252, 1);
  color: black;

  Span {
    font-weight: normal;
  }

  .title {
    font-size: 15;
    font-weight: normal;
  }

  .subtext {
    font-size: transparentize(#000, 0.5);
  }
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
