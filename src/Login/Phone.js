import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';
import { MDCRipple } from '@material/ripple';
import firebase from 'firebase';

/**
 * Returns true if the phone number is valid.
 */
function isPhoneNumberValid(phoneNumber) {
  var pattern = /^\+[0-9\s\-\\]+$/;
  return phoneNumber.search(pattern) !== -1;
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.phoneField = null
    this.phoneFieldIcon = null
    this.signInBtn = null
    this.bindMDC = this.bindMDC.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
  }
  bindMDC() {
    new MDCTextField(this.phoneField);
    new MDCTextFieldIcon(this.phoneFieldIcon);
    new MDCRipple(this.signInBtn);
  }
  handlePhone(e) {
    const { loginStore } = this.props
    loginStore.setPhoneNumber(e.target.value)
  }
  onSignInSubmit() {
    const { loginStore, setView } = this.props
    const { phoneNumber, setStatus, setConfirmationResult } = loginStore
    if (isPhoneNumberValid(phoneNumber)) {
      setStatus(true)
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult);
          setConfirmationResult(confirmationResult)
          setStatus(false);
          setView('verify');
        }).catch((error) => {
          // Error; SMS not sent
          console.error('Error during signInWithPhoneNumber', error);
          window.alert('Error during signInWithPhoneNumber:\n\n'
              + error.code + '\n\n' + error.message);
          setStatus(false);
        });
    }
  }
  componentDidMount() {
    // Init MDC
    this.bindMDC();
    // [START appVerifier]
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
      }
    });
    // [END appVerifier]
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  }
  render() {
    const { loginStore, animationClass } = this.props
    const { phoneNumber, signingIn } = loginStore
    return (
      <form className={`Login-form ${animationClass}`} action="#" autoComplete="off">
        <p className="instruct">Sign in with your phone number below.</p>
        <div ref={(el) => this.phoneField = el} className="mdc-text-field mdc-text-field--box mdc-text-field--with-leading-icon phone">
          <i ref={(el) => this.phoneFieldIcon = el} className="material-icons mdc-text-field__icon" tabIndex="0" role="button">phone</i>
          <input type="tel" className="mdc-text-field__input" id="phone-input" name="phone" value={phoneNumber} onChange={this.handlePhone}/>
          <label className="mdc-floating-label" htmlFor="phone-input">Phone Number</label>
          <div className="mdc-line-ripple"></div>
        </div>
        <div className="button-container">
          <button disabled={!isPhoneNumberValid(phoneNumber) || !!signingIn} ref={(el) => this.signInBtn = el} className="mdc-button mdc-button--raised next" id="sign-in-button">
            Next
          </button>
        </div>
      </form>
    );
  }
}

export default observer(Login);