<template>
  <FlexboxLayout flexDirection="column" @tap="onClick()" :textWrap="true">
    <Label class="icon" :class="icon[0]" :text="icon[1] | fonticon"></Label>
    <Label class="title" :text="text" :textWrap="true"></Label>
  </FlexboxLayout>
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
    icon: {
      type: Array,
      required: true,
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
FlexboxLayout {
  flex-shrink: 0;
  background-color: #DBBC25;
  border-radius: 5;
  padding: 0;
  width: 49%;
  align-items: center;
  justify-content: center;
  height: 130;

  Label {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .icon {
    font-size: 50;
    margin: 10 0;
  }

  .title {
    font-size: 18;
    margin-bottom: 5;
  }
}
</style>
