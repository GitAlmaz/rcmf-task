import { Type } from '../types'
import { ITest } from '../types/tests'
import { IUserInfo, IUsersState, UsersAction } from '../types/users'

export type UserState = {
	isLoading: boolean
	info: IUserInfo
	tests?: ITest[]
}

const initialState: UserState = {
	isLoading: false,
	info: {
		admin: false,
		email: '',
		name: '',
		password: '',
		last_name: '',
		group: ''
	}
}

const userReducer = (state: UserState = initialState, action: UsersAction) => {
	switch (action.type) {
		case Type.ACCOUNT_LOADING:
			return {
				...state,
				isLoading: true
			}
		case Type.ACCOUNT_LOADED:
			return {
				...state,
				isLoading: false,
				info: action.payload
			}
		case Type.ACCOUNT_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}
export { userReducer }
