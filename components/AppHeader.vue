<template>
  <header class="app-header pt-5">
    <v-app-bar color="transparent" flat class="white--text">
      <v-toolbar-title
        ><h1 class="font-weight-black hover-link">
          <nuxt-link to="/" class="white--text">Rubykachu</nuxt-link>
        </h1></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn to="/" nuxt text color="white">Trang chủ</v-btn>

      <div>
        <v-menu open-on-hover bottom offset-y light min-width="200" max-width="280">
          <template v-slot:activator="{ on }">
            <v-btn text color="white" v-on="on">
              Danh mục
            </v-btn>
          </template>

          <v-list color="white">
            <v-list-item v-for="(category, index) in categories" :key="index" dense :to="`/categories/${category.id}`" nuxt>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn to="/article/new" nuxt text color="white" v-if="checkIsLocal">Viết bài</v-btn>
      <v-btn to="/login" nuxt text color="white" class="ml-2">Về tôi / CV</v-btn>

      <v-avatar color="pink" class="ml-2">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <div class="app-header__border"></div>
  </header>
</template>

<script>
import { isLocal } from '@/mixins/helper.js'

export default {
  name: 'AppHeader',
  data() {
    return {
      categories: []
    }
  },
  async beforeCreate() {
    try {
      this.categories = await this.$store.dispatch('category/getCategories')
    } catch (e) {
      console.log(e)
      store.dispatch('toast/show')
    }
  },
  computed: {
    checkIsLocal() {
      return isLocal()
    }
  }
}
</script>
