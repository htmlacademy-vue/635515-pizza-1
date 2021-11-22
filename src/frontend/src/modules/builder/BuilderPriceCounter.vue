<template>
  <div class="content__result">
    <p>Итого: {{ calculateAmount() }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import { hiddenError } from "@/common/helpers";

export default {
  name: "BuilderPriceCounter",
  data() {
    return { positions: [] };
  },
  methods: {
    calculateAmount() {
      if (this.positions.length === 0) {
        return 0;
      }
      const withPrice = this.positions.filter(
        (position) => "price" in position
      );
      const withMultiplier = this.positions.filter(
        (position) => "multiplier" in position
      );
      const sum =
        withPrice.length > 0
          ? withPrice.map((item) => item.price).reduce((a, b) => a + b)
          : 0;
      const multiplier =
        withMultiplier.length > 0
          ? withMultiplier
              .map((item) => item.multiplier)
              .reduce((a, b) => a * b)
          : 1;
      return sum * multiplier;
    },
  },
  mounted() {
    EventBus.$on(EventsEnum.AddPosition, (position) => {
      if (!("price" in position || "multiplier" in position)) {
        hiddenError(
          `Event "${EventsEnum.AddPosition}" passed an object with the wrong structure. The object must contain a price or multiplier field.`
        );
        return;
      }
      this.positions.push(position);
    });
    EventBus.$on(EventsEnum.RemovePosition, (position) => {
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
    });
  },
};
</script>

<style></style>
