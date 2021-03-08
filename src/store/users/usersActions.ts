import { Type } from '../types'
import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '../types'
import { parseData } from '../../utils/utils'

const usersLoad = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.USERS_LOADING })
	try {
		firebase
			.database()
			.ref('/users')
			.on('value', async snap => {
				const data = await snap.val()
				const users = parseData(data)
				dispatch({ type: Type.USERS_SUCCESS, payload: users })
			})
	} catch (error) {
		dispatch({ type: Type.USERS_FAIL })
		throw error
	}
}


export { usersLoad }
