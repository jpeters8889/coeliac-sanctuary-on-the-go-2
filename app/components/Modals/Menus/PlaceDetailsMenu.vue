<template>
  <Page>
    <StackLayout>
      <Label :textWrap="true" text="Report a problem with this place" @tap="openReportPlace"></Label>
    </StackLayout>
  </Page>
</template>

<script>
import ReportPlace from "../ReportPlace";

export default {
  props: {
    placeId: {
      type: Number,
      required: true,
    }
  },

  methods: {
    openReportPlace() {
      this.$showModal(ReportPlace, {
        props: {
          placeId: this.placeId,
        },
      }).then(() => this.$modal.close());
    }
  }
}
</script>

<style lang="scss" scoped>
Label {
  padding: 20;
}
</style>
