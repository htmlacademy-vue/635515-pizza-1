<template>
  <div class="layout__sidebar sidebar">
    <a href="index.html" class="logo layout__logo">
      <img
        src="~@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </a>

    <a
      v-for="link in navLinks"
      :key="link.routeName"
      class="layout__link"
      :class="{ 'layout__link--active': link.routeName === $route.name }"
      @click="
        $router.push({
          name: link.routeName,
        })
      "
      >{{ link.displayName }}</a
    >
  </div>
</template>

<script>
export default {
  name: "AppLayoutSideBar",
  data() {
    return {
      navLinks: [
        { displayName: "История заказов", routeName: "Orders" },
        { displayName: "Мои данные", routeName: "Profile" },
      ],
    };
  },
};
</script>

<style></style>
