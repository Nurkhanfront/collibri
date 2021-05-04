<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Авторизация</h3>
        </div>
        <form>
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Пароль">
          <div class="flex_text">
            <router-link to="/forgot-password">Не помните пароль?</router-link>
            <router-link class="muddy" to="/register">Регистрация</router-link>
          </div>
          <button class="btn btn_black">Войти</button>
          <span class="error mt-3 d-block">Неправильный Email или пароль*</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style lang="scss">

</style>