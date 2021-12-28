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
          :checked="size.internalName === selectedItemValue"
          @selectItem="selectItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import PositionTypes from "@/common/enums/positionTypes";
import { extendToType } from "@/common/helpers";

export default {
  name: "BuilderSizeSelector",
  components: { SelectorItem },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    selectedItemValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    typedSizes() {
      return this.sizes.map((item) => extendToType(item, PositionTypes.Size));
    },
  },
  methods: {
    selectItem(value) {
      this.$emit("onSelect", value);
    },
  },
};
</script>

<style></style>
