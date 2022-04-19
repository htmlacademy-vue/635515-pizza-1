<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="submitHandler"
  >
    <main class="content cart">
      <div class="container">
        <CartPopup v-if="orderSended" />

        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="pizza.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <CartProduct
            v-for="product in orderedPizza"
            :key="product.id"
            :product="product"
            @changeCount="changePizzaCount"
            @editProduct="editProductHandler"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditional
              v-for="additional in misc"
              :key="additional.id"
              :item="additional"
              @changeCount="changeMiscCount"
            />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="receiptType"
                class="select"
                @change="onChangeInputs"
              >
                <option
                  v-for="opt in receivingOrderOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.displayText }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                @change="onChangeInputs"
                @keyup="onChangeInputs"
              />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    type="text"
                    name="street"
                    :disabled="contacts['receiptType'] != 2"
                    @change="onChangeInputs"
                    @keyup="onChangeInputs"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    type="text"
                    name="house"
                    :disabled="contacts['receiptType'] != 2"
                    @change="onChangeInputs"
                    @keyup="onChangeInputs"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="apartment"
                    :disabled="contacts['receiptType'] != 2"
                    @change="onChangeInputs"
                    @keyup="onChangeInputs"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: HOME }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ amount }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import {
  RESET_CART,
  CHANGE_PIZZA_COUNT,
  CHANGE_MISC_COUNT,
  CHANGE_CONTACTS,
  SET_PIZZA,
} from "@/store/mutation-types";
import { HOME } from "@/router/route-names";

import CartProduct from "@/modules/cart/CartProduct.vue";
import CartAdditional from "@/modules/cart/CartAdditional.vue";
import CartPopup from "@/modules/cart/CartPopup.vue";

export default {
  name: "Cart",
  data() {
    return { HOME, orderSended: false };
  },
  components: { CartProduct, CartAdditional, CartPopup },
  computed: {
    ...mapState("Cart", ["pizza", "misc", "contacts"]),
    ...mapState("Auth", ["user", "addresses"]),
    ...mapGetters("Cart", ["amount", "orderedPizza"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    receivingOrderOptions() {
      const defaultOptions = [
        { value: "1", displayText: "Заберу сам" },
        { value: "2", displayText: "Новый адрес" },
      ];

      if (!this.isAuthorized) {
        return defaultOptions;
      }

      return [
        ...defaultOptions,
        ...this.addresses.map((adr) => ({
          value: adr.id + 2,
          displayText: adr.name,
        })),
      ];
    },
  },
  mounted() {
    this.fetchAddresses();
  },
  methods: {
    ...mapMutations("Cart", {
      reset: RESET_CART,
      changePizzaCount: CHANGE_PIZZA_COUNT,
      changeMiscCount: CHANGE_MISC_COUNT,
      changeContacts: CHANGE_CONTACTS,
    }),
    ...mapMutations("Builder", {
      setBuilderPizza: SET_PIZZA,
    }),
    ...mapActions("Orders", { addOrder: "post" }),
    ...mapActions("Cart", {
      sendOrder: "sendOrder",
    }),
    ...mapActions("Auth", { fetchAddresses: "query" }),

    submitHandler() {
      this.addOrder({
        userId: this.user.id,
        pizza: this.pizza,
        misc: this.misc.filter((m) => m.count > 0),
        contacts: this.contacts,
      });
      this.sendOrder().then(() => {
        this.orderSended = true;
      });
    },
    editProductHandler(product) {
      this.setBuilderPizza(product);
      this.$router.push({ name: HOME });
    },
    onChangeInputs(ev) {
      const { name, value } = ev.target;
      const newContacts = { ...this.contacts };
      newContacts[name] = value;
      this.changeContacts(newContacts);
    },
  },
};
</script>

<style></style>
