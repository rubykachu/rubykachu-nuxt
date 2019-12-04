import ApiArticle from '@/apis/ApiArticle.js'

export const state = () => ({
  articles: [],
  article: {}
})

export const mutations = {
  ADD_ARTICLE(state, article) {
    state.articles.push(article)
  },
  SET_ARTICLE(state, article) {
    state.article = article
  }
}

export const actions = {
  async createArticle({ commit }, article) {
    try {
      const result = await ApiArticle.create(article)
      commit('ADD_ARTICLE', result)
      return result.data
    } catch (e) {
      throw e
    }
  },
  async getArticle({ commit }, id) {
    try {
      const article = await ApiArticle.find(id)
      commit('SET_ARTICLE', article.data)
      return article.data
    } catch (e) {
      throw e
    }
  }
}
