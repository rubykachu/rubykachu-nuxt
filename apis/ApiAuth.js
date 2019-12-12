import { auth } from '../plugins/firebase'

export default {
  fsAuthenticate(credential) {
    return auth.signInWithEmailAndPassword(credential.email, credential.password)
  }
}
