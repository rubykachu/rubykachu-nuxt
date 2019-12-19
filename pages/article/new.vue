<template>
  <div>
    <form-article action-type="create" :data-article="newArticleObject"></form-article>
  </div>
</template>

<script>
import FormArticle from '@/components/article/Form.vue'
export default {
  components: {
    FormArticle
  },
  head: () => ({
    title: 'Create a new article'
  }),
  computed: {
    newArticleObject() {
      return {
        title: '',
        slug: '',
        category: '',
        created_at: new Date().toISOString().substr(0, 10),
        reading_time: '',
        image: '',
        image_thumb: '',
        description: '',
        content: ''
      }
    }
  }
}
</script>
