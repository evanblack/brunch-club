import { observable, action, extendObservable } from 'mobx';
import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';
import userStore from './user';
import loginStore from './login';

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof window.grecaptcha !== 'undefined'
      && typeof window.recaptchaWidgetId !== 'undefined') {
    window.grecaptcha.reset(window.recaptchaWidgetId);
  }
}

const appStore = observable({
  user: userStore,
  login: loginStore,
  view: 'login', // login | verify
  setView(viewId) {
    if (viewId === 'login') resetReCaptcha();
    this.view = viewId
  },
}, {
  setView: action.bound,
})

// TODO: figure out a better way to initialize and pass the appStore to the routerStore
const notFound = new RouterState('notFound');
extendObservable(appStore, {
  router: new RouterStore(appStore, routes, notFound)
})

export default appStore