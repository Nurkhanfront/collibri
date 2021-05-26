<template>
  <div class="auth_card">
    <div class="auth_card_content">
      <div class="contacts_form">
        <div class="title text-center m-0">
          <h3>Забыли пароль?</h3>
        </div>
        <form>
          <input
            class="mb-2"
            type="email"
            placeholder="Email"
            v-model="email"
          />
          <button @click.prevent="submit" class="btn btn_black mt-4">
            Продолжить
          </button>
          <p v-if="emailSuccess">На вашу почту</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data: () => ({
    email: "",
    emailSuccess: false,
  }),

  methods: {
    submit() {
      this.$axios
        .get(`${this.$store.state.apiUrl}password/email`, {
          params: {
            email: this.email,
          },
        })
        .then((response) => {
          this.orderData = response.data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
</style>