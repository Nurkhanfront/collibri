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
          <span @click="catalogDropdown"
            >{{ $locale[$lang].navLang.Catalog }}
            <transition name="slide-fade">
              <span
                class="arrow_dropdown"
                v-if="this.$store.state.catalogDropdown"
              ></span>
            </transition>
          </span>

          <transition name="slide-fade">
            <div class="nav_dropdown" v-if="this.$store.state.catalogDropdown">
              <div class="container">
                <div class="row">
                  <div
                    class="col-xl-3 col-lg-4 col-md-6 dropdown_links"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <div @click="closeDropdown(category.slug)">
                      <router-link
                        class="category_title"
                        :to="{
                          name: 'catalogPage',
                          params: {
                            id: category.id,
                            slug: category.slug,
                          },
                          query: {
                            page: 1,
                          },
                        }"
                        >{{ category.title }}</router-link
                      >
                    </div>
                    <div
                      v-for="subCategory in category.subcategories"
                      :key="subCategory.id"
                      @click="closeDropdown(subCategory.slug)"
                    >
                      <router-link
                        :to="{
                          name: 'catalogPage',
                          params: {
                            id: subCategory.id,
                            slug: subCategory.slug,
                          },
                          query: {
                            page: 1,
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

  methods: {
    catalogDropdown() {
      this.$store.commit("CATALOG_DROPDOWN");
    },
    closeDropdown(slug) {
      localStorage.removeItem("filter_id");
      let routeSlug = this.$route.params.slug;
      if (routeSlug === slug) {
        this.$store.state.catalogDropdown = false;
      }
    },
  },

  watch: {
    $route(to, from) {
      this.$store.state.catalogDropdown = false;
    },
  },
};
</script>

<style>
</style>