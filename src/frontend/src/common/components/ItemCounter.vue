<template>
  <li :class="`${nameOfTheSelectable}__item`">
    <span class="filling" :class="`filling--${internalName}`">
      {{ label }}
    </span>

    <div
      class="counter counter--orange"
      :class="`${nameOfTheSelectable}__counter`"
    >
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="handleDecrease"
        :disabled="isDecreaseUnavailable()"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="count" />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="handleIncrease"
        :disabled="isIncreaseUnavailable()"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    nameOfTheSelectable: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    internalName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    count(newCount, oldCount) {
      this.$emit("change", {
        newCount,
        oldCount,
        internalName: this.internalName,
      });
    },
  },
  methods: {
    isIncreaseUnavailable() {
      return false;
    },
    isDecreaseUnavailable() {
      return this.count === 0;
    },
    handleIncrease() {
      this.count++;
    },
    handleDecrease() {
      this.count--;
    },
  },
};
</script>

<style></style>
