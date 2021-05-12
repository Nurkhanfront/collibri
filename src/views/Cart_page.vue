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
        <div class="cart_content" v-if="cartData">
          <cardCart
            v-for="(card, index) in cartData"
            :key="card.id"
            :productCard="card"
            @plusValue="plusValue"
            @deleteProduct="deleteProduct(index)"
          />
          <div class="total_cart_price">
            <p>
              Итого: <span class="price">{{ totalPrice }} KZT</span>
            </p>
            <router-link to="/OrderingPage" tag="button" class="btn_black">ОФОРМЛЕНИЕ ЗАКАЗА</router-link>
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
    plusValue(e) {
      this.count++;
    },

    deleteProduct(index) {
      console.log(index);
      this.cartData.splice(index, 1);
      let cartList = JSON.parse(localStorage.getItem("cart_products"));
      console.log(cartList);
      cartList.splice(index, 1);
      localStorage.setItem("cart_products", JSON.stringify(cartList));
      if(this.cartData.length === 0){
        this.cartData = null
      }
    },
  },

  computed: {
    totalPrice() {
      return console.log(this.count);
    },
  },

  mounted() {
    let cartProductsId = JSON.parse(localStorage.getItem("cart_products"));
    if (cartProductsId !== null && cartProductsId.length) {
      this.$axios
        .get(`${this.$store.state.apiUrl}card-product`, {
          params: {
            product_id: cartProductsId,
            lang: this.$store.state.lang,
          },
        })
        .then((response) => (this.cartData = response.data));
    }
  },
};
</script>

<style>
</style>