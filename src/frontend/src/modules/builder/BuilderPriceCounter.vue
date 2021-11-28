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
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import CartEventBus from "./../cart/EventBus";
import CartEventsEnum from "./../cart/enums/events";
import { hiddenError, calculateAmount } from "@/common/helpers";
import PositionTypes from "./enums/positionTypes";

export default {
  name: "BuilderPriceCounter",
  data() {
    return { positions: [], pizzaName: "" };
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
  },
  methods: {
    isSubmitUnavailable() {
      return (
        this.sauces.length === 0 ||
        this.sizes.length === 0 ||
        this.doughOptions.length === 0 ||
        this.pizzaName === ""
      );
    },
    addPosition(position) {
      if (!("price" in position || "multiplier" in position)) {
        hiddenError(
          `Event "${EventsEnum.AddPosition}" passed an object with the wrong structure. The object must contain a price or multiplier field.`
        );
        return;
      }
      this.positions.push(position);
    },
    removePosition(position) {
      const findedPositions = this.positions.filter(
        (item) => item.internalName === position.internalName
      );
      if (findedPositions.length === 0) {
        hiddenError(
          `Event "${EventsEnum.RemovePosition}" passed an wrong object. The collection has no such object.`
        );
        return;
      }
      const index = this.positions.indexOf(findedPositions[0]);
      if (index !== -1) {
        this.positions.splice(index, 1);
      }
    },
    onSubmit() {
      CartEventBus.$emit(CartEventsEnum.AddToCart, {
        name: this.pizzaName,
        positions: this.positions.slice(),
      });
    },
    changeFields(fields) {
      const { pizzaName } = fields;
      this.pizzaName = pizzaName;
    },
  },
  mounted() {
    EventBus.$on(EventsEnum.AddPosition, this.addPosition);
    EventBus.$on(EventsEnum.RemovePosition, this.removePosition);
    EventBus.$on(EventsEnum.ChangeFields, this.changeFields);
  },
};
</script>

<style></style>
