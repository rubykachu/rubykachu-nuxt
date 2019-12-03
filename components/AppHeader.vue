<template>
  <header class="app-header pt-5">
    <v-app-bar color="transparent" flat class="white--text">
      <v-toolbar-title
        ><h1 class="font-weight-black">Rubykachu</h1></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn to="/inspire" nuxt text color="white">inspire</v-btn>

      <div>
        <v-menu
          open-on-hover
          bottom
          offset-y
          light
          min-width="200"
          max-width="280"
        >
          <template v-slot:activator="{ on }">
            <v-btn text color="white" v-on="on">
              Categories
            </v-btn>
          </template>

          <v-list color="white">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click=""
              href="/"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn to="/" nuxt text color="white">Profile / CV</v-btn>

      <v-avatar color="pink" class="ml-2">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <div class="app-header__border"></div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })
}
</script>
