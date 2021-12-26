<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.id"
            class="ingredients__input"
            nameOfTheSelectable="sauce"
            :label="sauce.name"
            :value="sauce.internalName"
            @selectItem="selectItem"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ItemCounter
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              nameOfTheSelectable="ingredients"
              @change="handleCounterChanged"
              :label="ingredient.name"
              :internalName="ingredient.internalName"
              :value="ingredient.count"
              :max="MAX_REPETITIONS_OF_INGREDIENTS"
              :transferData="{ ...ingredient, count: ingredient.count + 1 }"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import PositionTypes from "@/common/enums/positionTypes";
import { extendToType } from "@/common/helpers";
import { MAX_REPETITIONS_OF_INGREDIENTS } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      MAX_REPETITIONS_OF_INGREDIENTS,
      selectedItemValue: "",
    };
  },
  computed: {
    typedSauces() {
      return this.sauces.map((item) => extendToType(item, PositionTypes.Sauce));
    },
  },
  methods: {
    selectItem(value) {
      if (this.selectedItemValue !== "") {
        const oldSelectedPosition = this.typedSauces.filter(
          (item) => item.internalName === this.selectedItemValue
        )[0];
        this.$emit("onUnselect", { ...oldSelectedPosition });
      }

      this.selectedItemValue = value;
      const selectedPosition = this.typedSauces.filter(
        (item) => item.internalName === value
      )[0];
      this.$emit("onSelect", { ...selectedPosition });
    },
    handleCounterChanged(value) {
      this.$emit("counterChanged", value);
    },
  },
};
</script>

<style></style>
