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
  data: () => ({
    sortedCategory: "",
  }),

  methods: {
    ...mapActions(["SORTED_PRODUCTS"]),

    sortedProducts() {
      let productUrl = this.$route.params.id;
      this.$router.push({
        query: { page: this.$route.query.page, sort: this.sortedCategory },
      });
      this.SORTED_PRODUCTS({
        productId: productUrl,
        sortedProduct: this.sortedCategory,
      });
    },
  },

  mounted() {
    if (Object.keys(this.$route.query?.sort)) {
      this.sortedCategory = this.$route.query.sort;
    }else{
      this.sortedCategory = "";
    }
  },
};
</script>