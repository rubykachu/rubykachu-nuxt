export default function({ store, route, redirect }) {
  const user = store.state.auth.user

  if (!user && route.name == 'article-new') {
    redirect('/login')
  }

  if (user && route.name == 'login') {
    redirect('/')
  }
}
