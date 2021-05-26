<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Авторизация</h3>
        </div>
        <form>
          <input
            type="text"
            :placeholder="$locale[$lang].placeholders.email"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <span v-if="$v.email.$dirty && $v.email.$error" class="error">{{
            $locale[$lang].errors.email
          }}</span>
          <input
            type="password"
            placeholder="Пароль"
            v-model.trim="password"
            :class="{
              invalid: $v.password.$dirty && !$v.password.required,
            }"
          />
          <span class="error" v-if="$v.password.$dirty && !$v.password.required"
            >Введите пароль!</span
          >
          <span class="error" v-if="!$v.password.minLength">
            Пароль должен быть из 6 символов.
          </span>
          <div class="flex_text">
            <router-link to="/forgot-password">Не помните пароль?</router-link>
            <router-link class="muddy" to="/register">Регистрация</router-link>
          </div>
          <button
            class="btn btn_black success_btn"
            @click.prevent="submit"
            :class="{ disabled: loader !== null }"
          >
            Войти
            <div class="loader" v-if="loader !== null"></div>
          </button>
          <span class="error mt-3 d-block">{{ registrationError }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    loader: null,
    registrationError: "",
  }),

  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },

  methods: {
    submit() {
      console.log(this.$v.password.$params);
      this.$v.$touch();
      this.loader = true;
      if (this.$v.$invalid) {
        this.loader = null;
        return false;
      } else {
        this.$axios
          .post(`${this.$store.state.apiUrl}login`, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$router.push("/my-account");

            const userToken = response.data.token;
            const userId = response.data.user_id;
            $cookies.set("userToken", userToken, 18000);
            $cookies.set("userId", userId, 18000);
            $cookies.set("token_time", new Date(), 18000);
          })
          .catch((e) => {
            this.registrationError = "Неправильный логин или пароль";
            setTimeout(() => {
              this.loader = null;
            }, 500);
          });
      }
    },
  },
};
</script>

<style lang="scss">
</style>