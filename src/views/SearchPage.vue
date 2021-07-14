<template>
  <div class="container p_page">
    <div class="title_small text-center" v-if="filteredProducts().products.data.length">
      <h1>Результаты поиска</h1>
    </div>
    <div class="title_small text-center" v-else>
      <h1>К сожалению, мы ничего не нашли по вашему запросу.</h1>
    </div>
    <div class="nav_page justify-content-end mt-5 mb-5">
      <sortedSelect type="searchProducts" />
    </div>
    <div class="catalog_content">
      <div class="row">
        <div class="col-xl-3 col-md-4">
          <category-select :categories="searchProducts" type="searchProducts" />
        </div>
        <div class="col-xl-9 col-md-8">
          <products :products="filteredProducts()" type="searchProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategorySelect from "../components/categorySelect.vue";
import products from "../components/products.vue";
import sortedSelect from "../components/sortedSelect";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    products,
    CategorySelect,
    sortedSelect,
  },
  data: () => ({
    searchProducts: null,
  }),

  computed: {
    ...mapGetters(["BRAND_PRODUCTS", "CATALOG_FILTER"]),
  },

  methods: {
    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.searchProducts;
      }
    },
  },

  mounted() {
    let page = this.$route.query.page ? this.$route.query.page : 1;
    let sort = this.$route.query.sort ? this.$route.query.sort : "";
    let localFilterId = JSON.parse(localStorage.getItem("filter_id"));
    let vm = this;
    let searchData = localStorage.getItem("searchData");

    this.$axios
      .get(
        `${this.$store.state.apiUrl}search-page?lang=${this.$lang}&text=${searchData}&page=${page}&order_by=${sort}&filterId=${localFilterId}`
      )
      .then(function (response) {
        vm.searchProducts = response.data;
      });
  },



};
</script>

<style>
</style>