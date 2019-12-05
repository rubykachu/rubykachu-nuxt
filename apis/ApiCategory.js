import ApiClient from '~/apis/ApiClient'

export default {
  get() {
    return ApiClient.get('/categories')
  }
}
