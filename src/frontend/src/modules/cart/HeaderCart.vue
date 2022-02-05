<template>
  <div class="header__cart">
    <router-link :to="{ name: 'Cart' }">{{ amount }} ₽</router-link>
  </div>
</template>

<script>
import { calculateAmount } from "@/common/helpers";
import { mapState } from "vuex";

export default {
  name: "HeaderCart",
  computed: {
    ...mapState("Cart", ["pizza"]),
    amount() {
      let ret = 0;
      this.pizza.forEach((pizza) => {
        ret += calculateAmount(pizza.positions);
      });

      return ret;
    },
  },
};
</script>

<style></style>
