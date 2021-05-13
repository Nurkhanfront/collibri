<template>
  <div class="cart p_page">
    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text"
          ><img src="@/assets/images/BACK.svg" alt="" /> Вернуться к покупкам</a
        >
      </div>
      <div class="cart_wrapper">
        <div class="title_small">
          <h1>Корзина</h1>
        </div>
        <div class="cart_content" v-if="CART_PRODUCTS">
          <cardCart
            v-for="(card, index) in CART_PRODUCTS"
            :key="card.id"
            :productCard="card"
            @deleteProduct="deleteProduct(index)"
          />
          <div class="total_cart_price">
            <p>
              Итого: <span class="price">{{ totalPrice }} KZT</span>
            </p>
            <button class="btn_black" @click="placementOfOrder()">
                ОФОРМЛЕНИЕ ЗАКАЗА
            </button>
          </div>
        </div>
        <div class="cartIsEmpty mt-5 text-center" v-else>
          <h2>Корзина пуста</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardCart from "./../components/cardCartProduct";
import { mapGetters } from 'vuex';

export default {
  components: {
    cardCart,
  },

  data: () => ({
    cartData: null,
    count: 1,
    cartLocal: JSON.parse(localStorage.getItem("cart_products")),
  }),

  methods: {
    placementOfOrder(){
      this.$router.push('/OrderingPage')
      
    },

    deleteProduct(index) {
      this.cartData.splice(index, 1);

      if (this.cartData.length === 0) {
        this.cartData = null;
      }

      this.$store.commit("DELETE_PRODUCT", index);
    },
  },

  computed: {
    ...mapGetters(['CART_PRODUCTS', 'totalPrice'])
  },

  mounted() {
    this.$store.dispatch('GET_CART_PRODUCTS');
  },
};
</script>

<style>
</style>