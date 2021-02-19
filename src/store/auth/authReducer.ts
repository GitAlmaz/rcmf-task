import { Type } from '../types'
import { IAuthState, AuthAction } from '../types/auth'

const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	isLoading: false,
	user: null,
	uid: localStorage.getItem('uid')
}

const authReducer = (state: IAuthState = initialState, action: AuthAction) => {
	switch (action.type) {
		case Type.USER_LOADING:
			return {
				...state,
				isLoading: true
			}
		case Type.USER_LOADED:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				user: action.payload
			}
		case Type.LOGIN_SUCCESS:
		case Type.REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('uid', action.payload.uid)
			return {
				...state,
				...action.payload,
				isAuth: true,
				isLoading: false
			}
		case Type.AUTH_ERROR:
		case Type.LOGIN_FAIL:
		case Type.LOGOUT_SUCCESS:
		case Type.REGISTER_FAIL:
			localStorage.removeItem('token')
			localStorage.removeItem('uid')
			return {
				...state,
				token: null,
				user: null,
				isAuth: false,
				isLoading: false
			}

		default:
			return state
	}
}
export { authReducer }
