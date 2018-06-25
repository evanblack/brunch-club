import { observable, action } from 'mobx';

const loginStore = observable({
  phoneNumber: '',
  verificationCode: '',
  signingIn: false,
  confirmationResult: null,
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
  setPhoneNumber: action.bound,
  setVerificationCode: action.bound,
  setStatus: action.bound,
  setConfirmationResult: action.bound,
})

export default loginStore