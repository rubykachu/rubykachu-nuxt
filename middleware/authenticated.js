import { auth } from '../services/firebase.js'

export default async function({ store, route, redirect }) {
  let authenticate = await new Promise((resolve, _reject) => {
    auth.onAuthStateChanged(user => resolve(user))
  })

  if (authenticate) {
    store.dispatch('auth/setUser', { email: authenticate.email, uid: authenticate.uid })
  }

  const user = store.state.auth.user

  if (!user && route.name == 'article-new') {
    redirect('/login')
  }

  if (user && route.name == 'login') {
    redirect('/')
  }
}
