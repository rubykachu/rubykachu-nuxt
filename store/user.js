import { auth } from '../plugins/firebase.js'

export const state = () => ({
  currentUser: null
})

export const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
  }
}

export const actions = {
  async login({ commit }, credential) {
    try {
      const firebaseAuth = await auth.signInWithEmailAndPassword(credential.email, credential.password)
      auth.signInAndRetrieveDataWithCredential(firebaseAuth).then(a => {
        console.log('A', a)
      })
      auth.currentUser.getIdToken(false).then(idToken => {
        console.log('TOKEN', idToken)
      })
      console.log(auth.currentUser)

      commit('SET_USER', firebaseAuth.user.refreshToken)
      return firebaseAuth.user.refreshToken
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.currentUser
  }
}
