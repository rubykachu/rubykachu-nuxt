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
      // Random number 1 - 6
      let number = Math.floor(Math.random() * 6) + 1
      article.image = article.image || `/articles/bg_article_${number}.jpg`
      article.image_thumb = article.image_thumb || `/articles/bg_article_${number}.jpg`
      article.created_at = `${article.created_at} ${new Date().toLocaleTimeString()}`

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
      const articles = await ApiArticle.fsGet()
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
      const articles = await ApiArticle.where(`category.id=${category_id}`)
      commit('SET_ARTICLES_BY_CATEGORY', articles.data)
      return articles.data
    } catch (e) {
      throw e
    }
  }
}
