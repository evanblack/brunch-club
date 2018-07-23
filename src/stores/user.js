import { observable, action, decorate } from 'mobx'
import { RouterState } from 'mobx-state-router'
import firebase from 'firebase'

// Default sign-in redirect
const defaultState = new RouterState('home')

class UserStore {
  rootStore
  docRef = null
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
  setUserFromSnapshot(ref, data) {
    this.docRef = ref
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
    this.name = profileData.name
    this.email = profileData.email
    return firebase
      .firestore()
      .collection('members')
      .doc(this.docRef.id)
      .set({ ...profileData, ...{ phone, authId } }, { merge: true })
      .then((ref) => {
        this.docRef = ref
      })
  }
  addMember(profileData) {
    const { phone, authId } = this
    this.name = profileData.name
    this.email = profileData.email
    return firebase
      .firestore()
      .collection('members')
      .add({ ...profileData, ...{ phone, authId } })
      .then((ref) => {
        this.docRef = ref
      })
  }
}

decorate(UserStore, {
  docRef: observable,
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
