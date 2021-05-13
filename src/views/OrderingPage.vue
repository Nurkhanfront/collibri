<template>
  <div class="ordering p_page">
    <div class="order_loader" v-if="loader">
      <loader />
      <div class="loader_order_text">
        <h3>Обработка запроса...</h3>
      </div>
    </div>

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
                    <input
                      type="text"
                      placeholder="Имя и фамилия"
                      v-model.trim="name"
                      :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                    />
                    <span v-if="$v.name.$error" class="error">{{
                      $locale[$lang].placeholders.name
                    }}</span>
                  </div>
                  <div class="col-xl-6">
                    <the-mask
                      :mask="['#(###) ###-##-##']"
                      v-model.trim="phone"
                      :placeholder="$locale[$lang].placeholders.PhoneNumber"
                      :class="{
                        invalid:
                          ($v.phone.$dirty && !$v.phone.required) ||
                          ($v.phone.$dirty && !$v.phone.minLength),
                      }"
                    />
                    <span v-if="$v.phone.$error" class="error"
                      >{{ $locale[$lang].errors.PhoneNumber }}
                      {{ phone.length }}</span
                    >
                  </div>
                  <div class="col-xl-6">
                    <input
                      type="text"
                      :placeholder="$locale[$lang].placeholders.email"
                      v-model.trim="email"
                      :class="{
                        invalid:
                          ($v.email.$dirty && !$v.email.required) ||
                          ($v.email.$dirty && !$v.email.email),
                      }"
                    />
                    <span
                      v-if="$v.email.$dirty && $v.email.$error"
                      class="error"
                      >{{ $locale[$lang].errors.email }}</span
                    >
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="ordering_tabs">
                      <p>Доставка</p>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="title_block ordering_padding">
                      <p>Адрес</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-8 m_input">
                        <input
                          type="text"
                          placeholder="Улица"
                          v-model.trim="street"
                          :class="{
                            invalid: $v.street.$dirty && !$v.street.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-4 m_input">
                        <input
                          type="text"
                          placeholder="Дом"
                          v-model="house"
                          :class="{
                            invalid: $v.house.$dirty && !$v.house.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          placeholder="Корпус"
                          v-model.trim="building"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          placeholder="Подъезд"
                          v-model="entrance"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" placeholder="Этаж" v-model="floor" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          placeholder="Квартира"
                          v-model="apartment"
                        />
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
                <button
                  type="button"
                  class="btn btn_black mt-5 m-0 m_none"
                  @click="submit"
                >
                  Перейти к оплате
                </button>
              </form>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>Ваш заказ</h2>
            </div>
            <div v-if="cartData">
              <div class="your_order">
                <cardOrderProduct
                  v-for="card in cartData"
                  :key="card.id"
                  :productCard="card"
                  @deleteProduct="deleteProduct(index)"
                />
              </div>
              <div class="total">
                <p>Итого: {{ totalPrice }} KZT</p>
              </div>
            </div>
            <div v-else>
              <h3>Корзина пуста</h3>
            </div>
          </div>
          <div class="text-center d_none w-100 mt-5">
            <button
              type="button"
              class="btn btn_black mt-5 m-auto"
              @click="submit"
            >
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
import loader from "../components/loader";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components: { cardOrderProduct, loader },
  data: () => ({
    cartData: null,
    totalPrice: null,
    name: "",
    phone: "",
    email: "",
    street: "",
    house: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    comment: "",
    loader: false,
    loadingPoints: "",
  }),

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },

    phone: {
      required,
      minLength: minLength(11),
    },

    email: {
      email,
      required,
    },

    street: {
      required,
    },

    house: {
      required,
    },
  },

  methods: {
    deleteProduct(index) {
      this.cartData.splice(index, 1);
      if (this.cartData.length === 0) {
        this.cartData = null;
      }
      this.$store.commit("DELETE_PRODUCT", index);
    },

    submit() {
      let address = {
        street: this.street,
        house: this.house,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartment: this.apartment,
        Comment: this.comment,
      };

      let contacts = {
        name: this.name,
        phone: this.phone,
        email: this.email,
      };

      let products = JSON.parse(localStorage.getItem("productsData"));

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      } else {
        this.loader = true;
        this.$axios
          .post(`${this.$store.state.apiUrl}get-order`, {
            address,
            contacts,
            products,
          })
          .then((response) => {
            let url = response.data.url;
            window.location.href = url;
            this.loader = true;
          })
          .catch((error) => {
            this.loader = false;
          });
      }
    },
  },

  mounted() {
    this.totalPrice = localStorage.getItem("totalPrice");
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