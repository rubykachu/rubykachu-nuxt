import ApiArticle from '@/apis/ApiArticle.js'

export const state = () => ({
  articles: [],
  recentArticles: [],
  articlesByCategory: [],
  article: {},
  totalArticles: 0
})

export const mutations = {
  SET_RECENT_ARTICLES(state, recentArticles) {
    state.recentArticles = recentArticles
  },
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
  SET_ARTICLES_BY_CATEGORY(state, articles) {
    state.articlesByCategory = articles
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
      commit('SET_ARTICLE', article.data())
      return article.data()
    } catch (e) {
      throw e
    }
  },
  async getArticles({ commit }) {
    try {
      const articles = await ApiArticle.fsGet({ limit: 2 })

      commit('SET_ARTICLES', articles)
      return articles
    } catch (e) {
      throw e
    }
  },
  async nextArticles({ commit }, article) {
    try {
      const articles = await ApiArticle.fsGet({ limit: 2, startAfter: article })
      commit('SET_ARTICLES', articles)
      return articles
    } catch (e) {
      throw e
    }
  },
  async getRecentArticles({ commit }) {
    try {
      const articles = await ApiArticle.fsGet({ order: { created_at: 'desc' }, limit: 3 })
      commit('SET_RECENT_ARTICLES', articles)
      return articles
    } catch (e) {
      throw e
    }
  },
  async getArticlesByCategory({ commit }, category_id) {
    try {
      const articles = await ApiArticle.fsGet({ where: ['category_id', '==', category_id] })
      commit('SET_ARTICLES_BY_CATEGORY', articles)
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
