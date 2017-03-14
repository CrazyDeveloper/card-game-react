import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './Redux/store'
import App from './Components/App'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
