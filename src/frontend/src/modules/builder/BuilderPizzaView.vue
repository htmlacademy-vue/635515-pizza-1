<template>
  <div class="content__constructor">
    <div
      v-if="sizes.length != 0 && doughOptions.length != 0 && sauces.length != 0"
      class="pizza"
      :class="[
        `pizza--foundation--${doughOptions[0].internalName}-${sauces[0].internalName}`,
        `pizza--size--${sizes[0].internalName}`,
      ]"
    >
      <div class="pizza__wrapper">
        <div
          v-for="ingredient in ingredients"
          :key="`${ingredient.id}_${ingredient.internalName}`"
          class="pizza__filling"
          :class="`pizza__filling--${ingredient.internalName}`"
        ></div>
      </div>
    </div>
    <div v-else class="pizza__empty-message">
      <h3>Здесь будет ваша пицца</h3>
      <p>Для начала выберите тесто, размер и соус.</p>
    </div>
  </div>
</template>

<script>
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import { hiddenError } from "@/common/helpers";
import PositionTypes from "./enums/positionTypes";

export default {
  name: "BuilderPizzaView",
  data() {
    return { positions: [] };
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
