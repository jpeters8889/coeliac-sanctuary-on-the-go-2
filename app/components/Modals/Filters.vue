<template>
  <Page>
    <ScrollView>
      <StackLayout orientation="vertical">
        <template v-for="group in groups">
          <template>
            <FlexboxLayout justifyContent="space-between" class="parent">
              <Label :flexGrow="1" :text="group.label" @tap="toggle(group)"></Label>
              <label class="fas" v-if="group.filters.length > 0" :text="groupIcon(group) | fonticon" @tap="toggle(group)"></label>
              <Switch v-else :flexShrink="0" class="selectAll" v-model="group.filters[0].selected" @tap="selectItem()"/>
            </FlexboxLayout>
          </template>
          <template v-if="isExpanded(group)">
            <FlexboxLayout justifyContent="space-between" class="child">
              <Label :textWrap="true" :flexGrow="1" text="Select All"></Label>
              <Switch :flexShrink="0" :checked="areAllItemsSelected(group)" class="selectAll" @tap="selectAll($event, group)" />
            </FlexboxLayout>
            <template v-for="filter in group.filters">
              <FlexboxLayout justifyContent="space-between" class="child">
                <Label :textWrap="true" :flexGrow="1" :text="filter.label" @tap="filter.selected = !filter.selected"></Label>
                <Switch :flexShrink="0" v-model="filter.selected" @checkedChange="selectItem()"/>
              </FlexboxLayout>
            </template>
          </template>
        </template>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import FindsIndex from "../../mixins/FindsIndex";

export default {
  mixins: [FindsIndex],

  props: {
    filters: {
      required: true,
    }
  },

  data: () => ({
    groups: [],
    accordions: [],
  }),

  mounted() {
    this.groups = this.filters;

    this.groups.map((filter) => {
      this.accordions.push({
        id: filter.id,
        expanded: false,
      });
    });
  },

  methods: {
    isExpanded(group) {
      const accordion = this.findAccordion(group);

      if (accordion >= 0 && this.accordions[accordion]) {
        return this.accordions[accordion].expanded;
      }

      return false;
    },

    groupIcon(group) {
      return this.isExpanded(group) ? 'fa-caret-up' : 'fa-caret-down'
    },

    toggle(group) {
      const accordion = this.findAccordion(group);

      if (accordion >= 0) {
        this.$set(this.accordions[accordion], 'expanded', !this.accordions[accordion].expanded);
      }
    },

    findAccordion(group) {
      const index = this.findIndexByAttribute(this.accordions, 'id', group.id);

      return index > -1 ? index : false;
    },

    areAllItemsSelected(group) {
      const index = this.findAccordion(group);

      if (index >= 0) {
        const accordion = this.accordions[index];

        return this.groups.filter((group) => group.id === accordion.id)[0].filters.filter((filter) => !filter.selected).length === 0;
      }

      return false;
    },

    selectAll($event, group) {
      const index = this.findIndexByAttribute(this.groups, 'id', group.id);

      setTimeout(() => {
        let state = false;

        if ($event.object.checked) {
          state = true;
        }

        this.groups[index].filters.map((filter) => filter.selected = state);

        this.emitUpdateEvent();
      }, 50);
    },

    selectItem() {
      this.emitUpdateEvent();
    },

    emitUpdateEvent() {
      this.$root.$emit('filters-changed', this.groups);
    },
  }
}
</script>

<style lang="scss">
Page {
  background-color: #addaf9;
}

Label {
  text-align: left;
  padding: 5 10;
}

Switch {
  background-color: #80CCFC;
  color: #80CCFC;
  off-background-color: #aaa;
}

Switch.selectAll {
  background-color: #DBBC25;
  color: #DBBC25;
}

.parent {
  background: #addaf9;

  Label {
    font-size: 20;
    font-weight: bold;
    padding: 10;
  }
}

.child {
  padding: 0;
  font-size: 11;
  border-bottom-width: 1;
  border-bottom-color: #bbb;
  background: #ddd;
}
</style>
