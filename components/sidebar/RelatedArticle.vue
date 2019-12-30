<template>
  <div class="sidebar__related_article">
    <v-list two-line class="py-0">
      <v-list-item-title class="sidebar__title">
        <h4>Related Post</h4>
      </v-list-item-title>
      <template v-for="(article, index) in articles">
        <v-list-item :key="index" class="px-0 mb-3" active-class="inactive" :to="articleDetailLink(article.slug)" nuxt>
          <v-list-item-avatar size="60" class="mr-3 mt-2" color="grey darken-3">
            <v-img :src="article.image_thumb"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle class="pb-1">{{ formatCreatedAt(article.created_at) }}</v-list-item-subtitle>

            <v-list-item-title class="font-weight-medium">{{ article.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { formatDate } from '@/mixins/helper.js'
export default {
  data: () => ({
    articles: []
  }),
  async beforeCreate() {
    try {
      this.articles = await this.$store.dispatch('article/getRecentArticles')
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  },
  methods: {
    formatCreatedAt(date) {
      return formatDate(date)
    },
    articleDetailLink(id) {
      return `/article/${id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.inactive::before {
  opacity: 0;
}
</style>
