import React from 'react'
import { inject } from 'mobx-react'
import { RouterView } from 'mobx-state-router'
import Login from './Login'
import HomePage from './Home'
import NotFoundPage from './NotFound'

const viewMap = {
  home: <HomePage />,
  login: <Login />,
  notFound: <NotFoundPage />
}

class ShellBase extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div className="App">
        <RouterView routerStore={store.router} viewMap={viewMap} />
      </div>
    )
  }
}

export default inject('store')(ShellBase)
