<template>
  <v-container class="home-page">
    <v-row>
      <v-col class="mb-8" cols="md-4" sm="6" v-for="article in articles" :key="article.id">
        <article-item :article="article" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pagination">
      <v-btn color="primary" rounded class="px-5" :to="linkPrevPage" nuxt v-if="hasPrevPage">
        <v-icon class="pr-1">mdi-arrow-left-circle</v-icon>
        Quay lại
      </v-btn>

      <span class="white--text mx-3">{{ totalOfPage }}</span>

      <v-btn color="primary" rounded class="px-5" :to="linkNextPage" nuxt v-if="hasNextPage">
        Kế tiếp
        <v-icon class="pl-1">mdi-arrow-right-circle</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ArticleItem from '@/components/article/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  watchQuery: ['page'],
  async asyncData({ store, route }) {
    let page = parseInt(route.query.page || 1)
    try {
      const articles = await store.dispatch('article/getArticles', page)
      return { articles }
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapState(['article']),
    page() {
      return parseInt(this.$route.query.page || 1)
    },
    linkNextPage() {
      return `?page=${this.page + 1}`
    },
    linkPrevPage() {
      return `?page=${this.page - 1}`
    },
    hasNextPage() {
      return this.article.totalArticles > process.env.PERPAGE * this.page
    },
    hasPrevPage() {
      return this.page != 1
    },
    totalOfPage() {
      let total = Math.ceil(this.article.totalArticles / process.env.PERPAGE)
      return `Trang ${this.page} / ${total}`
    }
  }
}
</script>
