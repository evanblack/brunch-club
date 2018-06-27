import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { MDCTextField } from '@material/textfield'
import { MDCRipple } from '@material/ripple'
import firebase from 'firebase'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.verifyField = null
    this.verifyBtn = null
    this.cancelBtn = null
    this.bindMDC = this.bindMDC.bind(this)
    this.setVerificationCode = this.setVerificationCode.bind(this)
    this.handleVerify = this.handleVerify.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  bindMDC() {
    new MDCTextField(this.verifyField)
    new MDCRipple(this.verifyBtn)
    new MDCRipple(this.cancelBtn)
  }
  setVerificationCode(e) {
    const { loginStore } = this.props
    loginStore.setVerificationCode(e.target.value)
  }
  handleVerify(e) {
    e.preventDefault()
    const { loginStore } = this.props
    const { verificationCode, confirmationResult, setConfirmationResult, setStatus } = loginStore
    if (!!verificationCode) {
      setStatus(true)
      confirmationResult
        .confirm(verificationCode)
        .then(function(result) {
          // User signed in successfully.
          // onAuthStateChanged will handle the redirect.
          setStatus(false)
          setConfirmationResult(null)
          // router.goTo('home')
        })
        .catch(function(error) {
          // User couldn't sign in (bad verification code?)
          console.error('Error while checking the verification code', error)
          window.alert(
            'Error while checking the verification code:\n\n' + error.code + '\n\n' + error.message
          )
          setStatus(false)
        })
    }
  }
  handleCancel(e) {
    const { loginStore } = this.props
    e.preventDefault()
    firebase.auth().signOut()
    loginStore.setConfirmationResult(null)
    loginStore.setPhoneNumber('')
    loginStore.setView('login')
  }
  componentDidMount() {
    // Init MDC
    this.bindMDC()
  }
  render() {
    const { loginStore, animationClass } = this.props
    const { verificationCode, signingIn } = loginStore
    return (
      <form className={`Verify-form ${animationClass}`} action="#" autoComplete="off">
        <div
          ref={(el) => (this.verifyField = el)}
          className="mdc-text-field mdc-text-field--box verification-code">
          <input
            type="number"
            className="mdc-text-field__input"
            id="verification-code"
            name="verification-code"
            value={verificationCode}
            onChange={this.setVerificationCode}
          />
          <label className="mdc-floating-label" htmlFor="verification-code">
            Enter the verification code...
          </label>
          <div className="mdc-line-ripple" />
        </div>
        <div className="button-container">
          <button
            onClick={this.handleCancel}
            ref={(el) => (this.cancelBtn = el)}
            className="mdc-button cancel">
            Cancel
          </button>
          <button
            onClick={this.handleVerify}
            ref={(el) => (this.verifyBtn = el)}
            disabled={!verificationCode || !!signingIn}
            className="mdc-button mdc-button--raised next">
            Verify Code
          </button>
        </div>
      </form>
    )
  }
}

export default observer(Verify)
