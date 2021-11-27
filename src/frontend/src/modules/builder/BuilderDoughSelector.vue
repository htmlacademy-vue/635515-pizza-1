<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <SelectorItem
          v-for="dough in doughOptions"
          :key="dough.id"
          nameOfTheSelectable="dough"
          :label="dough.name"
          :value="dough.internalName"
          :description="dough.description"
          @selectItem="selectItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import PositionTypes from "./enums/positionTypes";
import { extendToType } from "@/common/helpers";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  props: {
    doughOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { selectedItemValue: "" };
  },
  computed: {
    typedDough() {
      return this.doughOptions.map((item) =>
        extendToType(item, PositionTypes.Dough)
      );
    },
  },
  methods: {
    selectItem(value) {
      if (this.selectedItemValue !== "") {
        const oldSelectedPosition = this.typedDough.filter(
          (item) => item.internalName === this.selectedItemValue
        )[0];
        EventBus.$emit(EventsEnum.RemovePosition, { ...oldSelectedPosition });
      }

      this.selectedItemValue = value;
      const selectedPosition = this.typedDough.filter(
        (item) => item.internalName === value
      )[0];
      EventBus.$emit(EventsEnum.AddPosition, { ...selectedPosition });
    },
  },
};
</script>

<style></style>
