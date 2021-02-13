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

const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	isLoading: false,
	user: null,
	uid: localStorage.getItem('uid')
}
export interface IAuthState {
	token: string | null
	isAuth: boolean | null
	isLoading: boolean
	user: {
		info: {
			name: string
			password: string
		}
		tasks?: object[]
	} | null
	uid: string | null
}

type AuthAction = {
	type: string
	payload: {
		token: string
		uid: string
	}
}

const authReducer = (state: IAuthState = initialState, action: AuthAction) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			}
		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				user: action.payload
			}
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('uid', action.payload.uid)
			return {
				...state,
				...action.payload,
				isAuth: true,
				isLoading: false
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
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
