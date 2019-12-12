export default function({ store, route, redirect }) {
  console.log('Is Auth', store.getters['auth/isAuthenticated'])

  if (!store.getters['auth/isAuthenticated']) {
    redirect('/login')
  }

  if (store.getters['auth/isAuthenticated'] && route.name == 'login') {
    redirect('/')
  }
}
