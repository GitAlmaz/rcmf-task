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

const createUser =  ({ email, password, name }) => async dispatch => {
	dispatch({ type: USER_LOADING })
	try {
		const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
		const { refreshToken, uid } = res.user
		await firebase.database().ref(`/users/${uid}/info`).set({
			name,
			password
		})
		dispatch({type: REGISTER_SUCCESS, payload: {token: refreshToken}})
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: REGISTER_FAIL })
	}
}

const loginUser = ({email, password}) => async dispatch => {
	dispatch({ type: USER_LOADING })
	try {
		const res = await firebase.auth().signInWithEmailAndPassword(email, password)
		console.log(res);
		const {refreshToken, uid} = res.user
		dispatch({type: LOGIN_SUCCESS, payload: {token: refreshToken, uid}})
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: AUTH_ERROR })
		throw error
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

export { createUser, loginUser }