import { auth } from '../services/firebase.js'
import Cookie from 'js-cookie'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, credential) {
    state.user = credential
  }
}

export const actions = {
  setUser({ commit }, credential) {
    commit('SET_USER', credential)
  },
  async login({ commit }, credential) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(credential.email, credential.password)

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      console.log(email, uid, token)

      // Set JWT to the cookie
      Cookie.set('access_token', token)

      // Set the user locally
      commit('SET_USER', { email, uid })
    } catch (e) {
      throw e
    }
  },
  async logout({ commit }) {
    try {
      await auth.signOut()
      await Cookie.remove('access_token')
      commit('SET_USER', null)
    } catch (e) {
      throw e
    }
  }
}
