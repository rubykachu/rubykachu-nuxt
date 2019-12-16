import { fs } from '../services/firebase'

export default {
  fsCollection() {
    return fs.collection('articles').get()
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
  async fsFindSlug(slug, args = {}) {
    try {
      let snapshot = await fs
        .collection('articles')
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
  /**
   * @params args optional
   * @param order args: { column: 'desc | asc'}. Default order_by created_at DESC
   * @param limit args: Number
   * @param where args: ['column', 'operator', 'value']
   * @param startAfter args: DocumentRef
   */
  async fsGet(args = {}) {
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

    // Set StartAfter
    if (args.startAfter) {
      ref = ref.startAfter(args.startAfter)
    }

    // Set Limit
    if (args.limit) {
      ref = ref.limit(args.limit)
    }

    const snapshot = await ref.get()

    if (args.returnData) {
      return snapshot.docs.map(doc => doc.data())
    } else {
      return snapshot
    }
  }
}
