<template>
  <div
    class="counter"
    :class="[`${counterName}__counter`, { 'counter--orange': isOrange }]"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="handleDecrease"
      :disabled="isDecreaseUnavailable"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': isOrange }"
      @click="handleIncrease"
      :disabled="isIncreaseUnavailable"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    counterName: {
      type: String,
    },
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: false,
    },
    isOrange: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    isIncreaseUnavailable() {
      return this.max ? this.value >= this.max : false;
    },
    isDecreaseUnavailable() {
      return this.value === 0;
    },
  },
  methods: {
    handleIncrease() {
      this.$emit("change", {
        newCount: this.value + 1,
        oldCount: this.value,
      });
    },
    handleDecrease() {
      this.$emit("change", {
        newCount: this.value - 1,
        oldCount: this.value,
      });
    },
  },
};
</script>

<style></style>
