<template>
  <v-container fluid class="article-page">
    <v-row>
      <v-card
        class="d-flex align-start flex-column rounded-15"
        color="grey"
        min-width="100%"
        min-height="400"
        img="http://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/2004612-1601x500.jpg"
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
            <span class="subheading white--text">{{ article.reading_time }}</span>
          </v-card-text>
        </v-card>

        <v-card class="pa-2" color="transparent" outlined>
          <v-card-text>
            <v-chip color="primary" class="px-8 font-weight-bold">Cloud</v-chip>
            <h1 class="py-5 white--text display-2">
              {{ article.title }}
            </h1>
          </v-card-text>
        </v-card>
      </v-card>
    </v-row>


    <div class="article-page__content-wrapper mt-12 mb-20 pa-7">
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
            :value="fullPath"
            @click:append=""
            class="text-field-copy-link"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <v-row class="section section--transparent author-info rounded-15" justify="center">
      <div class="section__content--w75">
        <div class="section__avatar">
          <v-avatar size="80">
            <img
              src="http://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/avatar-op2.jpg"
              alt="Minh Tang Q."
            ></img>
          </v-avatar>
        </div>
        <p class="section__title hover-link"><a class="white--text">Minh Tang Q.</a></p>
        <p class="section__content">
          We are a team working from Chile. We create some Ghost and Wordpress
          themes for differents markets, also, we offer live support via our
          ticket system.
        </p>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ store, params }) {
    try {
      let result = await store.dispatch('article/getArticle', params.id)
      return { article: result }
    } catch(e) {
      console.log(e)
    }
  },
  computed: {
    formatCreatedAt() {
      let created_at = this.article.created_at
      return created_at ? moment(created_at).format('MMM D, YYYY') : ''
    },
    fullPath() {
      return window.location.origin + this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped></style>
