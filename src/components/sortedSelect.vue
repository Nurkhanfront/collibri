<template>
  <div class="sort_select m_none">
    <p class="silver_text">{{ $locale[$lang].sortBy.title }}</p>
    <select
      class="select_2"
      name="state"
      v-model="sortedCategory"
      @change="sortedProducts"
    >
      <option value="">
        {{ $locale[$lang].sortBy.default }}
      </option>
      <option value="ASC">
        <router-link
          :to="{
            name: 'catalogPage',
            params: {
              sort: 'ASC',
            },
          }"
        >
          {{ $locale[$lang].sortBy.ascendingPrice }}
        </router-link>
      </option>
      <option value="DESC">
        <router-link
          :to="{
            name: 'catalogPage',
            params: {
              sort: 'DESC',
            },
          }"
        >
          {{ $locale[$lang].sortBy.descendingPrice }}
        </router-link>
      </option>
    </select>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["type"],
  data: () => ({
    sortedCategory: "",
  }),

  methods: {
    ...mapActions(["SORTED_PRODUCTS", "SORTED_SEARCH_PRODUCTS",]),

    sortedProducts() {
      let productUrl = this.$route.params.id;
      this.$router.push({
        query: { page: this.$route.query.page, sort: this.sortedCategory },
      });

      if (this.type === "catalogProducts") {
        this.SORTED_PRODUCTS({
          productId: productUrl,
          sortedProduct: this.sortedCategory,
        });
      }else if(this.type === "searchProducts"){
        let searchData = localStorage.getItem("searchData");
      }
    },
  },

  mounted() {
    if (this.$route.query.sort !== undefined) {
      this.sortedCategory = this.$route.query.sort;
    } else {
      this.sortedCategory = "";
    }
  },
};
</script>