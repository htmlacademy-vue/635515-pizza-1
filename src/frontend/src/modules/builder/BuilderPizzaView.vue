<template>
  <div class="content__constructor">
    <AppDrop
      v-if="sizes.length != 0 && doughOptions.length != 0 && sauces.length != 0"
      class="pizza"
      :class="[
        `pizza--foundation--${doughOptions[0].internalName}-${sauces[0].internalName}`,
        `pizza--size--${sizes[0].internalName}`,
      ]"
      @drop="dropPosition"
    >
      <div class="pizza__wrapper">
        <div
          v-for="ingredient in ingredients"
          :key="`${ingredient.id}_${ingredient.internalName}`"
          class="pizza__filling"
          :class="[
            `pizza__filling--${ingredient.internalName}`,
            `pizza__filling--${ingredient.repeating}`,
          ]"
        ></div>
      </div>
    </AppDrop>
    <div v-else class="pizza__empty-message">
      <h3>Здесь будет ваша пицца</h3>
      <p>Для начала выберите тесто, размер и соус.</p>
    </div>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import PositionTypes from "./enums/positionTypes";
import Repeats from "./enums/repeats";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    positions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ingredients() {
      return this.positions
        .filter((position) => position.type === PositionTypes.Ingredient)
        .map((ingredient) => ({
          ...ingredient,
          repeating: Repeats[ingredient.count],
        }));
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
  methods: {
    dropPosition(position) {
      if (position.type === PositionTypes.Ingredient) {
        // this.$emit("onDropIngredient", position);
        EventBus.$emit(EventsEnum.ControlValue, position);
      }
    },
  },
};
</script>

<style></style>
