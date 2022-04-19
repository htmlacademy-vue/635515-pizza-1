<template>
  <div class="layout__address">
    <form
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="submitHandler"
    >
      <div class="address-form__header">
        <b v-if="isNewForm">Новый адрес</b>
        <b v-else>{{ addressName }}</b>
      </div>

      <div class="address-form__wrapper">
        <AppInput
          ref="addressName"
          v-model="addressName"
          type="text"
          name="Название адреса"
          isRequired
          class="address-form__input"
          placeholder="Введите название адреса"
          :error-text="validations.addressName.error"
        />
        <AppInput
          ref="street"
          v-model="street"
          type="text"
          name="Улица"
          isRequired
          class="address-form__input address-form__input--size--normal"
          placeholder="Введите название улицы"
          :error-text="validations.street.error"
        />
        <AppInput
          ref="building"
          v-model="building"
          type="text"
          name="Дом"
          isRequired
          class="address-form__input address-form__input--size--small"
          placeholder="Введите номер дома"
          :error-text="validations.building.error"
        />
        <AppInput
          ref="flat"
          v-model="flat"
          type="text"
          name="Квартира"
          isRequired
          class="address-form__input address-form__input--size--small"
          placeholder="Введите № квартиры"
          :error-text="validations.flat.error"
        />
        <AppInput
          ref="comment"
          v-model="comment"
          type="text"
          name="Комментарий"
          class="address-form__input"
          placeholder="Введите комментарий"
          :error-text="validations.comment.error"
        />
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="$emit('removeAddress', address)"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import AppInput from "@/common/components/AppInput";

export default {
  name: "ProfileFormAddress",
  components: { AppInput },
  mixins: [validator],
  props: {
    address: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      addressName: this.address ? this.address.name : "",
      street: this.address ? this.address.street : "",
      building: this.address ? this.address.building : "",
      flat: this.address ? this.address.flat : "",
      comment: this.address ? this.address.comment : "",

      validations: {
        addressName: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
        flat: {
          error: "",
          rules: ["required"],
        },
        comment: {
          error: "",
          rules: [],
        },
      },
    };
  },
  computed: {
    isNewForm() {
      return typeof this.address === "undefined";
    },
  },
  watch: {
    addressName() {
      this.$clearValidationErrors();
    },
    street() {
      this.$clearValidationErrors();
    },
    building() {
      this.$clearValidationErrors();
    },
    flat() {
      this.$clearValidationErrors();
    },
    comment() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    submitHandler() {
      const { addressName, street, building, flat, comment } = this;

      if (
        !this.$validateFields(
          { addressName, street, building, flat, comment },
          this.validations
        )
      ) {
        return;
      }

      const savingObject = this.isNewForm
        ? { name: addressName, street, building, flat, comment }
        : {
            ...this.address,
            name: addressName,
            street,
            building,
            flat,
            comment,
          };
      this.$emit("save", savingObject);
    },
  },
};
</script>

<style></style>
