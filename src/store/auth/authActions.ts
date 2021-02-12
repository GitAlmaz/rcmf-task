import { returnErrors } from '../error/errorActions'
import firebase from 'firebase/app'
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGOUT_SUCCESS
} from '../types'

const createUser = ({ email, password, name }) => async dispatch => {
	dispatch({ type: USER_LOADING })
	try {
		const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
		const { refreshToken, uid } = res.user
		await firebase.database().ref(`/users/${uid}/info`).set({
			name,
			password,
			tasks: []
		})
		dispatch({ type: REGISTER_SUCCESS, payload: { token: refreshToken } })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: REGISTER_FAIL })
		throw error
	}
}

const loginUser = ({ email, password }) => async dispatch => {
	dispatch({ type: USER_LOADING })
	try {
		const res = await firebase.auth().signInWithEmailAndPassword(email, password)
		const { refreshToken, uid } = res.user
		dispatch({ type: LOGIN_SUCCESS, payload: { token: refreshToken, uid } })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: AUTH_ERROR })
		throw error
	}
}

const logoutUser = () => async dispatch => {
	dispatch({ type: USER_LOADING })
	try {
		await firebase.auth().signOut()
		dispatch({ type: LOGOUT_SUCCESS })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: AUTH_ERROR })
	}
}

const loadUser = () => async (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	try {
		const { uid } = getState().auth
		if (!uid) {
			dispatch({ type: AUTH_ERROR })
		} else {
			await firebase
				.database()
				.ref(`/users/${uid}`)
				.on('value', async snapshot => {
					const data = await snapshot.val()
					dispatch({ type: USER_LOADED, payload: { ...data, uid } })
				})
		}
	} catch (error) {
		dispatch(returnErrors(error, error))
		dispatch({ type: AUTH_ERROR })
	}
}

export { createUser, loginUser, loadUser, logoutUser }
