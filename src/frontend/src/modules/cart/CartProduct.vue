<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="~@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="`${name}-${product.id}`"
      />
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ selectedSize.name }}, {{ selectedDough.name }} тесто</li>
          <li>Соус: {{ selectedSauce.name }}</li>
          <li>Начинка: {{ fillingText }}</li>
        </ul>
      </div>
    </div>

    <Counter
      counterName="cart-list"
      :value="product.count"
      :isOrange="true"
      @change="changeCount"
    />

    <div class="cart-list__price">
      <b>{{ amount }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="$emit('editProduct', product)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { filterSelected } from "@/common/helpers";
import PositionTypes from "@/common/enums/positionTypes";
import Counter from "@/common/components/Counter.vue";

import { calculateAmount } from "@/common/helpers";

export default {
  name: "CartProduct",
  components: { Counter },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      const fields = this.product.metadata.filter(
        (field) => field.internalName === "pizzaName"
      );
      if (fields.length !== 1) {
        return "Невозможно определить наименование";
      }
      return fields[0].value;
    },
    selectedDough() {
      return filterSelected(this.product.positions, PositionTypes.Dough);
    },
    selectedSize() {
      return filterSelected(this.product.positions, PositionTypes.Size);
    },
    selectedSauce() {
      return filterSelected(this.product.positions, PositionTypes.Sauce);
    },
    fillingText() {
      return this.product.positions
        .filter(({ type }) => type === PositionTypes.Ingredient)
        .map(({ name }) => name)
        .join(", ");
    },
    amount() {
      const { positions, count } = this.product;
      if (positions.length === 0) {
        return 0;
      }
      return calculateAmount(positions) * count;
    },
  },
  methods: {
    changeCount({ newCount }) {
      this.$emit("changeCount", {
        newCount,
        id: this.product.id,
      });
    },
  },
};
</script>

<style></style>
