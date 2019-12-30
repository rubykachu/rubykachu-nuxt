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

        <div class="ml-3 text--grey article-item__author">
          <span class="font-weight-medium">Minh Tang Q.</span>
          <div class="grey--text text--darken-3">
            <!-- <v-icon color="grey darken-2" class="icon-size">mdi-calendar-week</v-icon> -->
            <span>{{ CreatedAt }}</span>
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="caption">
          <div>
            <v-icon color="primary" size="13">mdi-eye</v-icon>
            <span class="subheading">{{ article.counter || 0 }} lượt</span>
          </div>
          <div>
            <v-icon color="primary" size="13">mdi-circle-slice-5</v-icon>
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
