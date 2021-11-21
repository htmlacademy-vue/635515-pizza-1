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
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ItemCounter
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              nameOfTheSelectable="ingredients"
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
};
</script>

<style></style>
