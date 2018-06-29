import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'
import './Home.css'
import EventCard from './EventCard'

class HomePage extends Component {
  componentDidMount() {
    const { store } = this.props
    const eventListStore = store.eventList
    eventListStore.fetchEvents()
  }
  handleSignOut(e) {
    e.preventDefault()
    firebase.auth().signOut()
  }
  render() {
    const { store } = this.props
    const eventListStore = store.eventList
    // const user = firebase.auth().currentUser;
    // const user = store.user.auth

    // const EventList = eventListStore.loading ? <Spinner /> :
    const EventList = eventListStore.loading
      ? null
      : eventListStore.events.map((e) => <EventCard key={`event_${e.id}`} event={e} />)

    return (
      <div className="Home">
        <h1>Upcoming Events</h1>
        {EventList}
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
