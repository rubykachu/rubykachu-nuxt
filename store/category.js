import ApiCategory from '@/apis/ApiCategory.js'

export const state = () => ({
  categories: []
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  }
}

export const actions = {
  async getCategories({ commit }) {
    try {
      const result = await ApiCategory.get()
      commit('SET_CATEGORIES', result.data)
      return result.data
    } catch (e) {
      throw e
    }
  }
}
