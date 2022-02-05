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
    <div class="header__user">
      <router-link
        class="header__login"
        :to="{
          name: LOGIN,
        }"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import HeaderCart from "../modules/cart/HeaderCart.vue";
import { HOME, LOGIN } from "@/router/route-names";
export default {
  name: "AppLayoutHeader",
  components: { HeaderCart },
  data() {
    return {
      HOME,
      LOGIN,
    };
  },
};
</script>

<style></style>
