<template>
  <div class="order_item">
        <div class="order_number">
          <p>№ {{order.id}}</p>
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
                      <p>{{order.status_order}}</p>
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
                      <p>{{order.data_delivery}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2">
              <div class="image_order">
                <img src="../../assets/images/new_prod_img4.png" alt="">
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
                    <p>Способ доставки</p>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                  <div class="order_title_status">
                    <p>{{order.way_delivery}}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-3 col-lg-4">
                  <div class="order_titles">
                    <p>Адрес доставки</p>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                  <div class="order_title_status">
                    <p>{{order.address_delivery}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    <!--        <p>Способ доставки</p>-->
    <!--        <p>Адрес доставки</p>-->
    <!--        <p>{{order.way_delivery}}</p>-->
    <!--        <p>{{order.address_delivery}}</p>-->
    <div class="order_price">
      К оплате: {{ order.price }} KZT
    </div>
  </div>
</template>

<script>
export default {
  name: "orderItem",
  props: ['order']
}
</script>

<style scoped>

</style>