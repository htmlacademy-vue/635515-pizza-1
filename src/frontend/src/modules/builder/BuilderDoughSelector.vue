<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <SelectorItem
          v-for="{ id, internalName, name, description } in dough"
          :key="id"
          nameOfTheSelectable="dough"
          :checked="internalName === selectedItemValue"
          :label="name"
          :value="internalName"
          :description="description"
          @selectItem="$emit('onSelect', $event)"
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
    dough: {
      type: Array,
      required: true,
    },
    selectedItemValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
