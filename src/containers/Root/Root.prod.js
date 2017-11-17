import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import App from '../App'

export default class Root extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router history={store.history} onUpdate={this.onUpdate}>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    )
  }
}