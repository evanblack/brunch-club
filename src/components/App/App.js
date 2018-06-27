import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import Views from '../Views'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Views />
      </Provider>
    )
  }
}

export default App
