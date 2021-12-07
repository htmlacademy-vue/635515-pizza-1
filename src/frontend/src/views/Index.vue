<template>
  <AppLayout>
    <section>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <BuilderDoughSelector
              :doughOptions="doughOptions"
              @onSelect="addPosition"
              @onUnselect="removePosition"
            />
            <BuilderSizeSelector
              :sizes="sizes"
              @onSelect="addPosition"
              @onUnselect="removePosition"
            />
            <BuilderIngredientsSelector
              :sauces="sauces"
              :ingredients="ingredients"
              @onSelect="addPosition"
              @onUnselect="removePosition"
            />

            <div class="content__pizza">
              <BuilderPizzaFields
                :fields="ingredientsSet.metadata"
                @onChange="changeMetadataHandler"
              />

              <BuilderPizzaView :positions="ingredientsSet.positions" />
              <BuilderPriceCounter
                :positions="ingredientsSet.positions"
                :metadata="ingredientsSet.metadata"
                @submit="submitHandler"
              />
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
      })),
      sizes: pizza.sizes.map((size) => ({
        ...size,
        internalName: SizeNames[size.multiplier],
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
          `Event RemovePosition passed an wrong object. The collection has no such object.`
        );
        return;
      }
      const index = positions.indexOf(findedPositions[0]);
      if (index !== -1) {
        positions.splice(index, 1);
      }
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
  },
};
</script>

<style></style>
