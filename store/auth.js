import { auth } from '../plugins/firebase.js'

export const state = () => ({
  token: ''
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async login({ commit }, credential) {
    try {
      await auth.signInWithEmailAndPassword(credential.email, credential.password)
      const idToken = await auth.currentUser.getIdToken(true /* force refresh Token */)

      sessionStorage.setItem('_rubykachuToken', idToken)
      console.log('TOKEN', sessionStorage.getItem('_rubykachuToken'))

      commit('SET_TOKEN', idToken)
      return idToken
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  isAuthenticated(state) {
    if (process.client) {
      return !!state.token || !!sessionStorage.getItem('_rubykachuToken')
    }
  }
}
