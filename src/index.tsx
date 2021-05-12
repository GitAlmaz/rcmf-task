import ReactDOM from 'react-dom'
import './index.css'
import app from './App'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
	apiKey: "AIzaSyCpxi73Pt2PLE2IOTh5LvGziWM-90rzOjU",
	authDomain: "nurzhan-diplom.firebaseapp.com",
	databaseURL: "https://nurzhan-diplom-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "nurzhan-diplom",
	storageBucket: "nurzhan-diplom.appspot.com",
	messagingSenderId: "361516707273",
	appId: "1:361516707273:web:1bbaac6b7b552354c34c18"
})

let isRendered: void | boolean

firebase.auth().onAuthStateChanged(() => {
	if (!isRendered) {
		isRendered = ReactDOM.render(app, document.getElementById('root'))
	}
})
