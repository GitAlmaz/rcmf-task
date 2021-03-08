import { Type } from '../types'
import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '../types'
import { IUserInfo } from '../types/users'

const updateUserInfo = ({
	id,
	payload
}: {
	id: string
	payload: IUserInfo
}) => async (dispatch: Dispatch<TypeDispatch>, getState: () => RootState) => {
	dispatch({ type: Type.ACCOUNT_LOADING })
	try {
		const { email, password } = getState().user.info
		const currentUser = await firebase.auth().currentUser
		const cred = await firebase.auth.EmailAuthProvider.credential(
			email,
			password
		)
		await currentUser?.reauthenticateWithCredential(cred)
		await currentUser?.updateEmail(payload.email)
		await currentUser?.updatePassword(payload.password)
		await firebase.database().ref(`/users/${id}/info`).update(payload)
		dispatch({ type: Type.ACCOUNT_LOADED, payload })
	} catch (error) {
		dispatch({ type: Type.ACCOUNT_FAIL })
		throw error
	}
}

const loadUserInfo = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.ACCOUNT_LOADING })
	const currentUser = await firebase.auth().currentUser
	console.log(currentUser)
	const user = getState().auth.user?.info
	dispatch({ type: Type.ACCOUNT_LOADED, payload: user })
}

export { updateUserInfo, loadUserInfo }
