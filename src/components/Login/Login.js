import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../Header'
import AnimatedPanel from './AnimatedPanel'
import Phone from './Phone'
import Verify from './Verify'
import './Login.css'

class Login extends Component {
  render() {
    const { store } = this.props

    const isPhone = store.login.view === 'login'
    const isVerify = store.login.view === 'verify'
    const screens = {
      Phone: ({ animationClass }) => (
        <Phone
          animationClass={animationClass}
          loginStore={store.login}
          router={store.router}
        />
      ),
      Verify: ({ animationClass }) => (
        <Verify
          animationClass={animationClass}
          loginStore={store.login}
          router={store.router}
        />
      )
    }

    return (
      <div className="Login">
        <Header />
        <AnimatedPanel timeout={375} animation={`squish`} in={isPhone} render={screens.Phone} />
        <AnimatedPanel timeout={375} animation={`squish`} in={isVerify} render={screens.Verify} />
      </div>
    )
  }
}

export default inject('store')(observer(Login))
