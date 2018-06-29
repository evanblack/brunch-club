import { extendObservable } from 'mobx'
import { RouterState, RouterStore } from 'mobx-state-router'
import { routes } from '../routes'
import CommonStore from './common'
import UserStore from './user'
import LoginStore from './login'
import ProfileStore from './profile'
import EventListStore from './eventList'

class RootStore {
  common = new CommonStore(this)
  user = new UserStore(this)
  login = new LoginStore(this)
  profile = new ProfileStore(this)
  eventList = new EventListStore()
}

// Create the rootStore
const rootStore = new RootStore()

// console.log(rootStore)
// console.log(routes)

// TODO: figure out a better way to initialize and pass the appStore to the routerStore
const notFound = new RouterState('notFound')
extendObservable(rootStore, {
  router: new RouterStore(rootStore, routes, notFound)
})

export default rootStore
