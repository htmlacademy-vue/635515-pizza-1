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
        <router-link :to="{ name: ORDERS }" class="button"
          >Отлично, я жду!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ORDERS } from "@/router/route-names";
export default {
  name: "CartPopup",
  data() {
    return { ORDERS };
  },
};
</script>

<style></style>
