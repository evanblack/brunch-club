import { observable, action, decorate } from 'mobx'

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof window.grecaptcha !== 'undefined' && typeof window.recaptchaWidgetId !== 'undefined') {
    window.grecaptcha.reset(window.recaptchaWidgetId)
  }
}

class LoginStore {
  rootStore
  phoneNumber = ''
  verificationCode = ''
  signingIn = false
  confirmationResult = null
  view = 'login' // login | verify | profile
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  setView(viewId) {
    if (viewId === 'login') resetReCaptcha()
    this.view = viewId
  }
  setPhoneNumber(val) {
    this.phoneNumber = val
  }
  setVerificationCode(val) {
    this.verificationCode = val
  }
  setStatus(flag) {
    this.signingIn = flag
  }
  setConfirmationResult(confirmationResult) {
    this.confirmationResult = confirmationResult
  }
}

decorate(LoginStore, {
  phoneNumber: observable,
  verificationCode: observable,
  signingIn: observable,
  confirmationResult: observable.ref,
  view: observable,
  setView: action.bound,
  setPhoneNumber: action.bound,
  setVerificationCode: action.bound,
  setStatus: action.bound,
  setConfirmationResult: action.bound
})

export default LoginStore
