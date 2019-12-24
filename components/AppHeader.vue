<template>
  <header class="app-header pt-5">
    <v-toolbar color="transparent" flat light height="40px">
      <v-toolbar-title
        ><h1 class="font-weight-black hover-link">
          <nuxt-link to="/" class="white--text">Rubykachu</nuxt-link>
        </h1></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <!-- Desktop -->
      <v-toolbar-items class="hidden-sm-and-down">
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
        <v-btn text color="white" @click="logout" v-if="isLogged">
          Đăng xuất
        </v-btn>
      </v-toolbar-items>

      <!-- Mobile -->
      <div class="hidden-md-and-up">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      </div>
    </v-toolbar>

    <div class="app-header__border"></div>

    <!-- Drawer mobile -->
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <template v-for="(item, index) in Object.values(items)">
          <v-list-item :to="item.to" nuxt @click="handleClick(item)" v-if="!item.items">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Submenu -->
          <v-list-group v-model="item.active" :prepend-icon="item.icon" no-action v-else>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.slug"
              :to="`/categories/${subItem.slug}`"
              nuxt
              @click="closeDrawer(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
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
      items: {
        home: { icon: 'mdi-home-outline', title: 'Trang chủ', to: '/' },
        categories: { icon: 'mdi-file-table-box-multiple-outline', title: 'Danh mục', active: false },
        addArticle: { icon: 'mdi-pencil-box-outline', title: 'Viết Bài', to: '/article/new' }
      }
    }
  },
  async beforeCreate() {
    try {
      this.categories = await this.$store.dispatch('category/getCategories')
      this.items.categories.items = this.categories

      if (this.isLogged) {
        this.items.logout = { icon: 'mdi-login-variant', title: 'Đăng xuất', click: this.logout }
      }
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
        this.$store.dispatch('app/setKeyCompAppHeader')
        this.$store.dispatch('toast/show', 'Đăng xuất thành công!')
        this.$router.push('/')
        // location.href = '/'
      } catch (e) {
        console.log(e)
        this.$store.dispatch('toast/show', 'Đăng xuất không thành công. Xin thử lại!')
      }
    },
    closeDrawer(item) {
      item.active = !item.active
      this.drawer = !this.drawer
    },
    handleClick(item) {
      if (item.click) {
        item.click()
        return
      }
      return
    }
  }
}
</script>
