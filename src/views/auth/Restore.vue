<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Восстановление</h3>
        </div>
        <form>
          <input type="password" placeholder="Новый пароль">
          <input type="password" placeholder="Подтвердите новый пароль">

          <button class="btn btn_black mt-4">Продолжить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Restore"
}
</script>

<style scoped>

</style>