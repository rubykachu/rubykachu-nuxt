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
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  }
}

export const actions = {
  async createArticle({ commit }, article) {
    try {
      // Random number 1 - 6
      let number = Math.floor(Math.random() * 6) + 1
      article.image = article.image || `/articles/bg_article_${number}.jpg`
      article.image_thumb = article.image_thumb || `/articles/bg_article_${number}.jpg`

      const result = await ApiArticle.create(article)
      commit('ADD_ARTICLE', result)
      return result.data
    } catch (e) {
      throw e
    }
  },
  async findArticle({ commit }, id) {
    try {
      const article = await ApiArticle.find(id)
      commit('SET_ARTICLE', article.data)
      return article.data
    } catch (e) {
      throw e
    }
  },
  async getArticles({ commit }) {
    try {
      const articles = await ApiArticle.get()
      commit('SET_ARTICLES', articles.data)
      return articles.data
    } catch (e) {
      throw e
    }
  }
}
