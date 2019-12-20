<template>
  <v-app class="background--gradient">
    <v-container class="py-0" v-scroll="onScroll">
      <app-header />

      <v-content>
        <nuxt />
      </v-content>

      <footer class="app-footer">
        <v-container>
          <v-row>
            <v-col cols="md-8" sm="12"><recent-posts /></v-col>
            <v-col cols="md-4" sm="12"><about-me /></v-col>
          </v-row>

          <v-row justify="center" class="mt-10">
            <span class="published">Published with</span>
            <img
              src="https://api.netlify.com/api/v1/badges/f914239e-3621-445c-98a4-91d1212d48fe/deploy-status"
              alt="Netlify"
              height="20px"
            />
          </v-row>
        </v-container>
      </footer>

      <toast></toast>
    </v-container>

    <v-btn color="grey darken-4" dark small fixed bottom right fab v-show="goToTop" @click="toTop">
      <v-icon small>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import RecentPosts from '@/components/RecentPosts.vue'
import AboutMe from '@/components/AboutMe.vue'
import Toast from '@/components/Toast.vue'

export default {
  components: {
    AppHeader,
    RecentPosts,
    AboutMe,
    Toast
  },
  data: () => ({
    goToTop: false
  }),
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.goToTop = top > 100
    },
    toTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
