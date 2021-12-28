<template>
  <AppLayout>
    <section>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <BuilderDoughSelector
              :doughOptions="doughOptions"
              :selectedItemValue="selectedDough"
              @onSelect="handleSelectDough"
            />
            <BuilderSizeSelector
              :sizes="sizes"
              :selectedItemValue="selectedSize"
              @onSelect="handleSelectSize"
            />
            <BuilderIngredientsSelector
              :sauces="sauces"
              :ingredients="ingredients"
              :selectedItemValue="selectedSauce"
              @onSelect="handleSelectSauce"
              @counterChanged="handleIngredientsCounterChanged"
            />

            <div class="content__pizza">
              <BuilderPizzaFields
                :fields="ingredientsSet.metadata"
                @onChange="changeMetadataHandler"
              />

              <BuilderPizzaView
                :positions="ingredientsSet.positions"
                @onDropIngredient="handleDropIngredient"
              />
              <BuilderPriceCounter
                :positions="ingredientsSet.positions"
                :metadata="ingredientsSet.metadata"
                @submit="submitHandler"
              />
              <button type="button" class="button" @click="reset">
                Сбросить
              </button>
            </div>
          </div>
        </form>
      </main>
    </section>
  </AppLayout>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import { extendDough, extendIngredient } from "@/common/helpers";
import SauceNames from "@/common/enums/sauceNames";
import SizeNames from "@/common/enums/sizeNames";

import AppLayout from "@/layouts/AppLayout";

import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import BuilderPizzaFields from "@/modules/builder/BuilderPizzaFields";

import CartEventBus from "@/modules/cart/EventBus";
import CartEventsEnum from "@/modules/cart/enums/events";

import PositionTypes from "@/common/enums/positionTypes";

import { hiddenError } from "@/common/helpers";

export default {
  name: "IndexHome",
  components: {
    AppLayout,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaFields,
  },
  data() {
    return {
      misc,
      pizza,
      user,
      sauces: pizza.sauces.map((sauce) => ({
        ...sauce,
        internalName: SauceNames[sauce.name],
        type: PositionTypes.Sauce,
      })),
      sizes: pizza.sizes.map((size) => ({
        ...size,
        internalName: SizeNames[size.multiplier],
        type: PositionTypes.Size,
      })),
      ingredients: pizza.ingredients.map((ingredient) =>
        extendIngredient(ingredient)
      ),
      doughOptions: pizza.dough.map((doughItem) => extendDough(doughItem)),
      ingredientsSet: {
        positions: [],
        metadata: [
          {
            internalName: "pizzaName",
            displayName: "Название пиццы",
            value: "",
            required: true,
          },
        ],
      },
    };
  },
  computed: {
    addedIngredients() {
      return this.ingredients
        .filter((ingredient) => ingredient.count > 0)
        .slice();
    },
    selectedDough() {
      const dough = this.ingredientsSet.positions.filter(
        (pos) => pos.type === PositionTypes.Dough
      );
      if (dough.length === 0) {
        return "";
      } else {
        return dough[0].internalName;
      }
    },
    selectedSize() {
      const sizes = this.ingredientsSet.positions.filter(
        (pos) => pos.type === PositionTypes.Size
      );
      if (sizes.length === 0) {
        return "";
      } else {
        return sizes[0].internalName;
      }
    },
    selectedSauce() {
      const sauces = this.ingredientsSet.positions.filter(
        (pos) => pos.type === PositionTypes.Sauce
      );
      if (sauces.length === 0) {
        return "";
      } else {
        return sauces[0].internalName;
      }
    },
  },
  watch: {
    addedIngredients(newArray, oldArray) {
      oldArray.forEach((oldItem) => {
        this.removePosition({
          ...oldItem,
          price: oldItem.price * oldItem.count,
        });
      });

      newArray.forEach((newItem) => {
        this.addPosition({
          ...newItem,
          price: newItem.price * newItem.count,
        });
      });
    },
  },
  methods: {
    addPosition(position) {
      if (!("price" in position || "multiplier" in position)) {
        hiddenError(
          `Event AddPosition passed an object with the wrong structure. The object must contain a price or multiplier field.`
        );
        return;
      }
      this.ingredientsSet.positions.push(position);
    },
    removePosition(position) {
      const { positions } = this.ingredientsSet;
      const findedPositions = positions.filter(
        (item) => item.internalName === position.internalName
      );
      if (findedPositions.length === 0) {
        hiddenError(
          `Event RemovePosition passed an wrong object. The collection has no such object. Internal name ${position.internalName}`
        );
        return;
      }
      const index = positions.indexOf(findedPositions[0]);
      if (index !== -1) {
        positions.splice(index, 1);
      }
    },
    reset() {
      this.ingredients.forEach((ingredient) => {
        ingredient.count = 0;
      });
      const { positions } = this.ingredientsSet;
      positions.splice(0, positions.length);
    },
    changeMetadataHandler(changedValue) {
      const { internalName, newValue } = changedValue;
      const targetFields = this.ingredientsSet.metadata.filter(
        (field) => field.internalName === internalName
      );
      if (targetFields.length == 0) {
        hiddenError(
          `We can't find fields by name "${internalName}" in the data`
        );
        return;
      }
      const targetField = targetFields[0];
      targetField.value = newValue;
    },
    submitHandler() {
      CartEventBus.$emit(CartEventsEnum.AddToCart, this.ingredientsSet);
    },
    handleSelectDough(value) {
      if (this.selectedDough !== "") {
        const oldSelectedPosition = this.doughOptions.filter(
          (item) => item.internalName === this.selectedDough
        )[0];
        this.removePosition({ ...oldSelectedPosition });
      }

      const selectedPosition = this.doughOptions.filter(
        (item) => item.internalName === value
      )[0];
      this.addPosition({ ...selectedPosition });
    },
    handleSelectSize(value) {
      if (this.selectedSize !== "") {
        const oldSelectedPosition = this.sizes.filter(
          (item) => item.internalName === this.selectedSize
        )[0];
        this.removePosition({ ...oldSelectedPosition });
      }

      const selectedPosition = this.sizes.filter(
        (item) => item.internalName === value
      )[0];
      this.addPosition({ ...selectedPosition });
    },
    handleSelectSauce(value) {
      if (this.selectedSauce !== "") {
        const oldSelectedPosition = this.sauces.filter(
          (item) => item.internalName === this.selectedSauce
        )[0];
        this.removePosition({ ...oldSelectedPosition });
      }

      const selectedPosition = this.sauces.filter(
        (item) => item.internalName === value
      )[0];
      this.addPosition({ ...selectedPosition });
    },
    handleIngredientsCounterChanged(value) {
      const ingredientsByName = this.ingredients.filter(
        (ingredient) => ingredient.internalName === value.internalName
      );
      if (ingredientsByName.length === 0) {
        hiddenError(
          `Collections crash. Can't find element with internal name "${value.internalName}".`
        );
        return;
      }
      ingredientsByName[0].count = value.newCount;
    },
    handleDropIngredient(position) {
      this.handleIngredientsCounterChanged({
        newCount: position.count,
        internalName: position.internalName,
      });
    },
  },
};
</script>

<style></style>
