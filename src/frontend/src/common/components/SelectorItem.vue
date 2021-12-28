<template>
  <label
    :class="[
      `${nameOfTheSelectable}__input`,
      `${nameOfTheSelectable}__input--${value}`,
    ]"
  >
    <input
      type="radio"
      :name="nameOfTheSelectable"
      :value="value"
      :checked="checked"
      @change="handleChange"
      class="visually-hidden"
    />
    <b v-if="description">{{ label }}</b>
    <span v-if="description">{{ description }}</span>
    <span v-else>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    nameOfTheSelectable: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    checked: {
      type: Boolean,
    },
  },
  methods: {
    handleChange() {
      this.$emit("selectItem", this.value);
    },
  },
};
</script>

<style></style>
