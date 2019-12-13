// Tutorial: https://www.youtube.com/watch?v=_-_bz5lH_fI
// Code: https://github.com/Eckhardt-D/nuxt-fire-auth/blob/master/nuxt.config.js

import JWTDecode from 'jwt-decode'
import cookieParser from 'cookieparser'

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    // Ignore if inside a generated app (via nuxt generate)
    // Docs: https://nuxtjs.org/guide/plugins/#client-side-only
    if (process.server && process.static) return

    if (!req.headers.cookie) return

    // Get cookie
    const parsed = cookieParser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token

    if (!accessTokenCookie) return

    // Decode cookie by JWT
    const decoded = JWTDecode(accessTokenCookie)

    if (decoded) {
      dispatch('auth/setUser', { uid: decoded.user_id, email: decoded.email })
    }
  }
}
