<template>
  <div class="shadow">
    <div class="sign-form">
      <a @click="$router.go(-1)" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        <p
          v-for="({ text, type }, i) in notifications"
          :key="i"
          :class="`sign-form__text--${type}`"
        >
          {{ text }}
        </p>
      </div>
      <form method="post" @submit.prevent="login">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              ref="email"
              type="email"
              name="email"
              :value="email"
              placeholder="example@mail.ru"
              @input="email = $event.target.value"
            />
            <span
              v-if="validations.email.error != ''"
              class="sign-form__text--error"
            >
              {{ validations.email.error }}
            </span>
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              :value="password"
              type="password"
              name="pass"
              placeholder="***********"
              @input="password = $event.target.value"
            />
            <span
              v-if="validations.password.error != ''"
              class="sign-form__text--error"
            >
              {{ validations.password.error }}
            </span>
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import { mapState } from "vuex";

export default {
  name: "Login",
  layout: "AppLayoutDefault",
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",

    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  computed: {
    ...mapState(["notifications"]),
  },
  watch: {
    email() {
      console.log("clear email");
      this.$clearValidationErrors();
    },
    password() {
      console.log("clear password");
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }

      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });

      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  overflow-x: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  outline: none;
  background: $gray-900;
}

.sign-form__text {
  &--error {
    color: rgb(255, 90, 90);
  }
}
</style>
