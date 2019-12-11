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
  },
  async fsCreate(category) {
    const result = await fs.collection('categories').add(category)
    category.id = result.id
    this.fsUpdate(category)
    return category
  },
  fsUpdate(category) {
    return fs
      .collection('categories')
      .doc(category.id)
      .set(category, { merge: true })
  }
}
