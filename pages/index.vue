<template>
  <v-container class="home-page">
    <v-row>
      <v-col class="mb-8" cols="md-4" sm="6" v-for="article in articles" :key="article.id">
        <article-item :article="article" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pagination" v-if="hasLoadMore">
      <v-btn class="mx-2" fab color="secondary" @click="loadMore">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ArticleItem from '@/components/article/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
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
    page() {
      return parseInt(this.$route.query.page || 1)
    },
    hasLoadMore() {
      return this.total > this.$store.state.article.articles.length
    }
  },
  methods: {
    async loadMore() {
      this.articles = await this.$store.dispatch('article/loadMore')
    }
  }
}
</script>
