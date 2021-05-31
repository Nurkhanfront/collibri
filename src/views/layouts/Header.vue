<template>
  <div class="header_wrapper" v-if="headerData">
    <div class="header">
      <div class="container">
        <div class="header_content row">
          <div class="col-xl-3 col-5 col-md-3 col-lg-3">
            <router-link to="/" class="logo">
              <img src="@/assets/images/Logo.svg" alt="" />
            </router-link>
          </div>
          <div class="col-xl-5 m_none col-md-4 col-lg-5">
            <form action="">
              <img src="@/assets/images/search_icon.svg" alt="" />
              <input
                type="text"
                placeholder="Поиск товара"
                @input="keyUpSearch(searchValue)"
                v-model.trim="searchValue"
              />
            </form>
            <div class="formResults" v-if="searchData">
              <ul>
                <li
                  v-for="link in searchData.data"
                  :key="link.title"
                  @click="
                    (searchValue = ''),
                      (searchData = false),
                      productUrl(link.slug)
                  "
                >
                  <router-link
                    :to="{
                      name: 'product',
                      params: { id: link.slug },
                    }"
                    >{{ link.title }}</router-link
                  >
                </li>
              </ul>
            </div>
            <div
              class="formResults"
              v-else-if="!searchData && searchValue.length > 3"
            >
              <p class="m-0">Совпадении нет !</p>
            </div>
          </div>
          <div class="col-xl-4 col-5 col-md-5 col-lg-4">
            <div class="header_content_right">
              <a href="tel:+7 707 777-77-77" v-if="headerData" class="m_none"
                ><i class="fas fa-phone-alt"></i
                >{{ headerData.contacts.phone_number[0] }}</a
              >

              <div class="header_cart">
                <img
                  src="@/assets/images/search_icon_black.svg"
                  class="d_none"
                  alt=""
                  @click="mobileSearch = true"
                />
                <router-link to="/favorites" class="countFavorites"
                  ><i class="far fa-heart"></i>
                  <span v-if="favLength">{{ favLength }}</span>
                </router-link>
                <router-link to="/cart" class="countFavorites">
                  <img src="@/assets/images/shop_icon.svg" alt="" />
                  <span v-if="cartLength">{{ cartLength }}</span>
                </router-link>
                <a href="#" @click.prevent="goToProfilePage">
                  <img src="@/assets/images/user.svg" alt="" />
                </a>
                <div class="lang">
                  <span @click="changeLanguage">{{ switchLang }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 d_none">
            <div
              class="burger_menu"
              @click="toggleMobileMenu"
              :class="{ burger_active: mobileMenu }"
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar :categories="headerData.categories" />
    <MobileNavbar
      :headerData="headerData"
      :mobileMenu="mobileMenu"
      :mobileSearch="mobileSearch"
      :searchData="searchData"
      @closeSearch="mobileSearch = false"
      @searchMobileValue="keyUpSearch"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

export default {
  components: {
    Navbar,
    MobileNavbar,
  },

  data: () => ({
    category: null,
    lang: null,
    headerData: null,
    searchData: null,
    searchValue: "",
    favoriteList: null,
    mobileMenu: false,
    mobileSearch: false,
  }),
  computed: {
    ...mapGetters(["GET_FAVOURITE_COUNT", "GET_CART_LENGTH"]),

    favLength() {
      if (
        this.GET_FAVOURITE_COUNT &&
        JSON.parse(localStorage.getItem("favorite"))
      ) {
        return JSON.parse(localStorage.getItem("favorite")).length;
      }
    },

    cartLength() {
      if (
        this.GET_CART_LENGTH &&
        JSON.parse(localStorage.getItem("cart_products"))
      ) {
        return JSON.parse(localStorage.getItem("cart_products")).length;
      }
    },

    switchLang() {
      if (localStorage.getItem("lang") !== null) {
        return localStorage.getItem("lang");
      } else {
        return "ru";
      }
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS", "GET_PRODUCT_PAGE"]),

    keyUpSearch(e) {
      let vm = this;
      if (e.length > 2) {
        this.$axios
          .get(`${this.$store.state.apiUrl}search?lang=${this.$lang}&text=${e}`)
          .then(function (response) {
            if (response.data.data.length) {
              vm.searchData = response.data;
            } else {
              vm.searchData = null;
            }
          });
      } else {
        vm.searchData = null;
      }
    },

    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
      if (this.mobileMenu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },

    changeLanguage() {
      this.lang = localStorage.getItem("lang");
      this.$store.commit("CHANGE_LANGUAGE");
    },

    productUrl(url) {
      this.GET_PRODUCT_PAGE(url);
    },

    goToProfilePage() {
      if ($cookies.isKey("userToken")) {
        this.$router.push("/my-account");
      } else {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang");
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-header?lang=${this.$store.state.lang}`
      )
      .then((response) => (this.headerData = response.data));
  },
  watch: {
    mobileSearch(item) {
      if (item) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
    $route(to, from) {
      this.navDropdown = false;
      this.mobileSearch = false;
      this.mobileMenu = false
    },
  },
};
</script>
