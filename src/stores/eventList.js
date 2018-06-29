import { observable, computed, action, decorate } from 'mobx'
import EventStore from './event'
import firebase from 'firebase'

class EventListStore {
  loading = false
  events = []
  eventsRef = null
  reset() {
    this.setLoading(false)
    this.clearEvents()
  }
  fetchEvents() {
    this.setLoading(true)
    return firebase
      .firestore()
      .collection('events')
      .get()
      .then((querySnapshot) => {
        this.setLoading(false)
        this.setEvents(querySnapshot)
        return querySnapshot
      })
      .catch((err) => {
        this.setLoading(false)
        return Promise.reject(new Error(err.message))
      })
  }
  setLoading(flag) {
    this.loading = flag
  }
  setEvents(querySnapshot) {
    let events = []
    querySnapshot.forEach(function(doc) {
      // console.log(doc.get().collection('rsvps'))
      // console.log(doc.collection('rsvps'))
      let s = new EventStore()
      s.init(doc.id, doc.data())
      events.push(s)
    })
    this.events.replace(events)
  }
  clearEvents() {
    this.events.clear()
  }
}

decorate(EventListStore, {
  loading: observable,
  events: observable.shallow,
  setLoading: action,
  setEvents: action,
  clearEvents: action
})

export default EventListStore
