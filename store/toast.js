export const state = () => ({
  hasError: false,
  msgError: ''
})

export const mutations = {
  SET_ERROR(state, isError) {
    state.hasError = isError
  },
  SET_MSG_ERROR(state, msg) {
    state.msgError = msg
  }
}

export const actions = {
  show({ commit }, msg = '') {
    commit('SET_ERROR', true)
    msg = msg || 'Opps! Đã có lỗi xảy ra trong quá trình xử lý'
    commit('SET_MSG_ERROR', msg)
  },
  hide({ commit }) {
    commit('SET_ERROR', false)
  }
}
