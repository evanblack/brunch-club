import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../Header'
import { MDCTextField } from '@material/textfield'
import { MDCRipple } from '@material/ripple'
import './Profile.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.nameField = null
    this.emailField = null
    this.nextBtn = null
    this.bindMDC = this.bindMDC.bind(this)
    this.setName = this.setName.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  bindMDC() {
    new MDCTextField(this.nameField)
    new MDCTextField(this.emailField)
    new MDCRipple(this.nextBtn)
  }
  setName(e) {
    const { store } = this.props
    store.profile.setName(e.target.value)
  }
  setEmail(e) {
    const { store } = this.props
    store.profile.setEmail(e.target.value)
  }
  handleSubmit(e) {
    const { store } = this.props
    const { setMember, addMember } = store.user
    const { name, email, method, setStatus } = store.profile
    e.preventDefault()
    setStatus(true)
    if (method === 'add') {
      addMember({
        name,
        email
      }).then(() => {
        // Success!
        store.router.goTo('home')
      })
    } else {
      setMember({
        name,
        email
      }).then(() => {
        // Success!
        store.router.goTo('home')
      })
    }
  }
  componentDidMount() {
    // Init MDC
    this.bindMDC()
  }
  render() {
    const { store } = this.props
    const { name, email, processing } = store.profile
    return (
      <div className="Profile">
        <Header />
        <form className={`Profile-form`} action="#">
          <p className="instruct">Please tell us more about yourself.</p>
          <div
            ref={(el) => (this.nameField = el)}
            className="mdc-text-field mdc-text-field--box name">
            <input
              type="text"
              className="mdc-text-field__input"
              id="name-input"
              name="name"
              value={name}
              onChange={this.setName}
            />
            <label className="mdc-floating-label" htmlFor="name-input">
              Name
            </label>
            <div className="mdc-line-ripple" />
          </div>
          <div
            ref={(el) => (this.emailField = el)}
            className="mdc-text-field mdc-text-field--box email">
            <input
              type="text"
              className="mdc-text-field__input"
              id="email-input"
              name="email"
              value={email}
              onChange={this.setEmail}
            />
            <label className="mdc-floating-label" htmlFor="email-input">
              Email
            </label>
            <div className="mdc-line-ripple" />
          </div>
          <div className="button-container">
            <button
              onClick={this.handleSubmit}
              ref={(el) => (this.nextBtn = el)}
              disabled={!!processing}
              className="mdc-button mdc-button--raised next">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default inject('store')(observer(Profile))
