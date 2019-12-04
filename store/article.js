import ApiArticle from '@/apis/ApiArticle.js'

export const state = () => ({
  articles: []
})

export const mutations = {
  ADD_ARTICLE(state, article) {
    state.articles.push(article)
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
  }
}
