export default function({ store, redirect }) {
  console.log(store.getters['user/isAuthenticated'])
  console.log(store.state.user.currentUser)

  if (!store.getters['user/isAuthenticated']) {
    redirect('/login')
  }
}
