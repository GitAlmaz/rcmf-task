import axios from 'axios'
import { returnErrors } from "./errorActions";
import { 
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGOUT_SUCCESS
} from './types'

import firebase from "firebase/app";

const createUser =  ({ email, password }) => async (dispatch) => {
	try {
		const res = await firebase.auth().signInWithEmailAndPassword(email, password)
		console.log('res',res)
	} catch (error) {
		console.error(error);
	}
}

const loadUser = () => async (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING })

	// Get Token from localStorege
	const token = getState().auth.token

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	// If token, add to headers
	if (token) {
		config.headers['x-auth-token'] = token
	}

	try {
		let res = await axios.get('/api/auth/user', config)
		if (res) {
			dispatch({ 
				type: USER_LOADED,
				payload: res.data
			})
		}
	} catch (error) {
		dispatch(returnErrors(error.response.data, error.response.status))
		dispatch({ type: AUTH_ERROR })
	}
	
}

export { loadUser, createUser }