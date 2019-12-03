<template>
  <v-container>
    <v-row class="flex-column mb-10" justify="center" align="center">
      <v-col sm="10" class="section section--transparent rounded-30 py-10">
        <div class="icon-error mb-10">
          <v-icon color="white" size="120">mdi-alert-circle</v-icon>
        </div>

        <div>
          <div class="error-code mb-1">
            <h2 class="display-3 font-weight-black">{{ errorCode }}</h2>
          </div>

          <div class="error-text">
            <h1 class="display-2 font-weight-thin">{{ statusText }}</h1>
          </div>
        </div>
      </v-col>

      <v-col sm="10" class="mt-10 white--text" justify="center" align="center">
        <p class="display-1 font-weight-medium">Có gì đó sai ở đây...</p>
        <p class="subtitle-1 font-weight-regular">
          Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
        <v-btn to="/" nuxt color="secondary" rounded depressed class="px-5">
          <v-icon class="mr-2">mdi-reply-circle</v-icon>

          Trở lại trang chủ
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  computed: {
    errorCode() {
      return this.error.statusCode === 404 ? '404' : '501'
    },
    statusText() {
      return this.error.statusCode === 404
        ? 'Không tìm thấy trang'
        : 'Có lỗi xảy ra'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
