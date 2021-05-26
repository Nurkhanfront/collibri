<template>
  <div class="ordering p_page">
    <div class="order_loader" v-if="loader">
      <loader />
      <div class="loader_order_text">
        <h3>{{ $locale[$lang].processingRequest }}...</h3>
      </div>
    </div>

    <div class="container">
      <div class="back_link">
        <a href="#" class="silver_text" @click.prevent="$router.go(-1)"
          ><img src="@/assets/images/BACK.svg" alt="" />{{$locale[$lang].buttons.backtoShopping}}</a
        >
      </div>
      <div class="ordering_wrapper">
        <div class="title_small">
          <h1>{{$locale[$lang].orderingPage.checkout}}</h1>
        </div>
        <div class="row contacts_data">
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>{{$locale[$lang].orderingPage.contactDetails}}</h2>
              <form action="" class="ordering_form">
                <div class="row">
                  <div class="col-xl-6">
                    <input
                      type="text"
                      :placeholder="$locale[$lang].placeholders.name"
                      v-model.trim="name"
                      :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                    />
                    <span v-if="$v.name.$error" class="error">{{
                      $locale[$lang].placeholders.name
                    }}</span>
                  </div>
                  <div class="col-xl-6">
                    <the-mask
                      :mask="['+7(###) ###-##-##']"
                      v-model.trim="phone"
                      type="text"
                      :masked="true"
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
                      <p>{{$locale[$lang].orderingPage.delivery}}</p>
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="title_block ordering_padding">
                      <p>{{$locale[$lang].orderingPage.address}}</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-8 m_input">
                        <input
                          type="text"
                          :placeholder="$locale[$lang].placeholders.street"
                          v-model.trim="street"
                          :class="{
                            invalid: $v.street.$dirty && !$v.street.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-4 m_input">
                        <input
                          type="text"
                          :placeholder="$locale[$lang].placeholders.house"
                          v-model="house"
                          :class="{
                            invalid: $v.house.$dirty && !$v.house.required,
                          }"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="$locale[$lang].placeholders.housing"
                          v-model.trim="building"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="$locale[$lang].placeholders.entrance"
                          v-model="entrance"
                        />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input type="text" :placeholder="$locale[$lang].placeholders.floor" v-model="floor" />
                      </div>
                      <div class="col-xl-3 m_input">
                        <input
                          type="text"
                          :placeholder="$locale[$lang].placeholders.flat"
                          v-model="apartment"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12 ordering_padding">
                    <div class="title_block">
                      <p>{{$locale[$lang].orderingPage.commentsOrder}}</p>
                    </div>
                    <div class="row">
                      <div class="col-xl-12">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          v-model="comment"
                          :placeholder="$locale[$lang].orderingPage.commentsOrder"
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
                  {{ $locale[$lang].buttons.proceedToCheckout }}
                </button>
              </form>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="title_block">
              <h2>{{$locale[$lang].orderingPage.yourOrder}}</h2>
            </div>
            <div v-if="cartData">
              <div class="your_order">
                <cardOrderProduct
                  v-for="(card, index) in cartData"
                  :key="card.id"
                  :productCard="card"
                  @deleteProduct="deleteProduct(index, card.id)"
                />
              </div>
              <div class="total">
                <p>{{$locale[$lang].orderingPage.total}}: {{ totalPrice }} KZT</p>
              </div>
            </div>
            <div v-else>
              <h3>{{$locale[$lang].cartisEmpty}}</h3>
            </div>
          </div>
          <div class="text-center d_none w-100 mt-5">
            <button
              type="button"
              class="btn btn_black mt-5 m-auto"
              @click="submit"
            >
              {{$locale[$lang].orderingPage.yourOrder}}
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
    deleteProduct(index, id) {
      this.cartData = this.cartData.filter((t) => t.id !== id);

      if (this.cartData.length === 0) {
        this.cartData = null;
      }

      this.$store.commit("DELETE_PRODUCT", id);
    },

    submit() {
      let address = {
        street: this.street,
        house: this.house,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartment: this.apartment,
      };

      let main_info = {
        comment: this.comment,
        name: this.name,
        phone: this.phone,
        email: this.email,
        token: $cookies.get("userToken"),
      };

      let products = JSON.parse(localStorage.getItem("productsData"));

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      } else if ($cookies.isKey("userToken")) {
        this.loader = true;
        this.$axios
          .post(`${this.$store.state.apiUrl}get-order`, {
            address,
            main_info,
            products,
          })
          .then((response) => {
            let url = response.data.url;
            window.location.href = url;
            this.loader = true;
            localStorage.removeItem('cart_products')
          })
          .catch((error) => {
            this.loader = false;
          });
      }else{
        this.loader = true;
        this.$axios
          .post(`${this.$store.state.apiUrl}get-order`, {
            address,
            main_info,
            products,
          })
          .then((response) => {
            let url = response.data.url;
            window.location.href = url;
            this.loader = true;
            localStorage.removeItem('cart_products')
          })
          .catch((error) => {
            this.loader = false;
          });
      }
    },
  },

  computed: {
    totalPrice() {
      let result = [];
      this.cartData.filter((item, i) => {
        for (let i of JSON.parse(localStorage.getItem("productsData"))) {
          if (item.id === i.id) {
            this.$set(item, "count", i.count);
            result.push(item.price * i.count);
          }
        }
      });

      result = result.reduce(function (sum, el) {
        return sum + el;
      });

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
            token: $cookies.get("userToken"),
          },
        })
        .then((response) => (this.cartData = response.data));
    }

    const userToken = $cookies.get("userToken");
    const userId = $cookies.get("userId");
    if(userToken !== null && userId !== null){
      this.$axios
      .post(`${this.$store.state.apiUrl}user-profile`, {
        token: userToken,
        user_id: userId,
      })
      .then((response) => {
        let userData = response.data.user;
        this.name = userData?.name;
        this.email = userData?.email;
        this.phone = userData?.phone;
        this.street = userData?.street;
        this.house = userData?.house;
        this.building = userData?.building;
        this.entrance = userData?.entrance;
        this.floor = userData?.floor;
        this.apartment = userData?.apartment;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
};
</script>

<style></style>
