<template>
  <div class="order_item_wrapper">
    <div>
      <div class="title_block">
        <h3>{{ $locale[$lang].orders.title }}</h3>
      </div>
    </div>
    <loader v-if="loader"/>
    <div v-if="orderData">
      <div class="order_item" v-for="order in orderData.orders" :key="order.id">
        <div class="order_number">
          <p>№ {{ order.id }}</p>
        </div>
        <div class="first_block">
          <div class="row">
            <div class="col-xl-10 col-lg-10">
              <div class="order_block">
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-5">
                    <div class="order_titles">
                      <p>{{ $locale[$lang].orders.status }}</p>
                    </div>
                  </div>
                  <div class="col-xl-9 col-lg-8 col-7">
                    <div class="order_title_status">
                      <p>{{ order.type_status }}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-5">
                    <div class="order_titles">
                      <p>{{ $locale[$lang].orders.deliveryDate }}</p>
                    </div>
                  </div>
                  <div class="col-xl-9 col-lg-8 col-7">
                    <div class="order_title_status">
                      <p>{{ dateOrder(order.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2">
              <div class="image_order">
                <img
                  :src="$staticImageUrl.staticImgUrl(order.product_image.image)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-10 col-lg-10">
            <div class="order_block mt-3">
              <div class="row">
                <div class="col-xl-3 col-lg-4">
                  <div class="order_titles">
                    <p>{{ $locale[$lang].orders.deliveryAddress }}</p>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                  <div class="order_title_status">
                    <p>
                      {{ order.address.region }}{{ order.address.region
                      }}{{ order.address.street }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order_price">
          {{ $locale[$lang].orders.toPay }} {{ order.amount }} KZT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "../loader";
import Loader from '../loader.vue';

export default {
  name: "orderItem",
  components: {
    Loader
  },
  data: () => ({
    orderData: null,
    loader: false,
  }),

  methods: {
    dateOrder(date) {
      let getyear = new Date().getUTCFullYear(date);
      let getmounth = new Date().getUTCMonth(date);
      if (getmounth < 10) getmounth = "0" + getmounth;
      let getday = new Date().getUTCDate(date);
      if (getday < 10) getday = "0" + getday;

      return getday + "." + getmounth + "." + getyear;
    },
  },

  mounted() {
    this.loader = true;
    this.$axios
      .post(`${this.$store.state.apiUrl}user-orders`, {
        token: $cookies.get("userToken"),
      })
      .then((response) => {
        setTimeout(() => {
          this.loader = false;
          this.orderData = response.data;
        }, 1000);
      })
      .catch((error) => {});
  },
};
</script>

<style scoped>
</style>