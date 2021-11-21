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
        disabled
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="count" />
      <button type="button" class="counter__button counter__button--plus">
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
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
