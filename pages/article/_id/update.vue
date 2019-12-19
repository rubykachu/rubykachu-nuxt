<template>
  <div>
    <form-article action-type="update" :data-article="article">
      <template v-slot:toolbar-title>Chỉnh sửa bài</template>
    </form-article>
  </div>
</template>

<script>
import FormArticle from '@/components/article/Form.vue'
export default {
  components: {
    FormArticle
  },
  head() {
    return {
      title: `Chỉnh sửa bài "${this.article.title}"`
    }
  },
  data: () => ({
    article: {}
  }),
  async asyncData({ store, route }) {
    try {
      const article = await store.dispatch('article/findSlug', route.params.id)
      article.created_at = new Date(article.created_at).toISOString().substr(0, 10)
      return { article }
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  }
}
</script>
