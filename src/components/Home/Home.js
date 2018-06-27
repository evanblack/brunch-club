import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default inject('store')(observer(HomePage))
