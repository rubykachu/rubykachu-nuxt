<template>
  <v-container class="panel">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card ref="form" class="rounded-15">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Đăng nhập tài khoản</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>
            <v-form>
              <v-text-field label="Email" prepend-icon="mdi-email" v-model="credential.email" />

              <v-text-field label="Mật khẩu" prepend-icon="mdi-lock" type="password" v-model="credential.password" />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" dark @click="login">Đăng nhập</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentication',
  data: () => ({
    credential: {
      email: 'vhquocminhit@gmail.com',
      password: 'Quocminh27!@#'
    }
  }),
  methods: {
    async login() {
      try {
        const res = this.$store.dispatch('auth/login', this.credential)
        this.$router.push({ name: 'article-new' })
      } catch (e) {
        console.log(e)
        store.dispatch('toast/show')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
