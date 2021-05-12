<template>
  <div class="card_cart">
    <div class="ordering_cart_info">
      <div class="card_cart_img">
        <img
          :src="$staticImageUrl.staticImgUrl(productCard.images.image)"
          alt=""
        />
      </div>
      <div class="card_descr">
        <p class="silver_text">
          {{ productCard.brand_name }}
        </p>
        <div class="info_product_order">
          <p class="bold_text">
            {{ productCard.title }}
          </p>
          <div class="price m_none">
            <p class="bold_text">
              {{ productCard.price }}
            </p>
          </div>
        </div>
        <p class="silver_text small_text">30 ml</p>
      </div>
    </div>
    <div class="price d_none text-right">
      <p class="bold_text">
        {{ productCard.price }}
      </p>
    </div>
    <div class="delete_product" @click="$emit('deleteProduct')">
      <img src="@/assets/images/delete_prod.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["productCard"],

  methods: {

  },
};
</script>

<style>
</style>