<template>
  <v-container class="panel">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card ref="form" class="rounded-15">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Đăng nhập tài khoản</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                v-model="credential.email"
                :error-messages="msgEmailInvalid"
                @blur="$v.credential.email.$touch()"
                :loading="loading"
              />

              <v-text-field
                label="Mật khẩu"
                prepend-icon="mdi-lock"
                type="password"
                v-model="credential.password"
                :error-messages="msgPasswordInvalid"
                @blur="$v.credential.password.$touch()"
                :loading="loading"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" light @click="login" :disabled="loading">Đăng nhập</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    loading: false,
    credential: {
      email: '',
      password: ''
    }
  }),
  validations: {
    credential: {
      email: { required },
      password: { required }
    }
  },
  computed: {
    msgEmailInvalid() {
      if (!this.$v.credential.email.$error) return
      if (!this.$v.credential.email.required) return 'Vui lòng nhập email'
    },
    msgPasswordInvalid() {
      if (!this.$v.credential.password.$error) return
      if (!this.$v.credential.password.required) return 'Vui lòng nhập mật khẩu'
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.$v.credential.$touch()
      if (!this.$v.credential.$invalid) {
        try {
          await this.$store.dispatch('auth/login', this.credential)
          this.$store.dispatch('app/setKeyCompAppHeader')
          this.$store.dispatch('toast/show', 'Đăng nhập thành công!')
          this.$router.push({ name: 'article-new' })
        } catch (e) {
          this.loading = false
          if (e.code == 'auth/invalid-email' || e.code == 'auth/wrong-password') {
            this.$store.dispatch('toast/show', 'Đăng nhập không thành công!')
          } else {
            this.$store.dispatch('toast/show', 'Có lỗi xảy ra trong quá trình đăng nhập')
          }
        }
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
