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
   * @params args
   * @param order args: { column: 'desc | asc'}. Default order_by created_at DESC
   * @param limit args: Number
   * @param where args: ['column', 'operator', 'value']
   */
  async fsGet(args = { order: null, limit: null, where: null }) {
    let ref = fs.collection('articles')

    // Set Where
    if (args.where) {
      ref = ref.where(args.where[0], args.where[1], args.where[2])
    }

    // Set Order
    if (args.order) {
      let col = Object.keys(args.order)[0]
      let val = args.order[col]
      ref = ref.orderBy(col, val)
    } else {
      ref = ref.orderBy('created_at', 'desc')
    }

    // Set Limit
    if (args.limit) {
      ref = ref.limit(args.limit)
    }

    const snapshot = await ref.get()
    return snapshot.docs.map(doc => doc.data())
  }
}
