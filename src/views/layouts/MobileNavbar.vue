<template>
  <div>
    <div class="mobile_search" v-if="mobileSearch">
      <span class="close_btn" @click="$emit('closeSearch')"
        ><img src="@/assets/images/close.svg" alt=""
      /></span>

      <form action="">
        <img src="@/assets/images/search_icon.svg" alt="" />
        <input
          type="text"
          placeholder="Поиск товара"
          @keyup="searchMobile(mobileSearchValue)"
          v-model="mobileSearchValue"
        />
      </form>
      <div class="formResults" v-if="searchData">
        <ul>
          <li
            v-for="link in searchData.data"
            :key="link.title"
            @click="
              (searchValue = ''), (searchData = false), productUrl(link.slug)
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
        v-else-if="!searchData && mobileSearchValue.length > 4"
      >
        <p class="m-0">Совпадении нет !</p>
      </div>
    </div>
    <div class="mobile_nav_menu" :class="{ mobile_menu_active: mobileMenu }">
      <div class="nav_top_menu">
        <div class="logo">
          <img src="@/assets/images/Logo.svg" alt="" />
        </div>
      </div>
      <div class="mobile_nav_links">
        <ul>
          <li>
            <a href="/" class="">{{ $locale[$lang].navLang.main }}</a>
          </li>
          <div class="mobile_dropdown">
            <li v-for="category in headerData.categories" :key="category.id">
              <div class="mob_dropdown_toggle">
                <span @click="categoryUrl(category.id), (mobileMenu = false)">
                  <router-link
                    class="category_title"
                    :to="{
                      name: 'catalogPage',
                      params: { id: category.id, slug: category.slug },
                    }"
                    >{{ category.title }}</router-link
                  >
                </span>

                <span @click="dropdownToggle(category.title)"
                  ><img src="@/assets/images/chevron_but.svg" alt="" />
                </span>
              </div>
              <transition name="slide">
                <div
                  class="mobile_dropdown"
                  v-if="mobileDropdown === category.title"
                >
                  <ul>
                    <li
                      v-for="subCategory in category.subcategories"
                      :key="subCategory.id"
                      @click="categoryUrl(subCategory.id), (mobileMenu = false)"
                    >
                      <router-link
                        :to="{
                          name: 'catalogPage',
                          params: {
                            id: subCategory.id,
                            slug: subCategory.slug,
                          },
                        }"
                        >{{ subCategory.title }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </div>
          <li @click="mobileMenu = false">
            <router-link to="/brands" data-hover="Бренды">{{
              $locale[$lang].navLang.Brands
            }}</router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/about" data-hover="О компании">{{
              $locale[$lang].navLang.aboutCompany
            }}</router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/blogs" data-hover="Блог">{{
              $locale[$lang].navLang.blog
            }}</router-link>
          </li>
          <li @click="mobileMenu = false">
            <router-link to="/contacts" data-hover="Контакты">{{
              $locale[$lang].navLang.contacts
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="mobile_nav_footer">
        <a href="tel:+7 (777) 777-77-77 ">{{
          headerData.contacts.phone_number[0]
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["headerData", "mobileMenu", "mobileSearch", "searchData"],
  data: () => ({
    mobileDropdown: null,
    mobileSearchValue: ''
  }),

  methods: {
    searchMobile(){
      this.$emit('searchMobileValue', this.mobileSearchValue)
    },

    dropdownToggle(category) {
      if (this.mobileDropdown === null) {
        this.mobileDropdown = category;
      } else {
        this.mobileDropdown = null;
      }
    },
  },
  watch: {
    mobileMenu(item) {
      if (item) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    },
  },
};
</script>

<style>
</style>