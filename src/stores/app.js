import { observable, extendObservable } from 'mobx'
import { RouterState, RouterStore } from 'mobx-state-router'
import { routes } from '../routes'
import userStore from './user'
import loginStore from './login'
import profileStore from './profile'
import EventListStore from './eventList'

const appStore = observable({
  user: userStore,
  login: loginStore,
  profile: profileStore,
  eventList: new EventListStore()
})

// TODO: figure out a better way to initialize and pass the appStore to the routerStore
const notFound = new RouterState('notFound')
extendObservable(appStore, {
  router: new RouterStore(appStore, routes, notFound)
})

export default appStore
