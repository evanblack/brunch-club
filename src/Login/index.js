import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import firebase from 'firebase';
import AnimatedPanel from './AnimatedPanel';
import Phone from './Phone';
import Verify from './Verify';

class Login extends Component {
  handleSignOut(e) {
    e.preventDefault();
    firebase.auth().signOut();
  }
  componentDidMount() {
    const { store } = this.props
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        store.user.setAuth(user);
      }
    });
  }
  render() {
    const { store } = this.props
    // const user = firebase.auth().currentUser;
    const user = store.user.auth;
    
    const isPhone = store.login.view === 'login'
    const isVerify = store.login.view === 'verify'
    const screens = {
      Phone:  ({ animationClass }) => (<Phone animationClass={ animationClass } loginStore={store.login} router={store.router} setView={store.setView} />),
      Verify: ({ animationClass }) => (<Verify animationClass={ animationClass } loginStore={store.login} router={store.router} setView={store.setView} />),
    }
    
    return (
      <div>
        <section className="header">
          <h1><i className="material-icons">free_breakfast</i>&nbsp;BRUNCH CLUB</h1>
          {/*<h1><i className="material-icons">local_cafe</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">local_dining</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">wb_sunny</i>&nbsp;BRUNCH CLUB</h1>*/}
        </section>
        <AnimatedPanel timeout={375} animation={`squish`} in={ isPhone } render={ screens.Phone } />
        <AnimatedPanel timeout={375} animation={`squish`} in={ isVerify } render={ screens.Verify } />
        <div className="user-details-container">
          Firebase sign-in status: <span id="sign-in-status">{ user ? 'Signed in' : 'Signed out' }</span>
          <div>Firebase auth <code>currentUser</code> object value:</div>
          <pre><code id="account-details">{ user ? JSON.stringify(user, null, '  ') : 'null' }</code></pre>
          { user ?
            <button onClick={this.handleSignOut} className="mdc-button mdc-button--raised">
              Sign Out
            </button>
          : null }
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(Login));