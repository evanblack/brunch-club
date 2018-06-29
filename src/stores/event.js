import { observable, computed, action, decorate } from 'mobx'
import firebase from 'firebase'
import format from 'date-fns/format'

class EventStore {
  id = null
  when = null
  where = null
  rsvps = 0
  get formattedDate() {
    return format(this.when, 'dddd MMMM DD, YYYY @ ha')
  }
  init(id, data) {
    this.id = id
    this.when = data.when.toDate()
    console.log(data)
    // console.log(data.collection('rsvps'))
    // where is a reference to a "spot" object
    if (data.where) {
      data.where.get().then((snapshot) => {
        this.where = snapshot.data()
      })
    }
    this.fetchRsvps().then((snapshot) => {
      this.rsvps = snapshot.size
    })
  }
  fetchRsvps() {
    return firebase
      .firestore()
      .collection('events')
      .doc(this.id)
      .collection('rsvps')
      .get()
  }
}

decorate(EventStore, {
  id: observable,
  when: observable,
  where: observable,
  rsvps: observable,
  formattedDate: computed,
  init: action
})

export default EventStore
