import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'
import './Home.css'

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
      <div className="Home">
        <h1>Upcoming Events</h1>
        <div className="mdc-card event-card">
          <div className="mdc-card__media event-card__media">
            <div className="mdc-card__media-content">
              <iframe
                frameBorder="0"
                src="https://www.google.com/maps/d/embed?mid=1tALyDa-yK9dKaM9j1KqOr3I1nLHm8hDt"
              />
            </div>
          </div>
          <div className="event-card__when">
            <h2 className="event-card__title mdc-typography--headline6">When</h2>
            <p className="event-card__subcontent mdc-typography--body2">
              July 8, 2018 at 10:00:00 AM
            </p>
          </div>
          <div className="event-card__where">
            <h2 className="event-card__title mdc-typography--headline6">Where</h2>
            <p className="event-card__subcontent mdc-typography--body2">
              Brunchies<br />
              13732 N Meridian St, Carmel, IN 46032
            </p>
          </div>
          {/*<div className="event-card__secondary mdc-typography--body2">
            Visit ten places on our planet that are undergoing the biggest changes today.
          </div>*/}
          <div className="mdc-card__actions">
            <div className="mdc-card__action-buttons">
              <button className="mdc-button mdc-card__action mdc-card__action--button">RSVP</button>
              <span className="event-card__rsvp-number mdc-typography--caption">17</span>
            </div>
            <div className="mdc-card__action-icons">
              <button
                className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                title="Favorite">
                favorite_border
              </button>
              <button
                className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                title="Remind Me">
                alarm
              </button>
            </div>
          </div>
        </div>
        {/*<div className="user-details-container">
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
        </div>*/}
      </div>
    )
  }
}

export default inject('store')(observer(HomePage))
