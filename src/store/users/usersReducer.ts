import { Type } from '../types'
import { IUsersState, UsersAction } from '../types/users'

const initialState: IUsersState = {
	users: [],
	user: {},
	isLoading: false
}

const usersReducer = (
	state:IUsersState = initialState,
	action: UsersAction
) => {
	switch (action.type) {
		case Type.USERS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case Type.USERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				users: action.payload
			}
		case Type.USERS_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}
export { usersReducer }