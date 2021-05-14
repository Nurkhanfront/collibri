<template>
  <div class="cart p_page">
    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text" @click.prevent="$router.go(-1)"
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
            @deleteProduct="deleteProduct(index, card.id)"
          />
          <div class="total_cart_price">
            <p>
              Итого: <span class="price">{{ totalPrice }} KZT</span>
            </p>
            <button class="btn_black" @click="placementOfOrder(totalPrice)">
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
    placementOfOrder(totalPrice) {
      this.$router.push("/OrderingPage");
      let products = [];
      for (let item of this.cartData) {
        let productData = {
          id: item.id,
          count: item.count,
        };
        products.push(productData);
      }
      localStorage.setItem("productsData", JSON.stringify(products));
    },

    deleteProduct(index, id) {
      this.cartData = this.cartData.filter((t) => t.id !== id);
      
      if (this.cartData.length === 0) {
        this.cartData = null;
      }
      
      this.$store.commit("DELETE_PRODUCT", id);
    },
  },

  computed: {
    totalPrice() {
      let result = [];

      for (let item of this.cartData) {
        result.push(item.price * item.count);
      }

      result = result.reduce(function (sum, el) {
        return sum + el;
      });

      localStorage.setItem("totalPrice", result);
      return result;
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