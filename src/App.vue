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
      <router-view />
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
    setTimeout(() => {
      this.loader = true;
    }, 500);
  },

  watch: {
    $route(to, from) {
      if (this.$cookies.get("token_time") !== null) {
        let date = new Date() - new Date(this.$cookies.get("token_time"));
        let minute = date / 60000;
        if (minute > 25) {
          this.$axios
          .post(`${this.$store.state.apiUrl}register`, {
            
          })
          .then((response) => {
            const userToken = response.data.user.token;
            const userId = response.data.user.id;

            $cookies.set("userToken", userToken, 18000);
            $cookies.set("userId", userId, 18000);
            $cookies.set("token_time", new Date(), 18000);
            
            setTimeout(() => {
              $cookies.set("userToken", userToken, "30MIN");
              $cookies.set("userId", userId, "30MIN");
              this.$router.push("/my-account");
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
