<template>
  <div class="layout__sidebar sidebar">
    <router-link
      class="logo layout__logo"
      :to="{
        name: HOME,
      }"
      ><img
        src="~@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
    /></router-link>

    <router-link
      v-for="link in navLinks"
      :key="link.routeName"
      class="layout__link"
      active-class="layout__link--active"
      :to="{
        name: link.routeName,
      }"
      >{{ link.displayName }}</router-link
    >
  </div>
</template>

<script>
import { HOME, ORDERS, PROFILE } from "@/router/route-names";

export default {
  name: "AppLayoutSideBar",
  data() {
    return {
      HOME,
      navLinks: [
        { displayName: "История заказов", routeName: ORDERS },
        { displayName: "Мои данные", routeName: PROFILE },
      ],
    };
  },
};
</script>

<style></style>
