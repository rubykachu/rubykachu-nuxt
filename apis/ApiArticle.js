import ApiClient from './ApiClient.js'
import fs from '~/plugins/firebase'

export default {
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
  /**
   *
   * @param {order} args: { column: 'desc | asc'}. Default order_by created_at DESC
   * @params {limit} args: Number
   */
  async fsGet(args = { order: null, limit: null }) {
    let ref = fs.collection('articles')

    if (args.order) {
      let col = Object.keys(args.order)[0]
      let val = args.order[col]
      ref = ref.orderBy(col, val)
    } else {
      ref = ref.orderBy('created_at', 'desc')
    }

    if (args.limit) {
      ref = ref.limit(args.limit)
    }
    const snapshot = await ref.get()
    return snapshot.docs.map(doc => doc.data())
  }
}
