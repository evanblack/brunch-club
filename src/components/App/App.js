import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { HistoryAdapter } from 'mobx-state-router'
import { history } from '../../history'
import appStore from '../../stores/app'
import Views from '../Views'
import './App.css'

window.appStore = appStore

// Observe history changes
const historyAdapter = new HistoryAdapter(appStore.router, history)
historyAdapter.observeRouterStateChanges()

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Views />
      </Provider>
    )
  }
}

export default App