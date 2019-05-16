import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import todoApp from './reducers'
import firebaseConfig from './firebase/config'
import App from './components/App'

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  apllyMiddleware(thunk.withExtraArgument({getFirebase})),
  reactReduxFirebase(firebase, {})
)(createStore);

const store = createStoreWithFirebase(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)