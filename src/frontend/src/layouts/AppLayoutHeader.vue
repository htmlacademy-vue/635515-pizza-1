<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        class="logo"
        :to="{
          name: HOME,
        }"
      >
        <img
          src="~@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <HeaderCart />
    <HeaderUser />
  </header>
</template>

<script>
import HeaderCart from "../modules/cart/HeaderCart.vue";
import HeaderUser from "../modules/auth/HeaderUser.vue";
import { HOME } from "@/router/route-names";
export default {
  name: "AppLayoutHeader",
  components: { HeaderCart, HeaderUser },
  data() {
    return {
      HOME,
    };
  },
};
</script>

<style></style>
