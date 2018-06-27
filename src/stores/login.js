import { observable, action } from 'mobx';

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof window.grecaptcha !== 'undefined'
      && typeof window.recaptchaWidgetId !== 'undefined') {
    window.grecaptcha.reset(window.recaptchaWidgetId);
  }
}

const loginStore = observable({
  phoneNumber: '',
  verificationCode: '',
  signingIn: false,
  confirmationResult: null,
  view: 'login', // login | verify | profile
  setView(viewId) {
    if (viewId === 'login') resetReCaptcha();
    this.view = viewId
  },
  setPhoneNumber(val) {
    this.phoneNumber = val;
  },
  setVerificationCode(val) {
    this.verificationCode = val;
  },
  setStatus(flag) {
    this.signingIn = flag
  },
  setConfirmationResult(confirmationResult) {
    this.confirmationResult = confirmationResult
  },
}, {
  confirmationResult: observable.ref,
  setView: action.bound,
  setPhoneNumber: action.bound,
  setVerificationCode: action.bound,
  setStatus: action.bound,
  setConfirmationResult: action.bound,
})

export default loginStore