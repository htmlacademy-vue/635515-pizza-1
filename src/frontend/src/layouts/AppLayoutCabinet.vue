<template>
  <div id="app">
    <AppLayoutHeader />
    <AppLayoutSideBar />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSideBar from "@/layouts/AppLayoutSideBar";

export default {
  name: "AppLayout",
  components: { AppLayoutHeader, AppLayoutSideBar },
};
</script>

<style></style>
