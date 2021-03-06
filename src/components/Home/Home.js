import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from 'firebase'
import './Home.css'
import Header from '../Header'
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
    // const user = store.user.auth

    // const EventList = eventListStore.loading ? <Spinner /> :
    let EventList = null
		if(!eventListStore.loading) {
			EventList = eventListStore.events.length
				? eventListStore.events.map((e) => <EventCard key={`event_${e.id}`} event={e} />)
				: (<p>Sorry, there aren't any upcoming events.</p>)
		}

    return (
      <div className="Home">
        <Header />
        <h1 className="Home-heading mdc-typography--headline6">Upcoming Events</h1>
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
