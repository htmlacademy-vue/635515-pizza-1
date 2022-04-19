<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.price }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="$emit('editOrder', order)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="$emit('repeatOrder', order)"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <OrderProductCard
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional">
      <OrderAdditional
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :misc="misc"
      />
    </ul>

    <p class="order__address">Адрес доставки: {{ order.orderAddress.name }}</p>
  </section>
</template>

<script>
import OrderProductCard from "@/modules/orders/OrderProductCard";
import OrderAdditional from "@/modules/orders/OrderAdditional";

export default {
  name: "OrderCard",
  components: { OrderProductCard, OrderAdditional },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
