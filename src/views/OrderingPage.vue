<template>
  <div class="ordering p_page">
    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text"
          ><img src="@/assets/images/BACK.svg" alt="" />Вернуться к покупкам</a
        >
      </div>
      <div class="ordering_wrapper">
        <div class="title_small">
          <h1>Оформление заказа</h1>
        </div>
        <div class="row contacts_data">
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>Контактные данные</h2>
              <form action="" class="ordering_form">
                <div class="row">
                  <div class="col-xl-6">
                    <input type="text" placeholder="Имя и фамилия" />
                  </div>
                  <div class="col-xl-6">
                    <input type="text" placeholder="Номер телефона" />
                  </div>
                  <div class="col-xl-6">
                    <input type="text" placeholder="E-mail" />
                  </div>
                  <div class="col-xl-6">
                    <div class="check_input">
                      <input type="checkbox" id="check" />
                      <label for="check">Хочу получать рассылку</label>
                    </div>
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="ordering_tabs">
                      <a href="#" class="active_tab">Доставка</a>
                      <a href="#">Самовывоз</a>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="title_block ordering_padding">
                      <p>Адрес</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-6">
                        <select class="select_2" name="state">
                          <option value="AL">Регион</option>
                          <option value="AL">Регион1</option>
                          <option value="WY">Регион2</option>
                        </select>
                      </div>
                      <div class="col-xl-6">
                        <select class="select_2" name="state">
                          <option value="AL">Город</option>
                          <option value="AL">Город1</option>
                          <option value="WY">Город2</option>
                        </select>
                      </div>
                      <div class="col-xl-8 m_input">
                        <input type="text" placeholder="Улица" />
                      </div>
                      <div class="col-xl-4 m_input">
                        <input type="text" placeholder="Дом" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" placeholder="Корпус" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" placeholder="Подъезд" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" placeholder="Этаж" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" placeholder="Квартира" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="title_block">
                      <p>Комментарии к заказу</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-12">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Комментарии"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn_black mt-5 m-0 m_none">
                  Перейти к оплате
                </button>
              </form>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>Ваш заказ</h2>
            </div>
            <div class="your_order">
              <cardOrderProduct
                v-for="card in cartData"
                :key="card.id"
                :productCard="card"
                @deleteProduct="deleteProduct(index)"
              />
            </div>
            <div class="total">
              <p>Итого: KZT</p>
            </div>
          </div>
          <div class="text-center d_none w-100 mt-5">
            <button type="button" class="btn btn_black mt-5 m-auto">
              Перейти к оплате
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardOrderProduct from "../components/cardOrderProduct";

export default {
  components: { cardOrderProduct },
  data: () => ({
    cartData: null,
  }),

  methods: {
    deleteProduct(index) {
      this.cartData.splice(index, 1);
      if (this.cartData.length === 0) {
        this.cartData = null;
      }
      this.$store.commit("DELETE_PRODUCT", index);
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