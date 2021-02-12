import { GET_ERRORS, CLEAR_ERRORS } from '../types'

const returnErrors = (message, code, id = null) => {
	console.log(message, code);
	return {
		type: GET_ERRORS,
		payload: { message, code, id }
	}
}

const clearError = () => {
	return {
		type: CLEAR_ERRORS
	}
}

export { returnErrors, clearError }