<template>
  <div class="catalog_products" v-if="products.products.data.length">
    <div class="row">
      <div
        class="col-xl-4 col-md-6 col-lg-6"
        v-for="card in products.products.data"
        :key="card.id"
      >
        <productCard :productCard="card"></productCard>
      </div>
    </div>
    <pagination
      v-if="products.products.last_page > 1"
      :paginationData="products.products"
      @currentPage="currentPage"
    />
  </div>
  <div v-else>
    <h2>{{ $locale[$lang].noProducts }}</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import productCard from "./productCard";
import pagination from "./pagination";

export default {
  props: ["products", "type"],
  components: { productCard, pagination },
  data: () => ({
    showMorebtn: false,
    moreLoader: null,
    nextPage: null,
  }),

  methods: {
    ...mapActions(["MORE_BRAND_PRODUCTS", "MORE_PRODUCTS"]),

    currentPage(num) {
      this.$router.push({ name: "catalogPage", params: { page: num } });
      let productUrl = this.$route.params.id;
      if (this.type === "catalogProducts") {
        this.MORE_PRODUCTS({ productId: productUrl, page: num });
      } else if (this.type === "brandProducts") {
        this.MORE_BRAND_PRODUCTS({ productId: productUrl, page: num });
      }
    },
  },

  watch: {
    $route(to, from) {
      this.currentPage(to.params.page);
    },
  },

  // updated() {
  //   if (this.products.products) {
  //     let lastPage = this.products.products.last_page;
  //     if (lastPage === this.page) {
  //       this.showMorebtn = false;
  //     } else {
  //       this.showMorebtn = true;
  //     }
  //   }
  // },
};
</script>

<style>
</style>