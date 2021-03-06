import { RouterState } from 'mobx-state-router'

const loadingState = new RouterState('loader')

const checkForUserSignedIn = (fromState, toState, routerStore) => {
  const { rootStore } = routerStore
  if (rootStore.user.auth) {
    return Promise.resolve()
  } else {
    rootStore.user.setSignInRedirect(toState)
    return Promise.reject(loadingState)
  }
}

// Routes are matched from top to bottom. Make sure they are sequenced
// in the order of priority. It is generally best to sort them by pattern,
// prioritizing specific patterns over generic patterns (patterns with
// one or more parameters). For example:
//     /items
//     /items/:id
export const routes = [
  {
    name: 'loader',
    pattern: '/'
  },
  {
    name: 'home',
    pattern: '/home',
    beforeEnter: checkForUserSignedIn
  },
  {
    name: 'profile',
    pattern: '/profile',
    // beforeEnter: checkForUserSignedIn
  },
  {
    name: 'login',
    pattern: '/login'
  },
  {
    name: 'notFound',
    pattern: '/not-found'
  }
]
