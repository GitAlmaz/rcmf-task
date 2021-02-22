import { Dispatch } from 'react'
import { returnErrors } from '../error/errorActions'
import firebase from 'firebase/app'
import { Type, RootState, TypeDispatch } from '../types'
import { TUser } from '../types/auth'

const createUser = ({ email, password, name }: TUser) => async (
	dispatch: Dispatch<TypeDispatch>
) => {
	dispatch({ type: Type.USER_LOADING })
	try {
		const res = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
		const { refreshToken, uid }: any = res.user
		await firebase.database().ref(`/users/${uid}/info`).set({
			name,
			email,
			password
		})
		dispatch({ type: Type.REGISTER_SUCCESS, payload: { token: refreshToken, uid } })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: Type.REGISTER_FAIL })
		throw error
	}
}

const loginUser = ({ email, password }: TUser) => async (
	dispatch: Dispatch<TypeDispatch>
) => {
	dispatch({ type: Type.USER_LOADING })
	try {
		const res = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
		const { refreshToken, uid }: any = res.user
		dispatch({ type: Type.LOGIN_SUCCESS, payload: { token: refreshToken, uid } })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: Type.AUTH_ERROR })
		throw error
	}
}

const logoutUser = () => async (dispatch: Dispatch<TypeDispatch>) => {
	dispatch({ type: Type.USER_LOADING })
	try {
		await firebase.auth().signOut()
		dispatch({ type: Type.LOGOUT_SUCCESS })
	} catch (error) {
		dispatch(returnErrors(error.message, error.code))
		dispatch({ type: Type.AUTH_ERROR })
	}
}

const loadUser = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.USER_LOADING })
	try {
		const { uid } = getState().auth
		if (!uid) {
			dispatch({ type: Type.AUTH_ERROR })
		} else {
			await firebase
				.database()
				.ref(`/users/${uid}`)
				.on('value', async snapshot => {
					const data = await snapshot.val()
					dispatch({ type: Type.USER_LOADED, payload: { ...data, uid } })
				})
		}
	} catch (error) {
		dispatch(returnErrors(error, error))
		dispatch({ type: Type.AUTH_ERROR })
	}
}

export { createUser, loginUser, loadUser, logoutUser }
