<template>
  <label class="radio">
    <input type="radio" :name="nameOfTheSelectable" :value="value" />
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
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
  },
};
</script>

<style></style>
