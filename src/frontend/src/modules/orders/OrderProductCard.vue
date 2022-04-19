<template>
  <li class="order__item">
    <div class="product">
      <img
        src="~@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ description }}</li>
          <li>Соус: {{ pizza.sauce.name }}</li>
          <li>Начинка: {{ fillings.join(",") }}</li>
        </ul>
      </div>
    </div>

    <p v-if="pizza.quantity === 1" class="order__price">{{ pizza.price }} ₽</p>
    <p v-else class="order__price">{{ pizza.quantity }}x{{ pizza.price }} ₽</p>
  </li>
</template>

<script>
import doughDescriptions from "@/modules/orders/enums/dough.js";

export default {
  name: "OrderProductCard",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    description() {
      const { doughItem, size } = this.pizza;
      const doughName = doughDescriptions[doughItem.internalName];

      return `${size.name}, ${doughName}`;
    },
    fillings() {
      const { ingredients } = this.pizza;
      return ingredients.map((ingredient) => ingredient.name);
    },
  },
};
</script>

<style></style>
