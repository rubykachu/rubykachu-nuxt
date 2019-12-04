import ApiClient from '~/apis/ApiClient'

export default {
  get() {
    return ApiClient.get('/articles')
  },
  find(id) {
    return ApiClient.get('/articles/' + id)
  },
  create(article) {
    return ApiClient.post('/articles', article)
  }
}
