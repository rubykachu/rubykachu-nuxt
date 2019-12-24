<template>
  <header class="app-header pt-5">
    <v-toolbar color="transparent" flat light height="40px">
      <v-toolbar-title
        ><h1 class="font-weight-black hover-link">
          <nuxt-link to="/" class="white--text">Rubykachu</nuxt-link>
        </h1></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <!-- Desktop class="hidden-sm-and-down" -->
      <v-toolbar-items>
        <v-btn to="/" nuxt text color="white">Trang chủ</v-btn>
        <template v-if="categories.length > 0">
          <v-menu open-on-hover bottom offset-y light min-width="200" max-width="280">
            <template v-slot:activator="{ on }">
              <v-btn text color="white" v-on="on">
                Danh mục
              </v-btn>
            </template>

            <v-list color="white">
              <v-list-item v-for="(category, index) in categories" :key="index" dense :to="`/categories/${category.slug}`" nuxt>
                <v-list-item-title>{{ category.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-btn text color="white">Danh mục</v-btn>
        </template>

        <v-btn to="/article/new" nuxt text color="white">Viết bài</v-btn>
        <v-btn color="primary" depressed small class="ml-3" @click="logout" v-if="isLogged">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div class="app-header__border"></div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      categories: [],
      drawer: false,
      navItems: {
        home: { name: 'Trang chủ', link: '/' },
        categories: { name: 'Danh mục', link: '', submenu: [] },
        write: { name: 'Viết bài', link: '/article/new' },
        logout: { name: 'Logout', color: 'primary', depressed: true, size: 'small', click: 'logout' }
      }
    }
  },
  async beforeCreate() {
    try {
      this.categories = await this.$store.dispatch('category/getCategories')
      this.navItems.categories.submenu = this.categories
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
