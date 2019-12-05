import ApiClient from '~/apis/ApiClient'

export default {
  get() {
    return ApiClient.get('/categories')
  },
  find(id) {
    return ApiClient.get('/categories/' + id)
  }
}
