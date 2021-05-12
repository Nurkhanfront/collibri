<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Регистрация</h3>
          <p class="error">{{ registrationError }}</p>
        </div>
        <form>
          <div class="register_type">
            <p>Контактные данные:</p>
          </div>
          <input
            type="text"
            :placeholder="$locale[$lang].placeholders.name"
            v-model.trim="name"
            autocomplete="off"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          />
          <span v-if="$v.name.$error" class="error">{{
            $locale[$lang].errors.name
          }}</span>
          <the-mask
            :mask="['#(###) ###-####']"
            v-model.trim="phone"
            :placeholder="$locale[$lang].placeholders.PhoneNumber"
            autocomplete="off"
            :class="{
              invalid:
                ($v.phone.$dirty && !$v.phone.required) ||
                ($v.phone.$dirty && !$v.phone.minLength),
            }"
          />
          <span v-if="$v.phone.$error" class="error"
            >{{ $locale[$lang].errors.PhoneNumber }} {{ phone.length }}</span
          >
          <input
            type="text"
            :placeholder="$locale[$lang].placeholders.email"
            v-model.trim="email"
            autocomplete="off"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <span v-if="$v.email.$dirty && $v.email.$error" class="error">{{
            $locale[$lang].errors.email
          }}</span>

          <div class="register_type">
            <p>Пароль</p>
          </div>

          <input
            type="password"
            placeholder="Пароль"
            v-model.trim="password"
            autocomplete="off"
            :class="{
              invalid: $v.password.$dirty && !$v.password.required,
            }"
          />
          <span class="error" v-if="!$v.password.required"
            >Введите пароль!</span
          >
          <span class="error" v-if="!$v.password.minLength">
            Пароль должен быть из 6 символов. Сейчас он
            {{ $v.password.$params.minLength.min }}.
          </span>
          <input
            type="password"
            placeholder="Повторить пароль"
            v-model.trim="repeatPassword"
            autocomplete="off"
            :class="{
              invalid: $v.password.$dirty && !$v.password.required,
            }"
          />
          <span
            class="error"
            v-if="$v.password.$dirty && !$v.repeatPassword.sameAsPassword"
            >Пароли не совпадают!</span
          >

          <vue-recaptcha
            @verify="markRecaptchaAsVerified"
            sitekey="6LfqcKIaAAAAAH10CNN9QHQxelvTcaoaUDKCDUZv"
            class="mt-3 mb-4"
          ></vue-recaptcha>
          <span class="error mb-4 d-block">{{
            loginForm.pleaseTickRecaptchaMessage
          }}</span>
          <button
            class="btn btn_black mt-4 success_btn"
            @click.prevent="submit"
            :class="{ disabled: loader !== null }"
          >
            Подтвердить
            <div class="loader" v-if="loader !== null"></div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Register",
  components: { VueRecaptcha },
  data: () => ({
    loader: null,
    registrationError: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },

    phone: {
      required,
      minLength: minLength(11),
    },

    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },

    submit() {
      this.$v.$touch();
      this.loader = true;
      
      if (!this.loginForm.recaptchaVerified || this.$v.$invalid) {
        this.loginForm.pleaseTickRecaptchaMessage =
          "Подтвердите что вы не робот!";
        return false;
      } else {
        this.submitStatus = "PENDING";
        this.$axios
          .post(`${this.$store.state.apiUrl}register`, {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            password_confirmation: this.repeatPassword,
          })
          .then((response) => {
            const userToken = response.data.user.token;
            const userId = response.data.user.id;
            setTimeout(() => {
              this.loader = false;
              $cookies.set("userToken", userToken, "30MIN");
              $cookies.set("userId", userId, "30MIN");
              this.$router.push("/my-account");
            }, 1000);
          })
          .catch((error) => {
            this.registrationError =
              "Пользователь с такими данными уже существует!";
          });
      }
    },
  },
};
</script>

<style scoped>
</style>