<template>
  <v-container class="home-page">
    <v-row>
      <v-col class="mb-8">
        <article-item />
      </v-col>
      <v-col class="mb-8">
        <article-item />
      </v-col>
      <v-col class="mb-8">
        <article-item />
      </v-col>
      <v-col class="mb-8">
        <article-item />
      </v-col>
      <v-col class="mb-8">
        <article-item />
      </v-col>
      <v-col class="mb-8">
        <article-item />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pagination">
      <span class="white--text mr-3">Page 2 of 2</span>
      <v-btn color="primary" rounded class="px-5">Next</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  }
}
</script>
