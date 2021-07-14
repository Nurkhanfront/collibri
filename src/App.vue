<template>
  <div id="app">
    <Header />
    <div class="loader_wrapper" v-if="loader === false">
      <div id="cube-loader">
        <div class="caption">
          <div class="cube-loader">
            <div class="cube loader-1"></div>
            <div class="cube loader-2"></div>
            <div class="cube loader-4"></div>
            <div class="cube loader-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view :key="$route.fullPath" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/views/layouts/Header.vue";
import Footer from "./views/layouts/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },

  data: () => ({
    loader: false,
  }),
  created() {
    if (
      $cookies.isKey("userToken") &&
      document.location.pathname === "/login"
    ) {
      this.$router.push("/my-account");
    }
    if (
      $cookies.get("userToken") == null &&
      document.location.pathname === "/my-account"
    ) {
      this.$router.push("/login");
    }

    setTimeout(() => {
      this.loader = true;
    }, 500);
  },


  watch: {
    $route(to, from) {
      if (this.$cookies.get("token_time") !== null) {
        let date = new Date() - new Date(this.$cookies.get("token_time"));
        let minute = date / 60000;
        if (minute > 25 && minute < 30) {
          this.$axios
            .post(`${this.$store.state.apiUrl}refresh`, {
              token: $cookies.get("userToken"),
            })
            .then((response) => {
              const userToken = response.data.token;

              $cookies.set("userToken", userToken, 18000);
              $cookies.set("token_time", new Date(), 18000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (minute > 30) {
          $cookies.remove("userToken");
          $cookies.remove("userId");
          $cookies.remove("token_time");
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
