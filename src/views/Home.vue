<template>
  <div>
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
    <div v-else>
      <div class="main_slider">
        <VueSlickCarousel :arrows="true" :dots="true">
          <div
            v-for="(item, index) in mainData.slider"
            :key="index"
            :style="{ 'background-image': `url(${imgUrl + item.image})` }"
            class="slider_item"
          >
            <div class="container h-100 slider_text_wrapper">
              <div class="slider_text col-lg-6">
                <h2 v-if="item.title">{{ item.title }}</h2>
                <p v-if="item.content">{{ item.content }}</p>
                <a :href="item.url" class="btn btn_outline" v-if="item.url">{{
                  $locale[$lang].buttons.btnMoreDetails
                }}</a>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>

      <div class="products_category">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-6 col-md-6 col-lg-6"
              v-for="category of mainData.categories.category_top"
              :key="category.id"
            >
              <div class="card_item">
                <router-link
                  :to="{
                    name: 'catalogPage',
                    params: { id: category.id, slug: category.slug },
                  }"
                >
                  <v-lazy-image
                    :src="`${imgUrl + category.image}`"
                    alt=""
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                  />
                  <p>{{ category.title }}</p>
                </router-link>
              </div>
            </div>
            <div
              class="col-xl-4 col-md-6 col-lg-4"
              v-for="category of mainData.categories.category_bottom"
              :key="category.id"
            >
              <div class="card_item">
                <router-link
                  :to="{
                    name: 'catalogPage',
                    params: { id: category.id, slug: category.slug },
                  }"
                >
                  <v-lazy-image
                    :src="`${imgUrl + category.image}`"
                    alt=""
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                  />
                  <p>{{ category.title }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main_products p_block">
        <div class="container">
          <div class="title">
            <h2>{{ $locale[$lang].titleNewProducts }}</h2>
          </div>
          <div class="main_products_content">
            <div class="row">
              <div
                class="col-xl-3 col-md-6 col-lg-4"
                v-for="product of mainData.products.new"
                :key="product.id"
              >
                <productCard :productCard="product"></productCard>
              </div>
            </div>
            <router-link to="/new" class="btn btn_black">{{
              $locale[$lang].buttons.btnSeeAll
            }}</router-link>
          </div>
        </div>
      </div>

      <div class="review_block_wrapper">
        <VueSlickCarousel
          :arrows="true"
          :infinite="false"
          :adaptiveHeight="true"
        >
          <div
            class="review_block p_block"
            v-for="(sale, index) in mainData.block_sales"
            :key="index"
          >
            <div
              class="review_block_bg"
              :style="{
                'background-image': `url(${imgUrl + sale.image})`,
              }"
            ></div>
            <div class="container">
              <div class="review_info row">
                <div class="col-xl-7">
                  <div class="block_title">
                    <h2>{{ sale.title }}</h2>
                  </div>
                  <div class="review_info_text">
                    <p>{{ sale.content }}</p>
                  </div>
                  <a
                    v-if="sale.url.match(/^https:/)"
                    :href="sale.url"
                    target="blank"
                    class="btn btn_outline"
                    >{{ $locale[$lang].buttons.btnMoreDetails }}</a
                  >
                  <router-link
                    v-else
                    class="btn btn_outline"
                    :to="{
                      name: 'product',
                      params: { id: sale.url },
                    }"
                  >
                    {{ $locale[$lang].buttons.btnMoreDetails }}</router-link
                  >
                </div>
                <div
                  class="col-xl-5 review_block_bg"
                  :style="{
                    'background-image': `url(${imgUrl + sale.image})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>

      <div class="main_products p_block" v-if="mainData.products.best.length">
        <div class="container">
          <div class="title">
            <h2>{{ $locale[$lang].titleBestSellers }}</h2>
          </div>
          <div class="main_products_content">
            <div class="row">
              <div
                class="col-xl-3 col-md-6 col-lg-4"
                v-for="product of mainData.products.best"
                :key="product.id"
              >
                <productCard :productCard="product"></productCard>
              </div>
            </div>
            <router-link to="/best" class="btn btn_black">{{
              $locale[$lang].buttons.btnSeeAll
            }}</router-link>
          </div>
        </div>
      </div>

      <div class="main_blog p_block">
        <div class="title">
          <h2>{{ $locale[$lang].titleBlog }}</h2>
        </div>
        <div class="container">
          <div class="main_blog_content">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6">
                <div class="blog_title">
                  <h2>{{ mainData.block_blog.title }}</h2>
                </div>
                <div class="main_blog_text">
                  <p>
                    {{ mainData.block_blog.content }}
                  </p>
                </div>
                <div class="main_blog_img d_none">
                  <v-lazy-image src="@/assets/images/blog_img.png" alt="" />
                </div>
                <router-link
                  class="btn btn_black"
                  :to="{
                    name: 'blogPage',
                    params: { id: mainData.block_blog.slug },
                  }"
                  >{{ $locale[$lang].buttons.btnMoreDetails }}</router-link
                >
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 m_none">
                <div class="main_blog_img">
                  <v-lazy-image
                    :src="imgUrl + mainData.block_blog.image"
                    :src-placeholder="
                      require('../assets/images/load_image.svg')
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import productCard from "./../components/productCard";

export default {
  components: { VueSlickCarousel, productCard },
  metaInfo: {
    title: "Главная",
  },
  
  data: () => ({
    mainData: null,
    lang: localStorage.getItem("lang"),
    imgUrl: null,
    count: null,
    loader: true,
  }),

  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `${this.$store.state.apiUrl}home-page?lang=${this.$store.state.lang}`
      )
      .then(
        (response) => ((this.mainData = response.data), (this.loader = false))
      );
  },
};
</script>

<style></style>
