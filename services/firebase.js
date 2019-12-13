import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/database'

console.log('Mode:', process.env.NODE_ENV)

let firebaseConfig
if (process.env.NODE_ENV == 'production') {
  firebaseConfig = {
    apiKey: 'AIzaSyAaXSuXWUJcJKVI4c9mJpFQehy2WFFivzw',
    authDomain: 'rubykachu-2705.firebaseapp.com',
    databaseURL: 'https://rubykachu-2705.firebaseio.com',
    projectId: 'rubykachu-2705',
    storageBucket: 'rubykachu-2705.appspot.com',
    messagingSenderId: '698576301860',
    appId: '1:698576301860:web:8bfceff22612a2feab8db1',
    measurementId: 'G-L4T6F6NRZM'
  }
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyAemo8pBsop9vZIybicnw49wo3SyxiJoJE',
    authDomain: 'rubykachu-dev.firebaseapp.com',
    databaseURL: 'https://rubykachu-dev.firebaseio.com',
    projectId: 'rubykachu-dev',
    storageBucket: 'rubykachu-dev.appspot.com',
    messagingSenderId: '763080774242',
    appId: '1:763080774242:web:2fd9c74ab82c52caa0b73b'
  }
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const DB = firebase.database()
export const auth = firebase.auth()
export const fs = firebase.firestore()
export default firebase
