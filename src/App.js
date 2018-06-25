import React, { Component } from 'react';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldIcon} from '@material/textfield/icon';
import {MDCRipple} from '@material/ripple';
import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import logo from './logo.svg';
import './App.css';
import {
  Consumer,
  createSelector,
  mutate,
} from './state';

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
    mutate(draft => {
      // Mutate state! You dont have to worry about it!
      draft.phoneNumber = e.target.value;
    })
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
      <Consumer select={[
        state => state.phoneNumber,
        state => state.view,
      ]}>
        {(phoneNumber, view) => (
          <div>
            <p>{phoneNumber}</p>
            <p>{view}</p>
          </div>
        )}
      </Consumer>
    )
  }
}

export default App;
