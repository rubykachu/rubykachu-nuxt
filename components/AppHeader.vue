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

      <v-btn to="/article/new" nuxt text color="white">Viết bài</v-btn>
      <v-btn color="secondary" depressed small fab class="ml-3" @click="logout" v-if="isLogged">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="app-header__border"></div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
    ...mapGetters('auth', ['isLogged'])
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$store.dispatch('toast/show', 'Đăng xuất thành công!')
        location.href = '/'
      } catch (e) {
        console.log(e)
        this.$store.dispatch('toast/show', 'Đăng xuất không thành công. Xin thử lại!')
      }
    }
  }
}
</script>
