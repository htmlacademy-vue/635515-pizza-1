<template>
  <section>
    <main class="content">
      <router-view />
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
            <!-- <button type="button" class="button" @click="reset">
                Сбросить
              </button> -->
          </div>
        </div>
      </form>
    </main>
  </section>
</template>

<script>
import user from "@/static/user.json";

import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import BuilderPizzaFields from "@/modules/builder/BuilderPizzaFields";

import { hiddenError } from "@/common/helpers";

import { mapState, mapGetters, mapMutations } from "vuex";
import {
  ADD_POSITION,
  REMOVE_POSITION,
  RESET_BUILDER,
  ADD_TO_CART,
} from "@/store/mutation-types";

export default {
  name: "IndexHome",
  components: {
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaFields,
  },
  data() {
    return {
      user,
    };
  },
  computed: {
    ...mapState("Builder", [
      "ingredientsSet",
      "ingredients",
      "doughOptions",
      "misc",
      "sauces",
      "sizes",
    ]),
    ...mapGetters("Builder", [
      "selectedDough",
      "selectedSize",
      "selectedSauce",
      "addedIngredients",
    ]),
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
    ...mapMutations("Builder", {
      addPosition: ADD_POSITION,
      removePosition: REMOVE_POSITION,
      reset: RESET_BUILDER,
    }),

    ...mapMutations("Cart", {
      addToCart: ADD_TO_CART,
    }),

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
      this.addToCart({
        positions: [...this.ingredientsSet.positions],
        metadata: [...this.ingredientsSet.metadata],
        count: 1,
      });
      this.reset();
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
