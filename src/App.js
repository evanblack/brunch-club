import React, { Component } from 'react';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldIcon} from '@material/textfield/icon';
import {MDCRipple} from '@material/ripple';
import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import logo from './logo.svg';
import './App.css';

/**
 * Returns true if the phone number is valid.
 */
function isPhoneNumberValid(phoneNumber) {
  var pattern = /^\+[0-9\s\-\(\)]+$/;
  return phoneNumber.search(pattern) !== -1;
}

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof window.grecaptcha !== 'undefined'
      && typeof window.recaptchaWidgetId !== 'undefined') {
    window.grecaptcha.reset(window.recaptchaWidgetId);
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      view: 'login' // login | verify
    }
    this.phoneField = null
    this.phoneFieldIcon = null
    this.signInBtn = null
    this.verifyField = null
    this.verifyBtn = null
    this.cancelBtn = null
    this.bindMDC = this.bindMDC.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
  }
  bindMDC() {
    new MDCTextField(this.phoneField);
    new MDCTextFieldIcon(this.phoneFieldIcon);
    new MDCRipple(this.signInBtn);
    new MDCTextField(this.verifyField)
    new MDCRipple(this.verifyBtn);
    new MDCRipple(this.cancelBtn);
  }
  handlePhone(e) {
    this.setState({ phoneNumber: e.target.value })
  }
  onSignInSubmit() {
    var phoneNumber = this.state.phoneNumber;
    if (isPhoneNumberValid(phoneNumber)) {
      window.signingIn = true;
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          window.signingIn = false;
          console.log(confirmationResult)
          // updateSignInButtonUI();
          // updateVerificationCodeFormUI();
          // updateVerifyCodeButtonUI();
          // updateSignInFormUI();
        }).catch((error) => {
          // Error; SMS not sent
          console.error('Error during signInWithPhoneNumber', error);
          window.alert('Error during signInWithPhoneNumber:\n\n'
              + error.code + '\n\n' + error.message);
          window.signingIn = false;
          // updateSignInFormUI();
          // updateSignInButtonUI();
        });
    }
  }
  componentDidMount() {
    // Init MDC
    this.bindMDC();
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // var uid = user.uid;
        // var email = user.email;
        // var photoURL = user.photoURL;
        // var phoneNumber = user.phoneNumber;
        // var isAnonymous = user.isAnonymous;
        // var displayName = user.displayName;
        // var providerData = user.providerData;
        // var emailVerified = user.emailVerified;
        console.log(user)
      }
    });
    
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
    return (
      <div className="App">
        <section className="header">
          <h1><i className="material-icons">free_breakfast</i>&nbsp;BRUNCH CLUB</h1>
          {/*<h1><i className="material-icons">local_cafe</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">local_dining</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">wb_sunny</i>&nbsp;BRUNCH CLUB</h1>*/}
        </section>
        <p className="instruct">Sign in with your phone number below.</p>
        <form id="sign-in-form" action="#">
          <div ref={(el) => this.phoneField = el} className="mdc-text-field mdc-text-field--box mdc-text-field--with-leading-icon phone">
            <i ref={(el) => this.phoneFieldIcon = el} className="material-icons mdc-text-field__icon" tabIndex="0" role="button">phone</i>
            <input type="text" className="mdc-text-field__input" id="phone-input" name="phone" value={this.state.phoneNumber} onChange={this.handlePhone}/>
            <label className="mdc-floating-label" htmlFor="phone-input">Phone Number</label>
            <div className="mdc-line-ripple"></div>
          </div>
          <div className="button-container">
            <button ref={(el) => this.signInBtn = el} className="mdc-button mdc-button--raised next" id="sign-in-button">
              Next
            </button>
          </div>
        </form>
        <form id="verification-code-form" action="#">
          <div ref={(el) => this.verifyField = el} className="mdc-text-field mdc-text-field--box verification-code">
            <input type="text" className="mdc-text-field__input" id="verification-code" name="verification-code"/>
            <label className="mdc-floating-label" htmlFor="verification-code">Enter the verification code...</label>
            <div className="mdc-line-ripple"></div>
          </div>
          <div className="button-container">
            <button ref={(el) => this.cancelBtn = el} className="mdc-button cancel">
              Cancel
            </button>
            <button ref={(el) => this.verifyBtn = el} className="mdc-button mdc-button--raised next">
              Verify Code
            </button>
          </div>
        </form>
        <div className="user-details-container">
          Firebase sign-in status: <span id="sign-in-status">Unknown</span>
          <div>Firebase auth <code>currentUser</code> object value:</div>
          <pre><code id="account-details">null</code></pre>
        </div>
      </div>
    );
  }
}

export default App;
