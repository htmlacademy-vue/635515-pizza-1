<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <ProfileAddress
      v-for="address in addresses"
      :key="address.id"
      :address="address"
      @saveAddress="saveAddressHandler"
      @removeAddress="removeAddressHandler"
    />

    <!-- <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №1. Тест</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>Невский пр., д. 22, кв. 46</p>
        <small>Позвоните, пожалуйста, от проходной</small>
      </div>
    </div> -->

    <ProfileFormAddress
      v-if="isNewFormOpened"
      @save="saveAddressHandler"
      @removeAddress="removeAddressHandler"
    />

    <!-- <div class="layout__address">
      <form
        action="test.html"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>Адрес №1</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button type="button" class="button button--transparent">
            Удалить
          </button>
          <button type="submit" class="button">Сохранить</button>
        </div>
      </form>
    </div> -->

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="isNewFormOpened = true"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProfileAddress from "@/modules/profile/ProfileAddress";
import ProfileFormAddress from "@/modules/profile/ProfileFormAddress";

export default {
  name: "Profile",
  components: { ProfileAddress, ProfileFormAddress },
  computed: {
    ...mapState("Auth", ["user", "addresses"]),
  },
  data() {
    return {
      isNewFormOpened: false,
    };
  },
  methods: {
    ...mapActions("Auth", ["query", "put", "post", "delete"]),
    saveAddressHandler(editedAddress) {
      const address = { ...editedAddress, userId: this.user.id };
      if (editedAddress.id) {
        this.put(address);
      } else {
        this.post(address);
        this.isNewFormOpened = true;
      }
      this.query();
    },
    removeAddressHandler(removingAddress) {
      if (removingAddress) {
        this.delete(removingAddress.id);
      } else {
        this.isNewFormOpened = false;
      }
      this.query();
    },
  },
  mounted() {
    console.log(this);
    this.query();
  },
};
</script>

<style></style>
