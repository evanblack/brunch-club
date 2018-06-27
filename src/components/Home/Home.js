import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'

class HomePage extends Component {
  handleSignOut(e) {
    e.preventDefault()
    firebase.auth().signOut()
  }
  render() {
    const { store } = this.props
    // const user = firebase.auth().currentUser;
    const user = store.user.auth
    return (
      <div>
        <h1>Home</h1>
        <div className="user-details-container">
          Firebase sign-in status:{' '}
          <span id="sign-in-status">{user ? 'Signed in' : 'Signed out'}</span>
          <div>
            Firebase auth <code>currentUser</code> object value:
          </div>
          <pre>
            <code id="account-details">{user ? JSON.stringify(user, null, '  ') : 'null'}</code>
          </pre>
          {user ? (
            <button onClick={this.handleSignOut} className="mdc-button mdc-button--raised">
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(HomePage))
