import { observable, action } from 'mobx';

const userStore = observable({
  uid: '',
  name: '',
  email: '',
  phone: '',
  auth: null,
  setAuth(user) {
    this.uid = user.uid;
    this.name = user.displayName;
    this.email = user.email;
    this.phone = user.phoneNumber;
    this.auth = user;
  }
}, {
  auth: observable.ref,
  setAuth: action.bound,
})

export default userStore