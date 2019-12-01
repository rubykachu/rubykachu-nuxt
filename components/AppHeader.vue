<template>
  <header class="app-header pt-5">
    <v-app-bar color="transparent" flat class="white--text">
      <v-toolbar-title><b>Rubykachu</b></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn href="/" text color="white">Home</v-btn>
      <v-btn href="/" text color="white">Categories</v-btn>
      <v-btn href="/" text color="white">Write for blog</v-btn>
      <v-btn href="/" text color="white">Profile / CV</v-btn>

      <v-avatar color="pink">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <div class="app-header__border"></div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
