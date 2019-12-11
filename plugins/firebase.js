import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyCxabH0jZRhx-DxKOZqTIHfWabRjW_dVBQ',
    authDomain: 'rubykachu-aad12.firebaseapp.com',
    databaseURL: 'https://rubykachu-aad12.firebaseio.com',
    projectId: 'rubykachu-aad12',
    storageBucket: 'rubykachu-aad12.appspot.com',
    messagingSenderId: '1089110868773',
    appId: '1:1089110868773:web:3ee58d02f32819c2c7d0cc'
  }

  firebase.initializeApp(firebaseConfig)
  firebase.firestore()
  // firebase.firestore().settings({ timestampsInSnapshots: true })
}
const fs = firebase.firestore()

export default fs
