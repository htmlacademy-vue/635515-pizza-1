<template>
  <AppLayout>
    <section>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <BuilderDoughSelector :doughOptions="doughOptions" />
            <BuilderSizeSelector :sizes="sizes" />
            <BuilderIngredientsSelector
              :sauces="sauces"
              :ingredients="ingredients"
            />

            <div class="content__pizza">
              <BuilderPizzaFields />

              <BuilderPizzaView />
              <BuilderPriceCounter />
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
import SauceNames from "../common/enums/sauceNames";
import SizeNames from "../common/enums/sizeNames";

import AppLayout from "../layouts/AppLayout";

import BuilderDoughSelector from "../modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/BuilderPriceCounter";
import BuilderPizzaFields from "../modules/builder/BuilderPizzaFields";

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
    };
  },
};
</script>

<style></style>
