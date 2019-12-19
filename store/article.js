import ApiArticle from '~/apis/ApiArticle'
import ApiCategory from '~/apis/ApiCategory'

const LIMIT = parseInt(process.env.PERPAGE)

export const state = () => ({
  articles: [],
  article: {},
  totalArticles: 0,
  idLastArticle: ''
})

export const mutations = {
  ADD_ARTICLE(state, article) {
    state.articles.push(article)
  },
  SET_ARTICLE(state, article) {
    state.article = article
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_TOTAL_PAGE(state, total) {
    state.totalArticles = total
  },
  SET_REF_ID_LAST_ARTICLE(state, id) {
    state.idLastArticle = id
  }
}

function initData(article) {
  // Phai clone Article boi vi component datepicker khong nhan doi so dau vao la Number
  // Neu khong clone ma Parse sang Number thi Object trong Javascript se reference gay ra bug
  const cloneArticle = JSON.parse(JSON.stringify(article))
  let number = Math.floor(Math.random() * 7) + 1
  cloneArticle.image = cloneArticle.image || `/articles/bg_article_${number}.jpg`
  cloneArticle.image_thumb = cloneArticle.image_thumb || `/articles/bg_article_${number}.jpg`
  cloneArticle.created_at = Number(new Date(cloneArticle.created_at))
  cloneArticle.reading_time = Number(cloneArticle.reading_time)

  // Set category_id
  cloneArticle.category_id = cloneArticle.category.id
  return cloneArticle
}

export const actions = {
  async updateArticle({ commit }, article) {
    try {
      let newArticle = initData(article)
      const result = await ApiArticle.fsUpdate(newArticle)
      commit('ADD_ARTICLE', result)
      return newArticle
    } catch (e) {
      throw e
    }
  },
  async createArticle({ commit }, article) {
    try {
      let newArticle = initData(article)
      const result = await ApiArticle.fsCreate(newArticle)
      commit('ADD_ARTICLE', result)
      return newArticle
    } catch (e) {
      throw e
    }
  },
  async findSlug({ commit }, slug) {
    // Check slug is unique
    try {
      let article = await ApiArticle.fsFindSlug(slug, { returnData: true })
      return article
    } catch (e) {
      throw e
    }
  },
  async findArticle({ commit }, id) {
    try {
      const article = await ApiArticle.fsFindSlug(id, { returnData: true })
      commit('SET_ARTICLE', article)
      return article
    } catch (e) {
      throw e
    }
  },
  async getArticles({ commit }) {
    try {
      const snapshots = await ApiArticle.fsGet({ limit: LIMIT })
      commit('SET_REF_ID_LAST_ARTICLE', snapshots.docs[snapshots.docs.length - 1].id)

      const articles = snapshots.docs.map(doc => doc.data())
      commit('SET_ARTICLES', articles)
      return articles
    } catch (e) {
      throw e
    }
  },
  async loadMore({ commit, state }) {
    try {
      const refArticle = await ApiArticle.fsFind(state.idLastArticle)
      const snapshots = await ApiArticle.fsGet({ limit: LIMIT, startAfter: refArticle })

      commit('SET_REF_ID_LAST_ARTICLE', snapshots.docs[snapshots.docs.length - 1].id)

      let articles = snapshots.docs.map(doc => doc.data())
      let newArticles = state.articles.concat(articles)

      commit('SET_ARTICLES', newArticles)
      return newArticles
    } catch (e) {
      throw e
    }
  },
  async getRecentArticles() {
    try {
      const articles = await ApiArticle.fsGet({ order: { created_at: 'desc' }, limit: 3, returnData: true })
      return articles
    } catch (e) {
      throw e
    }
  },
  async getArticlesByCategory({}, slug) {
    try {
      const category = await ApiCategory.fsFindSlug(slug, { returnData: true })
      const articles = await ApiArticle.fsGet({ where: ['category_id', '==', category.id], returnData: true })
      return articles
    } catch (e) {
      throw e
    }
  },
  async getTotalArticle({ commit }) {
    try {
      const articles = await ApiArticle.fsCollection()
      const length = articles.docs.length
      commit('SET_TOTAL_PAGE', length)
      return length
    } catch (e) {
      throw e
    }
  }
}
