<template>
  <div class="catalog_wrapper p_page">
    <div class="loader_wrapper" v-if="$store.state.loader">
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
    <div class="container" v-else>
      <div v-if="CATEGORY_PRODUCTS">
        <div class="title_page"></div>
        <div class="nav_page">
          <div class="breadcrumbs">
            <router-link to="/">{{ $locale[$lang].navLang.main }}</router-link>
            <router-link
              v-if="CATEGORY_PRODUCTS.category_parent"
              :to="{
                name: 'catalogPage',
                params: {
                  id: CATEGORY_PRODUCTS.category_parent.parent_id,
                  slug: CATEGORY_PRODUCTS.category_parent.slug,
                },
              }"
              >{{ CATEGORY_PRODUCTS.category_parent.title }}</router-link
            >
            <router-link
              class="disabled"
              aria-disabled="true"
              v-if="CATEGORY_PRODUCTS.category"
              to="#"
              >{{ CATEGORY_PRODUCTS.category.title }}</router-link
            >
          </div>

          <sortedSelect/>
        </div>
        <div class="catalog_content" v-if="GET_PRODUCTS">
          <div class="row">
            <div class="col-xl-3 col-md-4">
              <category-select
                :categories="CATEGORY_PRODUCTS"
                type="filter_id"
              />
            </div>
            <div class="col-xl-9 col-md-8">
              <div v-if="filteredProducts().products">
                <div
                  v-if="loaderProducts"
                  class="loader_wrapper loader_products"
                >
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
                <div class="catalog_products" v-else>
                  <products
                    :products="filteredProducts()"
                    type="catalogProducts"
                  />
                </div>
              </div>
              <div v-else class="pt-3 pb-3">
                <h3>{{ $locale[$lang].noProducts }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CategorySelect from "../components/categorySelect.vue";
import products from "../components/products.vue";
import sortedSelect from "../components/sortedSelect";

export default {
  components: { 
    products, 
    CategorySelect, 
    sortedSelect 
  },
  data: () => ({
    lang: "ru",
    paramUrl: null,
    imgUrl: null,
    filter_id: [],
    page: 1,
    loader: null,
    loadingProducts: null,
    nextPage: null,
    categoryCount: 3,
    moreLoader: null,
  }),

  methods: {
    ...mapActions([
      "GET_PRODUCTS",
      "GET_PRODUCT_PAGE",
      "FILTER_PRODUCTS",
      "SORTED_PRODUCTS",
      "MORE_PRODUCTS",
    ]),

    catalogDropdown() {
      this.$store.commit("CATALOG_DROPDOWN");
    },

    filteredProducts() {
      if (this.CATALOG_FILTER.products) {
        return this.CATALOG_FILTER;
      } else {
        return this.CATEGORY_PRODUCTS;
      }
    },

    loadProducts(id) {
      this.loader = this.$store.state.loader;
      this.imgUrl = this.$store.state.imgUrl;
      let page = this.$route.params.page;
      if (id === undefined) {
        var productUrl = this.$route.params.id;
      } else {
        var productUrl = id;
      }

      this.MORE_PRODUCTS({ productId: productUrl, page: page });
    },
  },

  computed: {
    ...mapGetters(["CATEGORY_PRODUCTS", "CATALOG_FILTER"]),

    loaderProducts() {
      return (this.loadingProducts = this.$store.state.loadingProducts);
    },
  },

  mounted() {
    this.loader = this.$store.state.loader;
    this.imgUrl = this.$store.state.imgUrl;
    let productUrl = this.$route.params.id;
    let page = this.$route.query.page;
    this.MORE_PRODUCTS({ productId: productUrl, page: page });
  },

  watch: {
    $route(to, from) {
      this.CATALOG_FILTER.products = null;
    },
  },
};
</script>
