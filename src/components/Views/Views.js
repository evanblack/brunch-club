import React from 'react'
import { inject } from 'mobx-react'
import { RouterView } from 'mobx-state-router'
import Loader from '../Loader'
import Login from '../Login'
import HomePage from '../Home'
import NotFoundPage from '../NotFound'

const viewMap = {
  loader: <Loader />,
  home: <HomePage />,
  login: <Login />,
  notFound: <NotFoundPage />
}

class Views extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div className="App">
        <RouterView routerStore={store.router} viewMap={viewMap} />
      </div>
    )
  }
}

export default inject('store')(Views)
