<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Забыли пароль?</h3>
        </div>
        <form>
          <input class="mb-2" type="email" placeholder="Email">
          <button @click="handleClick" class="btn btn_black mt-4">Продолжить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  methods: {
    handleClick() {
      this.$router.push({ name: 'SendEmailStatus'})
    }
  }
}
</script>

<style scoped>

</style>