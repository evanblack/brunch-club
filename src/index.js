import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { firebaseConfig } from './CONFIG'
import { HistoryAdapter } from 'mobx-state-router'
import { history } from './history'
import rootStore from './stores/root'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

window.appStore = rootStore

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.router, history)
historyAdapter.observeRouterStateChanges()

// Configure Firebase.
firebase.initializeApp(firebaseConfig)
/*
From Firebase:
[2018-06-27T18:02:32.446Z]  @firebase/firestore: Firestore (5.0.4):
The behavior for Date objects stored in Firestore is going to change
AND YOUR APP MAY BREAK.
To hide this warning and ensure your app does not break, you need to add the
following code to your app before calling any other Cloud Firestore methods:

  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

With this change, timestamps stored in Cloud Firestore will be read back as
Firebase Timestamp objects instead of as system Date objects. So you will also
need to update code expecting a Date to instead expect a Timestamp. For example:

  // Old:
  const date = snapshot.get('created_at');
  // New:
  const timestamp = snapshot.get('created_at');
  const date = timestamp.toDate();

Please audit all existing usages of Date when you enable the new behavior. In a
future release, the behavior will change to the new behavior, so if you do not
follow these steps, YOUR APP MAY BREAK.
*/
firebase.firestore().settings({ timestampsInSnapshots: true })
firebase.auth().onAuthStateChanged((user) => {
  const router = rootStore.router
  const userStore = rootStore.user
  const profileStore = rootStore.profile
  if (user) {
    // Set the user data that we may have stored in the AUTH table of Firebase
    userStore.setAuth(user)
    // Retrieve the user's member data based on the phone number and display Profile page or not
    userStore.getMemberByPhone(user.phoneNumber).then((querySnapshot) => {
      // If empty, prepare to write an entry to the member collection.
      // Do we write twice? Before and after Profile data entry?
      // Do we write once after Profile data entry?
      if (querySnapshot.empty) {
        profileStore.setAction('add')
        router.goTo('profile')
      } else {
        // Otherwise, grab the member data and prefill the fields with it
        if (querySnapshot.size !== 1)
          console.error(`Multiple members returned for this phone number!`)
        const memberId = querySnapshot.docs[0].id
        const memberData = querySnapshot.docs[0].data()
        userStore.setUserFromSnapshot(memberId, memberData)
        profileStore.setAction('set')
        profileStore.setName(memberData.name)
        profileStore.setEmail(memberData.email)
        // If profile has been filled, go home
        if (memberData.authId) router.goTo('home')
        else router.goTo('profile')
      }
    })
  } else {
    // Make sure user is signed in
    rootStore.router.goTo('login')
  }
})

ReactDOM.render(<App store={rootStore} />, document.getElementById('root'))
registerServiceWorker()
