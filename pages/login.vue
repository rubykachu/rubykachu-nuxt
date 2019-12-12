<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" prepend-icon="mdi-email" v-model="credential.email" />

              <v-text-field label="Password" prepend-icon="mdi-lock" type="password" v-model="credential.password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'blank',
  data: () => ({
    credential: {
      email: 'vhquocminhit@gmail.com',
      password: 'Quocminh27!@#'
    }
  }),
  methods: {
    async login() {
      const logined = await this.$store.dispatch('user/login', this.credential)
      if (logined) {
        this.$router.push({
          name: 'article-new'
        })
      } else {
        alert('failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
