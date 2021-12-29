<template>
  <div id="app">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="~@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <HeaderCart />
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import HeaderCart from "../modules/cart/HeaderCart.vue";

export default {
  name: "AppLayout",
  components: { HeaderCart },
};
</script>

<style></style>
