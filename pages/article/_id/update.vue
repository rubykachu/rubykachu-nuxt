<template>
  <div>
    <form-article action-type="update" :data-article="article">
      <template v-slot:toolbar-title>Cập nhập bài viết</template>
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
      title: `Cập nhập bài "${this.article.title}"`
    }
  },
  data: () => ({
    article: {}
  }),
  async asyncData({ store, route }) {
    try {
      const article = await store.dispatch('article/findSlug', route.params.id)
      return { article }
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  }
}
</script>
