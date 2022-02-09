<template>
  <div v-if="user !== null" class="header__user">
    <a href="user-data.html">
      <picture>
        <!-- TODO: correct image render -->
        <img
          src="~@/assets/img/users/user5.jpg"
          alt="Василий Ложкин"
          width="32"
          height="32"
        />
      </picture>
      <span>{{ user.name }}</span>
    </a>
    <a href="#" class="header__logout"><span>Выйти</span></a>
  </div>
  <div v-else class="header__user">
    <router-link
      class="header__login"
      :to="{
        name: LOGIN,
      }"
      ><span>Войти</span></router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/router/route-names";

export default {
  name: "HeaderUser",
  data() {
    return {
      LOGIN,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style></style>
