<template>
  <label class="radio">
    <input
      type="radio"
      :name="nameOfTheSelectable"
      :value="value"
      @change="handleChange"
    />
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
  methods: {
    handleChange() {
      this.$emit("selectItem", this.value);
    },
  },
};
</script>

<style></style>
