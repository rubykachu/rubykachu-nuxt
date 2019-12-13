import { auth } from '../plugins/firebase.js'
import { longStackSupport } from 'q'

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
      commit('SET_TOKEN', idToken)

      return idToken
    } catch (e) {
      throw e
    }
  },
  async logout({ commit }) {
    try {
      await auth.signOut()
      sessionStorage.clear()
      commit('SET_TOKEN', '')
      return true
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  isAuthenticated(state) {
    if (process.browser) {
      return !!state.token || !!sessionStorage.getItem('_rubykachuToken')
    }
  }
}
