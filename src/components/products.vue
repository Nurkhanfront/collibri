<template>
  <div class="catalog_products" v-if="products.products.data.length">
    <div class="row">
      <div
        class="col-xl-4 col-md-6 col-lg-4"
        v-for="card in products.products.data"
        :key="card.id"
      >
        <productCard :productCard="card"></productCard>
      </div>
    </div>
    <a
      :href="nextPageUrl"
      class="btn btn_black"
      v-if="
        this.products.products.last_page !== 1 &&
        page !== this.products.products.last_page
      "
      @click.prevent="showMore"
      :class="{ disabled: moreLoader !== null }"
    >
      {{ moreLoaderShow }}
      <div class="loader" v-if="moreLoader !== null"></div>
    </a>
  </div>
  <div v-else>
    <h2>В данной категорий нет продуктов!</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import productCard from "./productCard";

export default {
  props: ["products", "type"],
  components: { productCard },
  data: () => ({
    showMorebtn: false,
    moreLoader: null,
    page: 1,
    nextPage: null,
  }),

  methods: {
    ...mapActions(["MORE_BRAND_PRODUCTS", "MORE_PRODUCTS"]),

    showMore() {
      let productUrl = this.$route.params.id;
      let lastPage = this.products.products.last_page;
      if (this.page < lastPage) {
        this.page++;
      }
      if (this.page === lastPage) {
        this.showMorebtn = false;
      }
      if (this.type === "catalogProducts") {
        this.MORE_PRODUCTS({ productId: productUrl, page: this.page });
      } else if (this.type === "brandProducts") {
        this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: this.page });
      }
    },
  },

  computed: {
    nextPageUrl() {
      let nextPageStore = this.$store.state.nextPage;
      return !nextPageStore
        ? (this.nextPage = this.products.products.next_page_url)
        : (this.nextPage = this.$store.state.nextPage);
    },

    moreLoaderShow() {
      this.moreLoader = this.$store.state.moreLoader;
      if (!this.moreLoader) {
        return this.$locale[this.$lang].buttons.btnSeeAll;
      } else {
        return "";
      }
    },
  },

  updated() {
    if (this.products.products) {
      let lastPage = this.products.products.last_page;
      if (lastPage === this.page) {
        this.showMorebtn = false;
      } else {
        this.showMorebtn = true;
      }
    }
  },

  watch: {
    $route(to, from) {
      this.page = 1;
    },
  },
};
</script>

<style>
</style>