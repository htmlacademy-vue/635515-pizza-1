<template>
  <header class="header">
    <div class="header__logo">
      <a href="/" class="logo">
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
      <a
        class="header__login"
        @click="
          $router.push({
            name: 'Login',
          })
        "
        ><span>Войти</span></a
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
