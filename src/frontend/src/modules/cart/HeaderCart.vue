<template>
  <div class="header__cart">
    <router-link :to="{ name: CART }">{{ amount }} ₽</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CART } from "@/router/route-names";

export default {
  name: "HeaderCart",
  data() {
    return { CART };
  },
  computed: {
    ...mapGetters("Cart", ["amount"]),
  },
};
</script>

<style></style>
