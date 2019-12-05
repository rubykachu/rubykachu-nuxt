import ApiCategory from '@/apis/ApiCategory.js'

export const state = () => ({
  categories: [],
  category: {}
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY(state, category) {
    state.category = category
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
  },
  async findCategory({ commit, getters }, id) {
    let category = getters.getCategoryById(id)
    try {
      if (category) {
        commit('SET_CATEGORY', category)
        return category
      }

      const result = await ApiCategory.find(id)
      commit('SET_CATEGORY', result.data)
      return result.data
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  getCategoryById: state => id => {
    return state.categories.find(cate => cate.id === id)
  }
}
