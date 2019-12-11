import ApiClient from './ApiClient.js'
import fs from '~/plugins/firebase'

export default {
  get() {
    return ApiClient.get('/categories')
  },
  find(id) {
    return ApiClient.get('/categories/' + id)
  },
  create(category) {
    return ApiClient.post('/categories', category)
  },
  async fsGet() {
    const snapshot = await fs.collection('categories').get()
    return snapshot.docs.map(doc => doc.data())
  }
}
