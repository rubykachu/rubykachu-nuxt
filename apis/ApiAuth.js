import fs from '../plugins/firebase'

export default {
  fsAuthenticate(credential) {
    console.log(fs.collection('categories'))

    return fs.auth().signInWithEmailAndPassword(credential.email, credential.password)
  }
}
