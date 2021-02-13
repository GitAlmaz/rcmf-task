import { GET_ERRORS, CLEAR_ERRORS } from '../types'

const initialState = {
	message: null,
	code: null,
	id: null
}
export type TErrorState = {
	message: string | null
	code: number | null
	id: any | null
}
type TErrorAction = {
	type: string
	payload: {
		message: string
		code: number
		id: any
	}
}

const errorReducer = (
	state: TErrorState = initialState,
	action: TErrorAction
) => {
	switch (action.type) {
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
		default:
			return state
	}
}

export { errorReducer }
