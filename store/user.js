import ApiAuth from '@/apis/ApiAuth.js'

export const state = () => ({
  token: null
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.toekn = token
  }
}

export const actions = {
  async login({ commit }, credential) {
    try {
      console.log(credential)
      const auth = await ApiAuth.fsAuthenticate(credential)
      console.log('AUTH', auth)

      debugger
    } catch (e) {
      throw e
    }
  }
}
