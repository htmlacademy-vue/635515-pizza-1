<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderCard v-for="order in orders" :key="order.id" :order="order" />

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderCard from "@/modules/orders/OrderCard";

export default {
  name: "Orders",
  components: { OrderCard },
  mounted() {
    this.query();
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  methods: {
    ...mapActions("Orders", ["query"]),
  },
};
</script>

<style></style>
