<template>
  <v-app class="background--gradient">
    <v-container class="py-0">
      <app-header />

      <v-content>
        <nuxt />
      </v-content>

      <footer class="app-footer">
        <v-row no-gutters="">
          <v-col cols="md-5" lg="4" sm="12"><recent-posts /></v-col>
          <v-col cols="md-3" lg="4" sm="12"><tag-cloud /></v-col>
          <v-col cols="md-4" lg="4" sm="12"><tag-cloud /></v-col>
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
