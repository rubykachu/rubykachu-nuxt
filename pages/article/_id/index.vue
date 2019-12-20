<template>
  <v-container fluid class="article-page px-0">
    <v-row>
      <v-col cols="12">
        <v-card class="d-flex align-start flex-column rounded-15" color="grey" min-width="100%" min-height="400" :img="featureImage">
          <v-card class="pa-2 mb-auto" color="transparent" outlined>
            <v-card-text>
              <!-- Created at -->
              <v-icon color="white" class="icon-size mr-1">mdi-calendar-week</v-icon>
              <span class="subheading white--text">{{ formatCreatedAt }}</span>

              <!-- Reading time -->
              <v-icon color="white" class="icon-size ml-5 mr-1">mdi-circle-slice-5</v-icon>
              <span class="subheading white--text">{{ article.reading_time }} phút</span>

              <!-- Counter -->
              <v-icon color="white" class="icon-size ml-5 mr-1">mdi-read</v-icon>
              <span class="subheading white--text">{{ article.counter || 1 }} lần</span>

              <v-btn color="warning" :to="`/article/${article.slug}/update`" nuxt text small class="ml-2" v-if="isLogged">
                <v-icon class="mr-1">mdi-lead-pencil</v-icon> Chỉnh sửa
              </v-btn>
            </v-card-text>
          </v-card>

          <v-card class="pa-2" color="transparent" outlined>
            <v-card-text>
              <v-chip :color="article.category.color" class="px-8 white--text font-weight-bold">{{ article.category.name }}</v-chip>
              <h1 class="pt-5 white--text article-page__title break-work">
                {{ article.title }}
              </h1>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <div class="article-page__content-wrapper mt-12 mb-20 pa-4">
      <v-row>
        <v-col cols="12">
          <!-- Content -->
          <div v-html="article.content" class="mb-5"></div>

          <!-- Link Next Article -->
          <p class="mb-1" v-if="nextArticle">
            <nuxt-link :to="`/article/${nextArticle.slug}`" class="orange--text" :title="nextArticle.title">
              <strong>Tiếp theo:</strong> {{ nextArticle.title }}
            </nuxt-link>
          </p>

          <!-- Link Prev Article -->
          <p v-if="prevArticle">
            <nuxt-link :to="`/article/${prevArticle.slug}`" class="orange--text" :title="prevArticle.title">
              <strong>Bài trước:</strong> {{ prevArticle.title }}
            </nuxt-link>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="4" offset-sm="4">
          <v-text-field
            outlined
            dense
            hide-details
            readonly
            background-color="grey lighten-4"
            append-icon="mdi-content-copy"
            label="Copy link and share article"
            @click:append="copyToClipboard"
            class="text-field-copy-link"
            :value="articleLink"
            id="copy-link-article"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <author />
    <next-prev-link />
  </v-container>
</template>

<script>
import Prism from 'prismjs'
import { mapGetters } from 'vuex'
import Author from '@/components/article/Author.vue'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-ruby.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-yaml.min.js'
import 'prismjs/components/prism-bash.min.js'

import { removeLineBreak, formatDate } from '@/mixins/helper'

export default {
  components: {
    Author
  },
  head() {
    return {
      title: this.article.title,
      meta: [{ hid: 'description', name: 'description', content: removeLineBreak(this.article.description) }]
    }
  },
  data: () => ({
    articleLink: '',
    nextArticle: {},
    prevArticle: {}
  }),
  async asyncData({ store, params }) {
    try {
      const article = await store.dispatch('article/findArticle', params.id)
      return { article }
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  },
  async mounted() {
    // Highlight code
    Prism.highlightAll()

    // Set link copy
    this.articleLink = this.$el.baseURI

    // Update counter article
    let counter = Number(this.article.counter || 0)
    this.$store.dispatch('article/updateCounter', { id: this.article.id, counter: counter + 1 })

    // Get article prev and next
    let article = await this.$store.dispatch('article/getArticleNextAndPrev', this.article)
    this.nextArticle = article.next
    this.prevArticle = article.prev
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    formatCreatedAt() {
      return formatDate(this.article.created_at)
    },
    featureImage() {
      return this.article.image ? this.article.image : '/bg_default_post_detail_1600x500.jpg'
    }
  },
  methods: {
    copyToClipboard() {
      const el = document.getElementById('copy-link-article')
      el.value = this.articleLink
      el.select()
      document.execCommand('copy')

      this.$store.dispatch('toast/show', 'Đã coppy liên kết bài viết vào Clipboard')
    }
  }
}
</script>

<style lang="scss" scoped></style>
