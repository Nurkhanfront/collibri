<template>
  <div class="sort_select m_none">
    <p class="silver_text">{{ $locale[$lang].sortBy.title }}</p>
    <select
      class="select_2"
      name="state"
      v-model="sortedCategory"
      @change="sortedProducts"
    >
      <option value="">{{ $locale[$lang].sortBy.default }}</option>
      <option value="ASC">
        {{ $locale[$lang].sortBy.ascendingPrice }}
      </option>
      <option value="DESC">
        {{ $locale[$lang].sortBy.descendingPrice }}
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
        name: "catalogPage",
        params: { sort: this.sortedCategory },
      });
      // this.$router.push({params: {plan: 'private'}})
      this.SORTED_PRODUCTS({
        productId: productUrl,
        sortedProduct: this.sortedCategory,
      });
    },
  },
};
</script>