import ApiArticle from '@/apis/ApiArticle.js'

export const state = () => ({
  articles: [],
  article: {},
  totalArticles: 0
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
  }
}

export const actions = {
  async createArticle({ commit }, article) {
    try {
      // Set default Image with random from 1 to 6
      let number = Math.floor(Math.random() * 6) + 1
      article.image = article.image || `/articles/bg_article_${number}.jpg`
      article.image_thumb = article.image_thumb || `/articles/bg_article_${number}.jpg`
      article.created_at = `${article.created_at} ${new Date().toLocaleTimeString()}`

      // Set category_id
      article.category_id = article.category.id

      // Save
      const result = await ApiArticle.fsCreate(article)
      commit('ADD_ARTICLE', result)
      return article
    } catch (e) {
      throw e
    }
  },
  async findArticle({ commit }, id) {
    try {
      const article = await ApiArticle.fsFind(id)
      const data = article.data()
      commit('SET_ARTICLE', data)
      return data
    } catch (e) {
      throw e
    }
  },
  async getArticles({ commit }) {
    try {
      const articles = await ApiArticle.fsGet({ limit: 2, returnData: true })

      commit('SET_ARTICLES', articles)
      return articles
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
  async getArticlesByCategory({}, category_id) {
    try {
      const articles = await ApiArticle.fsGet({ where: ['category_id', '==', category_id], returnData: true })
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
