<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Регистрация</h3>
        </div>
        <form>
          <div class="register_type">
            <p>Контактные данные:</p>
          </div>
          <input type="text" placeholder="Имя">
          <the-mask
              :mask="['#(###) ###-####']"
              placeholder="Номер телефона"
          />
          <input type="email" placeholder="Email">

          <div class="register_type">
            <p>Пароль</p>
          </div>

          <input type="password" placeholder="Пароль">
          <input type="password" placeholder="Повторить пароль">

          <vue-recaptcha
              @verify="markRecaptchaAsVerified"
              sitekey="6LfqcKIaAAAAAH10CNN9QHQxelvTcaoaUDKCDUZv"
              class="mt-3 mb-4"
          ></vue-recaptcha>

          <button class="btn btn_black mt-4">Подтвердить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Register",
  components: { VueRecaptcha },
  data: () => ({
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),
  methods: {
    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },
  }
}
</script>

<style scoped>

</style>