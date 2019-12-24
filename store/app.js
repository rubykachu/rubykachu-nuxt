export const state = () => ({
  keyCompAppHeader: 0
})

export const mutations = {
  SET_KEY_COMP_APP_HEADER(state, key) {
    state.keyCompAppHeader = key
  }
}

export const actions = {
  setKeyCompAppHeader({ commit, state }) {
    commit('SET_KEY_COMP_APP_HEADER', state.keyCompAppHeader + 1)
  }
}
