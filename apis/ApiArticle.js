import ApiClient from './ApiClient.js'

export default {
  get(page = 1, perpage) {
    return ApiClient.get(`/articles?&_page=${page}&_limit=${perpage}`)
  },
  find(id) {
    return ApiClient.get('/articles/' + id)
  },
  create(article) {
    return ApiClient.post('/articles', article)
  }
}
