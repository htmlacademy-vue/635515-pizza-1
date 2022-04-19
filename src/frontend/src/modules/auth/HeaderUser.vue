<template>
  <div v-if="user !== null" class="header__user">
    <router-link :to="{ name: PROFILE }">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="32" height="32" />
      </picture>
      <span>{{ user.name }}</span>
    </router-link>
    <a href="#" class="header__logout" @click="$logout"><span>Выйти</span></a>
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
import { LOGIN, PROFILE } from "@/router/route-names";
import { logout } from "@/common/mixins";

export default {
  name: "HeaderUser",
  mixins: [logout],
  data() {
    return {
      LOGIN,
      PROFILE,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style></style>
