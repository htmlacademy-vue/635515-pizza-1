<template>
  <div class="header__cart">
    <a href="#">{{ amount }} ₽</a>
  </div>
</template>

<script>
import EventBus from "./EventBus";
import EventsEnum from "./enums/events";
import { calculateAmount } from "@/common/helpers";

export default {
  name: "HeaderCart",
  data() {
    return { pizza: [] };
  },
  computed: {
    amount() {
      let ret = 0;
      this.pizza.forEach((pizza) => {
        ret += calculateAmount(pizza.positions);
      });

      return ret;
    },
  },
  methods: {
    addPizza(newPizza) {
      this.pizza.push(newPizza);
    },
  },
  mounted() {
    EventBus.$on(EventsEnum.AddToCart, this.addPizza);
  },
};
</script>

<style></style>
