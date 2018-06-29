import { observable, computed, action, decorate } from 'mobx'
import EventStore from './event'
import firebase from 'firebase'

class EventListStore {
  loading = false
  events = []
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
        // this.setEvents(response.data)
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
        })
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
  setEvents(eventData) {
    let events = []
    let len = eventData.length
    for (let i = 0; i < len; i++) {
      const e = eventData[i]
      let s = new EventStore()
      s.init(e)
      events.push(s)
    }
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
