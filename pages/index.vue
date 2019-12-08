<template>
  <v-container class="home-page">
    <v-row>
      <v-col
        class="mb-8"
        cols="md-4"
        sm="6"
        v-for="article in articles"
        :key="article.id"
      >
        <article-item :article="article" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pagination">
      <span class="white--text mr-3">Page 2 of 2</span>
      <v-btn color="primary" rounded class="px-5">Next</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ArticleItem from '@/components/article/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  async asyncData({ store }) {
    try {
      const articles = await store.dispatch('article/getArticles')
      return { articles }
    } catch (e) {
      alert('Error: Please check console log')
      console.log(e)
    }
  }
}
</script>
