import { Type } from '../types'

const returnErrors = (message: string, code: number, id = null) => {
	console.log(message, code);
	return {
		type: Type.GET_ERRORS,
		payload: { message, code, id }
	}
}

const clearError = () => {
	return {
		type: Type.CLEAR_ERRORS
	}
}

export { returnErrors, clearError }