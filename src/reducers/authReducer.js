import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: false,
  user: null,
  uid: null
}

const authReducer = (state = initialState, action) => {
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
      console.log(action)
      localStorage.setItem("token", action.payload.token)
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
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false,
        uid: null
      }

    default:
      return state
  }
}
export { authReducer }
