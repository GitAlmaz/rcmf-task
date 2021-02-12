import { GET_ERRORS, CLEAR_ERRORS } from '../types'

const initialState = {
	message: null,
	code: null,
	id: null
}

const errorReducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_ERRORS:
			return {
				message: action.payload.message,
				code: action.payload.code,
				id: action.payload.id
			}
		case CLEAR_ERRORS: 
			return {
				message: null,
				code: null,
				id: null
			}
		default: return state
	}
}

export { errorReducer }