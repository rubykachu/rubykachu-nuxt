import fs from '../plugins/firebase'

export default {
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
  fsFind(id) {
    return fs
      .collection('categories')
      .doc(id)
      .get()
  },
  fsUpdate(category) {
    return fs
      .collection('categories')
      .doc(category.id)
      .set(category, { merge: true })
  }
}
