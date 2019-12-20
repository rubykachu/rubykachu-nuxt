<template>
  <v-card class="mx-auto article-item" hover :to="`/article/` + article.slug" nuxt min-height="387px">
    <v-chip class="article-item__category px-5 py-3 font-weight-bold" :color="article.category.color" text-color="white">
      {{ article.category.name }}
    </v-chip>
    <v-hover v-slot:default="{ hover }">
      <v-img
        class="white--text align-end article-item__image"
        :class="{ 'on-hover': hover }"
        max-height="200px"
        :src="article.image_thumb"
        lazy-src="/bg_lazy.svg"
        color="grey dark-3"
        aspect-ratio="1"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-hover>

    <div class="white article-item__content-wrapper">
      <div class="article-item__content">
        <v-card-title class="pb-2 break-work">{{ article.title }}</v-card-title>

        <v-card-text class="text--primary">{{ article.description }}</v-card-text>
      </div>

      <v-divider></v-divider>

      <v-card-actions class="px-3">
        <v-avatar size="36px" color="grey darken-3" class="elevation-3">
          <img alt="Avatar" src="/avatar-author.svg" />
        </v-avatar>

        <span class="ml-3">Minh Tang Q.</span>

        <v-spacer></v-spacer>

        <div class="caption">
          <div>
            <v-icon color="primary" class="icon-size">mdi-calendar-week</v-icon>
            <span class="subheading">{{ CreatedAt }}</span>
          </div>
          <div>
            <v-icon color="primary" class="icon-size">mdi-circle-slice-5</v-icon>
            {{ article.reading_time }} phút
          </div>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
import { formatDate } from '@/mixins/helper.js'

export default {
  props: {
    article: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    category: null
  }),
  computed: {
    CreatedAt() {
      return formatDate(this.article.created_at)
    }
  }
}
</script>
