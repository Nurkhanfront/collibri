<template>
  <div class="order_item_wrapper" v-if="orderData">
    <div>
      <div class="title_block">
        <h3>Ваши заказы</h3>
      </div>
    </div>
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
                    <p>Статус заказа</p>
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
                    <p>Дата доставки</p>
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
              <!-- <div class="col-xl-3 col-lg-4">
              <div class="order_titles">
                <p>Способ доставки</p>
              </div>
            </div> -->
            </div>
            <div class="row">
              <div class="col-xl-3 col-lg-4">
                <div class="order_titles">
                  <p>Адрес доставки</p>
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
      <div class="order_price">К оплате: {{ order.amount }} KZT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderItem",

  data: () => ({
    orderData: null,
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
    this.$axios
      .post(`${this.$store.state.apiUrl}user-orders`, {
        token: $cookies.get("userToken"),
      })
      .then((response) => {
        this.orderData = response.data;
      })
      .catch((error) => {});
  },
};
</script>

<style scoped>
</style>