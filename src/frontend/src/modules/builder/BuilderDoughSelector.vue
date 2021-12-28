<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <SelectorItem
          v-for="dough in doughOptions"
          :key="dough.id"
          nameOfTheSelectable="dough"
          :checked="dough.internalName === selectedItemValue"
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

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  props: {
    doughOptions: {
      type: Array,
      required: true,
    },
    selectedItemValue: {
      type: String,
      required: true,
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
