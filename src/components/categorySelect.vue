<template>
  <div>
    <button class="btn d_none btn_fixed" @click="mobileFilter = true">
      <i class="fas fa-filter"></i>
    </button>
    <div
      class="products_select_wrapper products_select_mobile d_none"
      v-if="mobileFilter"
    >
      <span class="close_btn" @click="mobileFilter = false"
        ><img src="@/assets/images/close.svg" alt=""
      /></span>
      <div
        
        v-for="item in categories.filters.slice(0, categoryCount)"
        :key="item.id"
      >
        <div v-if="item.filter_items.length" class="category_select">
          <p class="bold_text">{{ item.title }}</p>
          <ul>
            <li v-for="filter in item.filter_items" :key="filter.id">
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  :value="Number(filter.id)"
                  v-model="filter_id"
                  @change="addFilter"
                />
                <span>{{ filter.title }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <a
        href="#"
        @click.prevent="allCategories"
        v-if="categories.filters.length > 3"
        >{{ allCategoriesText }}</a
      >
      <button class="d_none btn btn_black" @click="mobileFilter = false">
        Показать результаты
      </button>
    </div>
    <div
      class="products_select_wrapper products_select_mobile m_none"
      v-if="categories.filters"
    >
      <span class="close_btn" alt=""></span>
      <div
        
        v-for="item in categories.filters.slice(0, categoryCount)"
        :key="item.id"
      >
        <div v-if="item.filter_items.length" class="category_select">
          <p class="bold_text">{{ item.title }}</p>
          <ul>
            <li v-for="filter in item.filter_items" :key="filter.id">
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  :value="Number(filter.id)"
                  v-model="filter_id"
                  @change="addFilter"
                />
                <span>{{ filter.title }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <a
        href="#"
        @click.prevent="allCategories"
        v-if="categories.filters.length > 3"
        >{{ allCategoriesText }}</a
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["categories", "type"],
  data: () => ({
    productCategory: null,
    categoryCount: 3,
    filter_id: [],
    mobileFilter: false,
  }),
  methods: {
    ...mapActions(["FILTER_PRODUCTS", "FILTER_BRAND_PRODUCTS"]),

    allCategories() {
      if (this.categoryCount === 3) {
        this.categoryCount = Infinity;
      } else {
        this.categoryCount = 3;
      }
    },

    addFilter() {
      this.$route.query.page = 1;
      console.log(this.$route.query);
      localStorage.setItem("filter_id", JSON.stringify(this.filter_id));
      let productUrl = this.$route.params.id;
      let allFilterId = this.filter_id;
      if (this.type === "filter_id") {
        this.FILTER_PRODUCTS({
          productId: productUrl,
          filterId: allFilterId,
          sort: this.$route.query?.sort,
          page: 1,
        });
      } else if (this.type === "brand_id") {
        this.FILTER_BRAND_PRODUCTS({
          productId: productUrl,
          brandId: allFilterId,
          page: 1,
        });
      }
    },

    toggleFilter() {
      this.productCategory = !this.productCategory;
    },
  },

  computed: {
    allCategoriesText() {
      if (this.categoryCount === 3) {
        return this.$locale[this.$lang].buttons.shoWmore;
      } else {
        return this.$locale[this.$lang].buttons.hide;
      }
    },
  },

  mounted() {
    let localFilterId = JSON.parse(localStorage.getItem("filter_id"));
    let productUrl = this.$route.params.id;
    if (localFilterId !== null) {
      localFilterId.forEach((elem) => {
        this.filter_id.push(elem);
      });
    }
    if (this.type === "filter_id") {
      this.FILTER_PRODUCTS({
        productId: productUrl,
        filterId: localFilterId,
        page: this.$route.query.page,
        sort: this.$route.query?.sort,
      });
    } else if (this.type === "brand_id") {
      this.FILTER_BRAND_PRODUCTS({
        productId: productUrl,
        brandId: localFilterId,
        page: this.$route.query.page,
        sort: this.$route.query?.sort,
      });
    }
  },

  watch: {
    productCategory() {
      if (this.productCategory) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
    mobileFilter(e) {
      if (e === true) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
  },
};
</script>

<style></style>
