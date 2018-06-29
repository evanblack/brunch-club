import { observable, computed, action, decorate } from 'mobx'

class EventStore {
  id = null
  when = null
  where = null
  init(eventObj) {
    for (let prop in eventObj) {
      if (this.hasOwnProperty(prop) && eventObj.hasOwnProperty(prop)) {
        this[prop] = eventObj[prop]
      }
    }
  }
}

decorate(EventStore, {
  id: observable,
  when: observable,
  where: observable,
  init: action
})

export default EventStore
