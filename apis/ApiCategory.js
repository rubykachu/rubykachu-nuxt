import { fs } from '../services/firebase'

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
  async fsFindSlug(slug, args = {}) {
    try {
      let snapshot = await fs
        .collection('categories')
        .where('slug', '==', slug)
        .get()

      if (args.returnData) {
        return snapshot.docs[0].data()
      }
      return snapshot
    } catch (e) {
      throw 'slug_not_exist'
    }
  },
  fsUpdate(category) {
    return fs
      .collection('categories')
      .doc(category.id)
      .set(category, { merge: true })
  }
}
