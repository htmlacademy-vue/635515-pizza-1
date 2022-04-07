<template>
  <div>
    <div class="cart-popup-wrapper"></div>
    <div class="popup">
      <router-link :to="{ name: ORDERS }" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link
          :to="isAuthorized ? { name: ORDERS } : { name: HOME }"
          class="button"
          >Отлично, я жду!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ORDERS, HOME } from "@/router/route-names";
import { mapGetters } from "vuex";
export default {
  name: "CartPopup",
  data() {
    return { ORDERS, HOME };
  },
  computed: {
    ...mapGetters("Auth", ["isAuthorized"]),
  },
};
</script>

<style></style>
