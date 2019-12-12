export default function({ store, route, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/login')
  }

  if (store.getters['auth/isAuthenticated'] && route.name == 'login') {
    redirect('/')
  }
}
