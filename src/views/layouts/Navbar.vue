<template>
  <div class="nav m_none">
    <div class="container">
      <ul>
        <li>
          <router-link to="/" class="logo">{{
            $locale[$lang].navLang.main
          }}</router-link>
        </li>
        <li class="dropdown_link">
          <span @click="navDropdown = !navDropdown"
            >{{ $locale[$lang].navLang.Catalog }}
            <transition name="slide-fade">
              <span class="arrow_dropdown" v-if="navDropdown"></span>
            </transition>
          </span>

          <transition name="slide-fade">
            <div class="nav_dropdown" v-if="navDropdown">
              <div class="container">
                <div class="row">
                  <div
                    class="col-xl-3 dropdown_links"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <div>
                      <router-link
                        class="category_title"
                        :to="{
                          name: 'catalogPage',
                          params: { id: category.id, slug: category.slug },
                        }"
                        >{{ category.title }}</router-link
                      >
                    </div>
                    <div
                      v-for="subCategory in category.subcategories"
                      :key="subCategory.id"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
        <li>
          <router-link to="/brands" data-hover="Бренды">{{
            $locale[$lang].navLang.Brands
          }}</router-link>
        </li>
        <li>
          <router-link to="/about" data-hover="О компании">{{
            $locale[$lang].navLang.aboutCompany
          }}</router-link>
        </li>
        <li>
          <router-link to="/blogs" data-hover="Блог">{{
            $locale[$lang].navLang.blog
          }}</router-link>
        </li>
        <li>
          <router-link to="/contacts" data-hover="Контакты">{{
            $locale[$lang].navLang.contacts
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  data: () => ({
    navDropdown: false,
  }),
  watch: {
    $route(to, from) {
      this.navDropdown = false;
    },
  },
};
</script>

<style>
</style>