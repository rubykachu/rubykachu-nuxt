import ApiClient from '~/apis/ApiClient'

export default {
  get() {
    return ApiClient.get('/categories')
  },
  find(id) {
    return ApiClient.get('/categories/' + id)
  },
  create(category) {
    return ApiClient.post('/categories', category)
  }
}
