<template>
  <v-container class="home-page">
    <v-row>
      <v-col class="mb-8" cols="md-4" sm="6" v-for="article in articles" :key="article.id">
        <article-item :article="article" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pagination">
      <v-btn color="primary" rounded class="px-5">
        <v-icon class="pr-1">mdi-arrow-left-circle</v-icon>
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
    try {
      const articles = await store.dispatch('article/getArticles')
      const total = await store.dispatch('article/getTotalArticle')
      return { articles, total }
    } catch (e) {
      store.dispatch('toast/show')
    }
  },
  computed: {
    ...mapState(['article']),
    page() {
      return parseInt(this.$route.query.page || 1)
    },
    hasNextPage() {
      // return this.total > process.env.PERPAGE * this.page
      return this.total > 2 * this.page
    },
    totalOfPage() {
      // let total = Math.ceil(this.total / process.env.PERPAGE)
      let total = Math.ceil(this.total / 2)
      return total > 1 ? `Trang ${this.page} / ${total}` : ''
    }
  }
}
</script>
