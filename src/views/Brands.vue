<template>
  <div class="brands_wrapper p_page">
    <div class="loader_wrapper" v-if="loader">
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
      <div class="title_small">
        <h1>{{ $locale[$lang].brandsPageTitle }}</h1>
      </div>
      <div class="popular_brands">
        <span
          v-for="brand in allBrands.popular"
          :key="brand.id"
          :id="brand.id"
          @click="categoryUrl(brand.id)"
        >
          <router-link
            :to="{
              name: 'brandProducts',
              params: { id: brand.id, slug: brand.slug, page: 1 },
            }"
            ><img :src="imgUrl + brand.image" alt=""
          /></router-link>
        </span>
      </div>
      <div class="brands_block">
        <div class="brands_list">
          <a
            :href="`#${name}`"
            v-for="(item, name) in allBrands.all"
            :key="name"
            >{{ name }}</a
          >
          <a href="#">#</a>
        </div>
        <div class="brands_wrapper">
          <div v-for="(item, name) in allBrands.all" :key="name">
            <div class="brands_column" v-if="item.length > 0" :id="name">
              <span>{{ name }}</span>
              <ul>
                <li
                  @click="categoryUrl(brand.id)"
                  v-for="brand in item"
                  :key="brand.id"
                >
                  <router-link
                    :to="{
                      name: 'brandProducts',
                      params: { id: brand.id, slug: brand.slug },
                      query: {
                        page: 1,
                      },
                    }"
                    >{{ brand.title }}</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="brands_column">
            <span>#</span>
            <ul>
              <li
                v-for="(item, index) in allBrands.other"
                :key="index"
                v-if="item.length"
              >
                <router-link
                  v-for="brand in item"
                  :key="brand.id"
                  :to="{
                    name: 'brandProducts',
                    params: { id: brand.id, slug: brand.slug, page: 1 },
                  }"
                  >{{ brand.title }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  metaInfo() {
    return {
      title: this.$store.state.metaTitle + ' | ' + 'Collibri',
    };
  },
  data: () => ({
    allBrands: null,
    imgUrl: null,
    loader: true,
  }),
  methods: {
    ...mapActions(["GET_BRAND_PRODUCTS"]),
    categoryUrl(id) {
      localStorage.removeItem("filter_id");
      this.GET_BRAND_PRODUCTS(id);
    },
  },

  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-brands?lang=${this.$store.state.lang}`
      )

      .then((response) => {
        this.allBrands = response.data;
        this.loader = false;
        this.$store.state.metaTitle = response.data.page_meta.meta_title !== null ? response.data.page_meta.meta_title : 'Бренды';
      });
  },
};
</script>

<style></style>
