<template>
  <v-container fluid class="article-page px-0">
    <v-row>
      <v-col cols="12">
      <v-card
        class="d-flex align-start flex-column rounded-15"
        color="grey"
        min-width="100%"
        min-height="400"
        :img="featureImage"
      >
        <v-card class="pa-2 mb-auto" color="transparent" outlined>
          <v-card-text>
            <v-icon color="white" class="icon-size mr-1"
              >mdi-calendar-week</v-icon
            >
            <span class="subheading white--text">{{ formatCreatedAt }}</span>
            <v-icon color="white" class="icon-size ml-5 mr-1"
              >mdi-circle-slice-5</v-icon
            >
            <span class="subheading white--text">{{ article.reading_time }} phút</span>
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
          <div v-html="article.content"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="4" offset-sm="4" class="my-10">
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

    <v-row class="section section--transparent author-info rounded-15" justify="center">
      <div class="section__content--w75">
        <div class="section__avatar">
          <v-avatar size="80">
            <img
              src="/avatar.jpg"
              alt="Minh Tang Q."
            ></img>
          </v-avatar>
        </div>
        <p class="section__title hover-link"><a class="white--text">Minh Tang Q.</a></p>
        <p class="section__content">
          Sinh ra và lớn lên tại Đà Nẵng. Đi làm từ năm 2013 đến giờ vẫn chưa có gì ngoài 1 bà vợ và sắp thành cha đứa trẻ thứ 2. Nghĩ thấy
      loser vl ra. Blog viết bởi tui, ai thích thì đọc, ai không thích thì đọc 😝
        </p>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-ruby.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-yaml.min.js'
import 'prismjs/components/prism-bash.min.js'

import { removeLineBreak, formatDate } from '@/mixins/helper'

export default {
  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: removeLineBreak(this.article.description) }
      ]
    }
  },
  data: () => ({
    articleLink: '',
  }),
  async asyncData({ store, params }) {
    try {
       const article = await store.dispatch('article/findArticle', params.id)
       return { article }
    } catch(e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  },
  mounted() {
    Prism.highlightAll()
    this.articleLink = this.$el.baseURI
  },
  computed: {
    formatCreatedAt() {
      return formatDate(this.article.created_at)
    },
    featureImage() {
      return this.article.image ? this.article.image : '/bg_default_post_detail_1600x500.jpg'
    }
  },
  methods: {
    copyToClipboard() {
      const el = document.getElementById('copy-link-article');
      el.value = this.articleLink;
      el.select();
      document.execCommand('copy');

      this.$store.dispatch('toast/show', 'Đã coppy liên kết bài viết vào Clipboard')
    }
  }
}
</script>

<style lang="scss" scoped></style>
