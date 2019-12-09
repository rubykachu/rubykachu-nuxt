<template>
  <v-card class="mx-auto article-item" hover :to="`/article/` + article.id" nuxt min-height="387px">
    <v-chip class="article-item__category px-5 py-3 font-weight-bold" :color="article.color" text-color="white">
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

    <div class="white">
      <div class="article-item__content">
        <v-card-title class="pb-2">{{ article.title }}</v-card-title>

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
      return moment(this.article.created_at).format('MMM D, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  position: relative;
  border-radius: 15px !important;
  border: 0 !important;
  background-color: unset;

  &__content {
    min-height: 130px;
  }

  &__image {
    border-radius: 15px 15px 0 0 !important;
  }

  &__category {
    position: absolute;
    z-index: 2;
    top: -15px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .icon-size {
    font-size: 15px;
  }

  .v-image {
    position: relative;
    &.on-hover::after {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .v-card {
    &__title {
      line-height: 1.5rem;
      font-size: 1.1rem;
    }
  }
}
</style>
