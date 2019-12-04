import { setClient } from '~/apis/ApiClient'

export default function({ $axios, redirect }) {
  setClient($axios)

  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  // })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404 || code === 400) {
      redirect('/404')
    }
  })
}
