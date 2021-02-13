import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, applyMiddleware, Middleware } from 'redux'
import { rootReducer } from './store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
	apiKey: 'AIzaSyBmYB7F1WGqUH3zuYbJhgPxC1X-Ek2g7A4',
	authDomain: 'r-task-manager.firebaseapp.com',
	databaseURL: 'https://r-task-manager.firebaseio.com',
	projectId: 'r-task-manager',
	storageBucket: 'r-task-manager.appspot.com',
	messagingSenderId: '212326817908',
	appId: '1:212326817908:web:41ed3be6712a6174f07121'
})

const store = createStore(rootReducer, applyMiddleware<Middleware>(thunk))

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

let isRendered: void | boolean

firebase.auth().onAuthStateChanged(() => {
	if (!isRendered) {
		isRendered = ReactDOM.render(app, document.getElementById('root'))
	}
})
