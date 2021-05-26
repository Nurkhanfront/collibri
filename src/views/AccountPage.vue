<template>
  <div class="account_page p_page">
    <div class="container">
      <div class="nav_page m_none">
        <div class="breadcrumbs">
          <router-link to="/">Главная</router-link>
          <router-link to="/my-account">Аккаунт</router-link>
        </div>
      </div>
      <div class="page_title m_none">
        <p>Мой аккаунт</p>
      </div>
      <div class="page_title d_none">
        <p>Мои данные</p>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-12 order_2">
          <div class="action_content">
            <div class="tab_actions">
              <p
                :class="{ tab_background_dark: current === 'data' }"
                @click="updateTab('data')"
              >
                Данные
              </p>
              <p
                :class="{ tab_background_dark: current === 'order' }"
                @click="updateTab('order')"
              >
                Заказы
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-12 order_1">
          <div class="account_content" v-if="current === 'data'">
            <div class="contacts_form">
              <form autocomplete="stopdoingthat">
                <div class="account_main_content">
                  <div class="row">
                    <div class="col-xl-6 col-md-6">
                      <div class="inputs">
                        <input type="text" placeholder="Имя" v-model="name" />
                      </div>
                    </div>
                    <div class="col-xl-6 col-md-6">
                      <div class="inputs">
                        <input
                          type="text"
                          placeholder="Фамилия"
                          v-model="first_name"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-xl-6 col-lg-6">
                      <div class="font_600">
                        <input
                          type="email"
                          :placeholder="$locale[$lang].placeholders.email"
                          v-model.trim="email"
                          autocomplete="stopdoingthat"
                          :class="{
                            invalid:
                              ($v.email.$dirty && !$v.email.required) ||
                              ($v.email.$dirty && !$v.email.email),
                          }"
                        />
                      </div>
                    </div>
                    <!-- <div class="col-xl-10 col-10">
                      <p>lorem@ipsum.com</p>
                    </div> -->
                  </div>
                  <div class="row my-4">
                    <div class="col-xl-2">
                      <div class="font_600">
                        <p class="mb-0 mt-4">Пароль:</p>
                      </div>
                    </div>
                    <div class="col-xl-10 change_password">
                      <div class="row" v-if="changePassword">
                        <div class="col-xl-4">
                          <label for="">Старый пароль</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            v-model.trim="oldPassword"
                            :class="{
                              invalid:
                                $v.oldPassword.$dirty &&
                                !$v.oldPassword.required,
                            }"
                          />
                          <span
                            class="error"
                            v-if="
                              $v.oldPassword.$dirty && !$v.oldPassword.required
                            "
                            >Введите новый пароль!</span
                          >
                          <span class="error" v-if="!$v.oldPassword.minLength">
                            Пароль должен быть из 6 символов. Сейчас он
                            {{ $v.oldPassword.$model.length }}.
                          </span>
                        </div>
                        <div class="col-xl-4">
                          <label for="">Новый пароль</label>
                          <input
                            type="password"
                            v-model.trim="password"
                            :class="{
                              invalid:
                                $v.password.$dirty && !$v.password.required,
                            }"
                          />
                          <span
                            class="error"
                            v-if="$v.password.$dirty && !$v.password.required"
                            >Введите новый пароль!</span
                          >
                          <span class="error" v-if="!$v.password.minLength">
                            Пароль должен быть из 6 символов. Сейчас он
                            {{ $v.password.$model.length }}.
                          </span>
                        </div>
                        <div class="col-xl-4">
                          <label for="">Подтвердите пароль</label>
                          <input
                            type="password"
                            v-model.trim="password_confirmation"
                            :class="{
                              invalid:
                                $v.password.$dirty && !$v.password.required,
                            }"
                          />
                          <span
                            class="error"
                            v-if="
                              $v.password.$dirty &&
                              !$v.password_confirmation.sameAsPassword
                            "
                            >Пароли не совпадают!</span
                          >
                        </div>
                      </div>
                      <div class="row justify-content-between">
                        <div class="col-xl-4">
                          <div class="change_password_bottom">
                            <button
                              class="btn btn_outline_dark mt-2"
                              v-if="!changePassword"
                              @click.prevent="changePassword = true"
                            >
                              Изменить
                            </button>
                            <button
                              class="btn btn_outline_dark mt-2"
                              v-if="changePassword"
                              @click.prevent="saveNewPassword"
                            >
                              Сохранить
                            </button>
                          </div>
                        </div>
                        <div class="col-xl-5 d-flex align-items-center">
                          <p class="m-0" v-if="password_saved">
                            Пароль сохранен
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account_bottom_content">
                  <div class="margin_input phone">
                    <div class="row align-items-center">
                      <p class="col-xl-2 col-md-2 mb-0 font_600 m_title">
                        Телефон:
                      </p>
                      <the-mask
                        class="col-xl-6 col-md-6"
                        :mask="['+7(###) ###-##-##']"
                        :masked="true"
                        v-model="phone"
                        placeholder="+7 (777) 777-77-77"
                      />
                    </div>
                  </div>
                  <div class="margin_input">
                    <div class="address_text">
                      <p class="font_600">Адрес</p>
                    </div>
                    <div class="row my-3">
                      <div class="col-xl-6 col-md-6">
                        <p class="font_600">Город: Алматы</p>
                        <!-- <vue-picker v-model="options">
                          <vue-picker-option value="Город">{{
                            options
                          }}</vue-picker-option>
                        </vue-picker> -->
                      </div>
                      <!-- <div class="col-xl-6 col-md-6"> -->
                      <!-- <vue-picker v-model="options">
                          <vue-picker-option value="Город"
                            >Город</vue-picker-option
                          >
                        </vue-picker> -->
                      <!-- </div> -->
                    </div>
                    <div class="row my-4">
                      <div class="col-xl-9 col-md-9">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Улица"
                            v-model="street"
                          />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Дом"
                            v-model="house"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Корпус"
                            v-model="building"
                          />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Подъезд"
                            v-model="entrance"
                          />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Этаж"
                            v-model="floor"
                          />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input
                            type="text"
                            placeholder="Квартира"
                            v-model="apartment"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account_bottom_btn">
                  <button class="btn btn_gray" @click.prevent="saveUserData">
                    Сохранить
                  </button>
                  <p v-if="savedUserData">Новые данные сохранены</p>
                  <button class="btn btn_black" @click.prevent="logOut">
                    Выйти
                  </button>
                </div>
              </form>
            </div>
          </div>
          <orderItem v-if="current === 'order'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VuePicker, VuePickerOption } from "@invisiburu/vue-picker";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";
import orderItem from "@/components/order/orderItem.vue";
export default {
  name: "AccountPage",
  components: {
    orderItem,
    VuePicker,
    VuePickerOption,
  },
  data: () => ({
    options: "Город",
    current: "data",
    changePassword: false,
    name: "",
    first_name: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    street: "",
    house: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    oldPassword: "",
    password: "",
    password_confirmation: "",
    savedUserData: false,
    password_saved: false,
    orderData: false,
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

    oldPassword: {
      required,
      minLength: minLength(6),
    },

    password: {
      required,
      minLength: minLength(6),
    },

    password_confirmation: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    saveUserData() {
      this.$axios
        .post(`${this.$store.state.apiUrl}user-update`, {
          name: this.name,
          first_name: this.first_name,
          email: this.email,
          phone: this.phone,
          street: this.street,
          house: this.house,
          building: this.building,
          entrance: this.entrance,
          floor: this.floor,
          apartment: this.apartment,
          token: $cookies.get("userToken"),
        })
        .then((response) => {
          let userData = response.data.user;
          this.name = userData?.name;
          this.first_name = userData.first_name;
          this.email = userData?.email;
          this.phone = userData?.phone;
          this.street = userData?.street;
          this.house = userData?.house;
          this.building = userData?.building;
          this.entrance = userData?.entrance;
          this.floor = userData?.floor;
          this.apartment = userData?.apartment;
          this.savedUserData = true;
          setTimeout(() => {
            this.savedUserData = false
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            this.loader = null;
          }, 500);
        });
    },

    saveNewPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        this.$axios
          .post(`${this.$store.state.apiUrl}password-update`, {
            old_password : this.oldPassword,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: $cookies.get("userToken"),
          })
          .then((response) => {
            this.password_saved = true;
            setTimeout(() => {
              this.changePassword = false,
              this.password_saved = false
            }, 1000);
          })
          .catch((error) => {});
      }
    },

    logOut() {
      this.$router.push("/");
      this.$axios
        .post(`${this.$store.state.apiUrl}log-out`, {
          token: $cookies.get("userToken"),
        })
        .then((response) => {
          $cookies.remove("userToken");
          $cookies.remove("userId");
          $cookies.remove("token_time");
          localStorage.removeItem('cart_products');
          this.$store.state.cartLength = 0
          this.$router.push("/");
        })
        .catch((error) => {});
    },

    updateTab(value) {
      if (value === "data") {
        this.current = value;
      }
      if (value === "order") {
        this.current = value;
      }
    },
  },
  mounted() {
    const userToken = $cookies.get("userToken");
    const userId = $cookies.get("userId");
    this.$axios
      .post(`${this.$store.state.apiUrl}user-profile`, {
        token: userToken,
        user_id: userId,
      })
      .then((response) => {
        let userData = response.data.user;
        this.name = userData?.name;
        this.first_name = userData.first_name;
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
  },
};
</script>

<style lang="scss" scoped>
</style>