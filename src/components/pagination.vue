<template>
  <div class="pagination_content">
    <div class="pagination">
      <!-- <ul>
        <li class="action_btn prev" @click="prevPage()" v-if="currentPage > 1">
          <i class="fas fa-chevron-left"></i>
        </li>
        <li class="nums" v-if="currentPage > 3">
          <span @click.prevent="togglePage(1)"
            >{{ paginationData.last_page - paginationData.last_page + 1 }}
          </span>
        </li>
        <span class="mr-1" v-if="currentPage > 3">...</span>
        <li
          class="nums"
          v-for="num in paginateList()"
          :key="num.label"
          @click.prevent="togglePage(num.label)"
          :class="{ active_page: currentPage == num.label }"
        >
          <span>{{ num.label }}</span>
        </li>
        <span class="mr-1" v-if="currentPage < paginationData.last_page - 3"
          >...</span
        >
        <li class="nums" v-if="currentPage < paginationData.last_page - 3">
          <span @click.prevent="togglePage(paginationData.last_page)">{{
            paginationData.last_page
          }}</span>
        </li>
        <li
          class="action_btn next"
          @click="nextPage()"
          v-if="currentPage < paginationData.last_page"
        >
          <i class="fas fa-chevron-right"></i>
        </li>
      </ul> -->
    </div>

    <div>
      <paginate
        v-model="currentPage"
        :page-count="paginationData.last_page"
        :page-range="3"
        :margin-pages="2"
        :click-handler="togglePage"
        :prev-text="'<span><</span>'"
        :next-text="'<span>></span>'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        class="pagination m-0"
      >
      </paginate>
    </div>
  </div>
</template>

<script>
export default {
  props: ["paginationData"],
  name: "Pagination",

  data: () => ({
    currentPage: 2,
  }),

  methods: {
    togglePage(num) {
      this.$emit("currentPage", num);
      this.currentPage = num;
    },

    nextPage(num) {
      if (this.currentPage !== this.paginationData.last_page) {
        this.currentPage++;
      }
      this.$emit("currentPage", this.currentPage);
    },

    prevPage(num) {
      if (this.currentPage != 1) {
        this.currentPage--;
      }
      this.$emit("currentPage", this.currentPage);
    },

    lastPage() {
      return this.paginationData.links.pop();
    },

    pageNum() {
      if (this.currentPage < 3) {
        return true;
      } else {
        return this.currentPage - 2;
      }
    },

    paginateList() {
      return this.paginationData.links.slice(
        this.pageNum(),
        this.currentPage + 3
      );
    },
  },

  mounted() {
    this.lastPage();
    this.currentPage = Number(this.$route.query.page);
  },

  watch: {
    $route(to, from) {
      this.currentPage = Number(this.$route.params.page);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
