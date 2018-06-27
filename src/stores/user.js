import { observable, action } from 'mobx'
import { RouterState } from 'mobx-state-router'

// Default sign-in redirect
const defaultState = new RouterState('home')

const userStore = observable(
  {
    uid: '',
    name: '',
    email: '',
    phone: '',
    auth: null,
    signInRedirect: defaultState,
    setAuth(user) {
      this.uid = user.uid
      this.name = user.displayName
      this.email = user.email
      this.phone = user.phoneNumber
      this.auth = user
    },
    setSignInRedirect(routerState) {
      this.signInRedirect = routerState
    },
    resetSignInRedirect() {
      this.setSignInRedirect(defaultState)
    }
  },
  {
    auth: observable.ref,
    setAuth: action.bound,
    setSignInRedirect: action.bound
  }
)

export default userStore
