<template>
  <div class="header__cart">
    <router-link :to="{ name: CART }">{{ amount }} ₽</router-link>
  </div>
</template>

<script>
// import { calculateAmount } from "@/common/helpers";
import { mapGetters } from "vuex";
import { CART } from "@/router/route-names";

export default {
  name: "HeaderCart",
  data() {
    return { CART };
  },
  computed: {
    // ...mapState("Cart", ["pizza"]),
    ...mapGetters("Cart", ["amount"]),
    // amount() {
    //   let ret = 0;
    //   this.pizza.forEach((pizza) => {
    //     ret += calculateAmount(pizza.positions);
    //   });

    //   return ret;
    // },
  },
};
</script>

<style></style>
