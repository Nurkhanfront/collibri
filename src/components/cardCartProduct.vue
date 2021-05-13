<template>
  <div class="card_cart">
    <div class="card_cart_info">
      <div class="card_cart_img">
        <img
          :src="$staticImageUrl.staticImgUrl(productCard.images.image)"
          alt=""
        />
      </div>
      <div class="card_descr">
        <p class="silver_text">{{ productCard.brand_name }}</p>
        <p class="bold_text">{{ productCard.title }}</p>
      </div>
    </div>
    <div class="card_price_info">
      <span class="like" @click.stop="addFavorite(productCard)"
        ><i class="far fa-heart" :class="{ fas: favoriteActive }"></i>
      </span>
      <div class="product_count">
        <button class="btn btn_add" @click="minusValue"><span>-</span></button>
        <span class="total_count">{{ productCard.count }}</span>
        <button class="btn btn_add" @click="plusValue(productCard.price)"><span>+</span></button>
      </div>
      <div class="price">
        <p class="bold_text">{{ productCard.price }} KZT</p>
      </div>
    </div>
    <div class="delete_product" @click="$emit('deleteProduct')">
      <img src="@/assets/images/delete.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["productCard"],
  data: () => ({
    favoriteActive: false,
    favoriteList: null,
    countValue: 1
  }),

  computed: {
    activeFavorite() {
      if (this.favoriteList) {
        this.favoriteList.filter((i) => {
          if (i.id === this.productCard.id) {
            this.favoriteActive = true;
          }
        });
      }
    },
  },

  methods: {
    ...mapMutations(["ADD_FAVORITES"]),

    addFavorite(product) {
      this.favoriteActive = !this.favoriteActive;
      this.ADD_FAVORITES(product);
    },

    minusValue() {
      if (this.productCard.count > 1) {
        this.productCard.count--;
      }
    },

    plusValue() {
      this.productCard.count++;
    },
  },

  mounted() {
    this.activeFavorite;
    this.$set(this.productCard, 'count', 1)
  },

  created() {
    this.favoriteList = JSON.parse(localStorage.getItem("favorite"));
  },
};
</script>

<style>
</style>