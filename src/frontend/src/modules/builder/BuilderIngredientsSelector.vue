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
            :checked="sauce.internalName === selectedItemValue"
            @selectItem="$emit('onSelect', $event)"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ItemCounter
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              nameOfTheSelectable="ingredients"
              @change="$emit('counterChanged', $event)"
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
    selectedItemValue: {
      type: String,
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
    };
  },
};
</script>

<style></style>
