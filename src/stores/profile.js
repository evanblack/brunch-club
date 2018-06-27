import { observable, action } from 'mobx'

const profileStore = observable(
  {
    name: '',
    email: '',
    processing: false,
    method: 'set',
    setName(val) {
      this.name = val
    },
    setEmail(val) {
      this.email = val
    },
    setStatus(flag) {
      this.processing = flag
    },
    setAction(method) {
      this.method = method
    }
  },
  {
    setName: action.bound,
    setEmail: action.bound,
    setStatus: action.bound
  }
)

export default profileStore
