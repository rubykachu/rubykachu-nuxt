<template>
  <v-app class="background--gradient">
    <v-container class="py-0">
      <app-header />

      <v-content>
        <nuxt />
      </v-content>

      <footer class="app-footer">
        <v-row>
          <v-col cols="4"><recent-posts /></v-col>
          <v-col cols="4"><tag-cloud /></v-col>
          <v-col cols="4"><about-me /></v-col>
        </v-row>
      </footer>
    </v-container>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import RecentPosts from '@/components/RecentPosts.vue'
import TagCloud from '@/components/TagCloud.vue'
import AboutMe from '@/components/AboutMe.vue'

export default {
  components: {
    AppHeader,
    RecentPosts,
    TagCloud,
    AboutMe
  }
}
</script>
