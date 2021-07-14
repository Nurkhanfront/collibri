<template>
  <div class="blog p_page" v-if="blogsData">
    <div class="container">
      <div class="title_small text-center">
        <h1>{{ $locale[$lang].titleBlog }}</h1>
      </div>
      <div class="blog_content">
        <div class="row">
          <div
            class="col-xl-4 col-md-6 col-lg-4"
            v-for="blog in blogsData.blogs.data"
            :key="blog.id"
          >
            <div class="card">
              <router-link
                :to="{
                  name: 'blogPage',
                  params: { id: blog.slug },
                }"
              >
                <img
                  :src="imgUrl + blog.image"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title" v-if="blog.title">
                    {{ blog.title.slice(0, 50) + " ..." }}
                  </h5>
                  <p class="card-text">{{ dateBlog(blog.updated_at) }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from "../modules/date";

export default {
  metaInfo() {
    return {
      title: this.$store.state.metaTitle + ' | ' + 'Collibri',
    };
  },
  data: () => ({
    blogsData: null,
    imgUrl: null,
  }),
  methods: {
    dateBlog(date) {
      return getDate(date);
    },
  },
  mounted() {
    this.imgUrl = this.$store.state.imgUrl;
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-blogs?lang=${this.$store.state.lang}`
      )
      .then((response) => {
        this.blogsData = response.data;
        this.$store.state.metaTitle = response.data.page_meta.meta_title;
        // this.$store.state.metaDesctiption = response.data.page_meta.meta_description;
      });
  },
};
</script>

<style></style>
