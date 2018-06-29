import { observable, action, decorate } from 'mobx'
import { RouterState } from 'mobx-state-router'
import firebase from 'firebase'

// Default sign-in redirect
const defaultState = new RouterState('home')

class UserStore {
  rootStore
  docId = ''
  name = ''
  email = ''
  phone = ''
  authId = ''
  auth = null
  signInRedirect = defaultState
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  setAuth(user) {
    this.phone = user.phoneNumber
    this.authId = user.uid
    this.auth = user
    // These will be empty for Phone Auth
    // this.name = user.displayName
    // this.email = user.email
  }
  setUserFromSnapshot(id, data) {
    this.docId = id
    this.name = data.name
    this.email = data.email
  }
  setSignInRedirect(routerState) {
    this.signInRedirect = routerState
  }
  resetSignInRedirect() {
    this.setSignInRedirect(defaultState)
  }
  getMemberByPhone(phoneNumber) {
    // return firebase.firestore().collection('members').doc(id).get();
    return firebase
      .firestore()
      .collection('members')
      .where('phone', '==', phoneNumber)
      .get()
    // .then((querySnapshot) => {
    //   return Promise.resolve(querySnapshot)
    // })
  }
  setMember(profileData) {
    const { phone, authId } = this
    return firebase
      .firestore()
      .collection('members')
      .doc(this.docId)
      .set({ ...profileData, ...{ phone, authId } }, { merge: true })
  }
  addMember(profileData) {
    const { phone, authId } = this
    return firebase
      .firestore()
      .collection('members')
      .add({ ...profileData, ...{ phone, authId } })
  }
}

decorate(UserStore, {
  docId: observable,
  name: observable,
  email: observable,
  phone: observable,
  authId: observable,
  auth: observable.ref,
  signInRedirect: observable.ref,
  setAuth: action.bound,
  setSignInRedirect: action.bound,
  setMember: action.bound,
  addMember: action.bound
})

export default UserStore
