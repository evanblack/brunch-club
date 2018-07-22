import { observable, computed, action, decorate } from 'mobx'
import firebase from 'firebase'
import format from 'date-fns/format'

let eventsCollection
let membersCollection

class EventStore {
  rootStore
  id = null
  when = null
  where = null
  rsvps = new Map()
  rsvpData = []
  rsvpId = null
  whosIn = false
  collapsed = true
  constructor(rootStore) {
    this.rootStore = rootStore
    eventsCollection = firebase.firestore().collection('events')
    membersCollection = firebase.firestore().collection('members')
  }
  get formattedDate() {
    return format(this.when, 'dddd MMMM DD, YYYY @ ha')
  }
  get isRsvpd() {
    // const result = this.rsvpData.find((m) => m.authId === this.rootStore.user.authId)
    return this.rsvpId ? true : false
  }
  init(id, data) {
    this.id = id
    this.when = data.when.toDate()
    // where is a reference to a "spot" object
    if (data.where) {
      data.where.get().then((snapshot) => {
        this.where = snapshot.data()
      })
    }
    this.fetchRsvps()
  }
  rsvp() {
    if (this.isRsvpd) {
      eventsCollection
        .doc(this.id)
        .collection('rsvps')
        .doc(this.rsvpId)
        .delete()
        .then(() => {
          console.log('Canceled RSVP!')
          this.rsvpId = null
          this.fetchRsvps()
        })
    } else {
      eventsCollection
        .doc(this.id)
        .collection('rsvps')
        .add({
          // member: `members/${this.rootStore.user.docId}`
          member: this.rootStore.user.docRef
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          this.rsvpId = docRef.id
          this.fetchRsvps()
        })
    }
  }
  toggleCollapsed() {
    this.collapsed = !this.collapsed
  }
  toggleWhosIn() {
    this.whosIn = !this.whosIn
  }
  fetchRsvps() {
    return eventsCollection
      .doc(this.id)
      .collection('rsvps')
      .get()
      .then((rsvpSnapshot) => {
        this.rsvps = rsvpSnapshot
        this.rsvpData.clear()
        if (rsvpSnapshot.size) this.fetchRsvpData(rsvpSnapshot)
      })
  }
  // TODO: This likely may not be performant.
  // Should we just store the snapshotted member
  // data to the collection when we RSVP?
  fetchRsvpData(rsvpSnapshot) {
    rsvpSnapshot.forEach((rsvp) => {
      const rsvpData = rsvp.data()
      // console.log(rsvpData)
      membersCollection
        .doc(rsvpData.member.id)
        .get()
        .then((memberSnapshot) => {
          // Check if authd user is RSVPd
          if (memberSnapshot.ref.id === this.rootStore.user.docRef.id) {
            this.rsvpId = rsvp.id
          }
          this.rsvpData.push(memberSnapshot.data())
        })
    })
  }
}

decorate(EventStore, {
  id: observable,
  when: observable,
  where: observable,
  rsvps: observable,
  rsvpData: observable.shallow,
  rsvpId: observable,
  whosIn: observable,
  collapsed: observable,
  formattedDate: computed,
  isRsvpd: computed,
  init: action.bound,
  rsvp: action.bound,
  toggleCollapsed: action.bound,
  toggleWhosIn: action.bound,
  fetchRsvps: action.bound,
  fetchRsvpData: action.bound
})

export default EventStore
