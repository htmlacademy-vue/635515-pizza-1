<template>
  <div class="content__result">
    <p>Итого: {{ amount }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isSubmitUnavailable()"
      @click="onSubmit"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
// import CartEventBus from "./../cart/EventBus";
// import CartEventsEnum from "./../cart/enums/events";
import { calculateAmount } from "@/common/helpers";
import PositionTypes from "@/common/enums/positionTypes";

export default {
  name: "BuilderPriceCounter",
  props: {
    positions: {
      type: Array,
      required: true,
    },
    metadata: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ingredients() {
      return this.positions
        .filter((position) => position.type === PositionTypes.Ingredient)
        .slice();
    },
    doughOptions() {
      return this.positions
        .filter((position) => position.type === PositionTypes.Dough)
        .slice();
    },
    sizes() {
      return this.positions
        .filter((position) => position.type === PositionTypes.Size)
        .slice();
    },
    sauces() {
      return this.positions
        .filter((position) => position.type === PositionTypes.Sauce)
        .slice();
    },
    amount() {
      if (this.positions.length === 0) {
        return 0;
      }
      return calculateAmount(this.positions);
    },
    isRequiredFieldsHaveValues() {
      const requiredFields = this.metadata.filter((field) => field.required);
      return (
        requiredFields.length === 0 ||
        requiredFields.filter((field) => field.value === "").length === 0
      );
    },
  },
  methods: {
    isSubmitUnavailable() {
      return (
        this.sauces.length === 0 ||
        this.sizes.length === 0 ||
        this.doughOptions.length === 0 ||
        !this.isRequiredFieldsHaveValues
      );
    },
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>

<style></style>
