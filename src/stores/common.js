import { observable, action, decorate } from 'mobx'

class CommonStore {
  rootStore
  appName = 'BrunchClub'
  errorState = '' // For now, this is just a simple string
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  throwError(message) {
    this.errorState = message
  }
  resetError() {
    this.errorState = ''
  }
}

decorate(CommonStore, {
  errorState: observable,
  throwError: action.bound,
  resetError: action.bound
})

export default CommonStore
