import { observable, action } from 'mobx';
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

export default appStore