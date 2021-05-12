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
              <form>
                <div class="account_main_content">
                  <div class="row">
                    <div class="col-xl-6 col-md-6">
                      <div class="inputs">
                        <input type="text" placeholder="Имя" />
                      </div>
                    </div>
                    <div class="col-xl-6 col-md-6">
                      <div class="inputs">
                        <input type="text" placeholder="Фамилия" />
                      </div>
                    </div>
                  </div>

                  <div class="row mt-5">
                    <div class="col-xl-2 col-2">
                      <div class="font_600">
                        <p>Email:</p>
                      </div>
                    </div>
                    <div class="col-xl-10 col-10">
                      <p>lorem@ipsum.com</p>
                    </div>
                  </div>
                  <div class="row my-4 align-items-center">
                    <div class="col-xl-2">
                      <div class="font_600">
                        <p class="mb-0">Пароль:</p>
                      </div>
                    </div>
                    <div class="col-xl-10">
                      <button class="btn btn_outline_dark mt-2">
                        Изменить
                      </button>
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
                        :mask="['#(###) ###-####']"
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
                        <vue-picker v-model="options">
                          <vue-picker-option value="Город">{{
                            options
                          }}</vue-picker-option>
                        </vue-picker>
                      </div>
                      <div class="col-xl-6 col-md-6">
                        <vue-picker v-model="options">
                          <vue-picker-option value="Город"
                            >Город</vue-picker-option
                          >
                        </vue-picker>
                      </div>
                    </div>
                    <div class="row my-4">
                      <div class="col-xl-9 col-md-9">
                        <div class="inputs">
                          <input type="text" placeholder="Улица" />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3">
                        <div class="inputs">
                          <input type="text" placeholder="Дом" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input type="text" placeholder="Корпус" />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input type="text" placeholder="Подъезд" />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input type="text" placeholder="Этаж" />
                        </div>
                      </div>
                      <div class="col-xl-3 col-md-3 col-6">
                        <div class="inputs">
                          <input type="text" placeholder="Квартира" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn_gray">Сохранить</button>
              </form>
            </div>
          </div>
          <Orders :tabs="tabs" v-if="current === 'order'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VuePicker, VuePickerOption } from "@invisiburu/vue-picker";
import Orders from "@/components/order/Orders";
export default {
  name: "AccountPage",
  data: () => ({
    options: "Город",
    current: "data",
    tabs: [
      {
        id: 1,
        title: "Текущие заказы",
      },
      {
        id: 2,
        title: "Все заказы",
      },
    ],
  }),
  components: {
    Orders,
    VuePicker,
    VuePickerOption,
  },
  methods: {
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
        user_id: userId
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>