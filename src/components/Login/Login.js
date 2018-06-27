import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import AnimatedPanel from './AnimatedPanel'
import Phone from './Phone'
import Verify from './Verify'

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
      <div>
        <section className="header">
          <h1>
            <i className="material-icons">free_breakfast</i>&nbsp;BRUNCH CLUB
          </h1>
          {/*<h1><i className="material-icons">local_cafe</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">local_dining</i>&nbsp;BRUNCH CLUB</h1>
          <h1><i className="material-icons">wb_sunny</i>&nbsp;BRUNCH CLUB</h1>*/}
        </section>
        <AnimatedPanel timeout={375} animation={`squish`} in={isPhone} render={screens.Phone} />
        <AnimatedPanel timeout={375} animation={`squish`} in={isVerify} render={screens.Verify} />
      </div>
    )
  }
}

export default inject('store')(observer(Login))
