<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SelectorItem
          v-for="size in sizes"
          :key="size.id"
          nameOfTheSelectable="diameter"
          :label="size.name"
          :value="size.internalName"
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

export default {
  name: "BuilderSizeSelector",
  components: { SelectorItem },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { selectedItemValue: "" };
  },
  methods: {
    selectItem(value) {
      if (this.selectedItemValue !== "") {
        const oldSelectedPosition = this.sizes.filter(
          (item) => item.internalName === this.selectedItemValue
        )[0];
        EventBus.$emit(EventsEnum.RemovePosition, oldSelectedPosition);
      }

      this.selectedItemValue = value;
      const selectedPosition = this.sizes.filter(
        (item) => item.internalName === value
      )[0];
      EventBus.$emit(EventsEnum.AddPosition, selectedPosition);
    },
  },
};
</script>

<style></style>
