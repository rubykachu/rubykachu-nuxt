import ApiClient from './ApiClient.js'
import fs from '~/plugins/firebase'

export default {
  get(page = 1, perpage) {
    return ApiClient.get(`/articles?&_page=${page}&_limit=${perpage}`)
  },
  find(id) {
    return ApiClient.get('/articles/' + id)
  },
  create(article) {
    return ApiClient.post('/articles', article)
  },
  where(query) {
    return ApiClient.get(`/articles?${query}`)
  },
  async fsCreate(article) {
    const result = await fs.collection('articles').add(article)
    article.id = result.id
    this.fsUpdate(article)
    return article
  },
  fsUpdate(article) {
    return fs
      .collection('articles')
      .doc(article.id)
      .set(article, { merge: true })
  },
  fsFind(id) {
    return fs
      .collection('articles')
      .doc(id)
      .get()
  },
  async fsGet() {
    const snapshot = await fs.collection('articles').get()
    return snapshot.docs.map(doc => doc.data())
  }
}
