import { observable, action, decorate } from 'mobx'

class ProfileStore {
  rootStore
  name = ''
  email = ''
  processing = false
  method = 'set'
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  setName(val) {
    this.name = val
  }
  setEmail(val) {
    this.email = val
  }
  setStatus(flag) {
    this.processing = flag
  }
  setAction(method) {
    this.method = method
  }
}

decorate(ProfileStore, {
  name: observable,
  email: observable,
  processing: observable,
  method: observable,
  setName: action.bound,
  setEmail: action.bound,
  setStatus: action.bound,
  setAction: action.bound
})

export default ProfileStore
