<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        class="logo"
        :to="{
          name: 'Home',
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
          name: 'Login',
        }"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import HeaderCart from "../modules/cart/HeaderCart.vue";

export default {
  name: "AppLayoutHeader",
  components: { HeaderCart },
};
</script>

<style></style>
