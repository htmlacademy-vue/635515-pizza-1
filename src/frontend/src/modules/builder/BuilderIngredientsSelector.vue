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
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import { hiddenError } from "@/common/helpers";

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
      selectedItemValue: "",
      ingredientCounts: this.ingredients.map((ingredient) => ({
        internalName: ingredient.internalName,
        price: ingredient.price,
        count: 0,
      })),
    };
  },
  computed: {
    addedIngredients() {
      return this.ingredientCounts
        .filter((ingredient) => ingredient.count > 0)
        .slice();
    },
  },
  watch: {
    addedIngredients(newArray, oldArray) {
      oldArray.forEach((oldItem) => {
        EventBus.$emit(EventsEnum.RemovePosition, {
          ...oldItem,
          price: oldItem.price * oldItem.count,
        });
      });

      newArray.forEach((newItem) => {
        EventBus.$emit(EventsEnum.AddPosition, {
          ...newItem,
          price: newItem.price * newItem.count,
        });
      });
    },
  },
  methods: {
    selectItem(value) {
      if (this.selectedItemValue !== "") {
        const oldSelectedPosition = this.sauces.filter(
          (item) => item.internalName === this.selectedItemValue
        )[0];
        EventBus.$emit(EventsEnum.RemovePosition, oldSelectedPosition);
      }

      this.selectedItemValue = value;
      const selectedPosition = this.sauces.filter(
        (item) => item.internalName === value
      )[0];
      EventBus.$emit(EventsEnum.AddPosition, selectedPosition);
    },
    handleCounterChanged(value) {
      const ingredientsByName = this.ingredientCounts.filter(
        (ingredient) => ingredient.internalName === value.internalName
      );
      if (ingredientsByName.length === 0) {
        hiddenError(
          `Collections crash. Can't find element with internal name "${value.internalName}".`
        );
      }
      ingredientsByName[0].count = value.newCount;
    },
    initCoutns(ingredients) {
      let ret = {};
      ingredients.forEach((ingredient) => {
        ret[ingredient.internalName] = {
          price: ingredient.price,
          count: 0,
        };
      });
    },
  },
};
</script>

<style></style>
