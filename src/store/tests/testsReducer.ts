import { Type } from '../types'
import { ITestsState, TestsAction } from '../types/tests'

const initialState: ITestsState = {
	tests: [],
	isLoading: false,
	test: {
		title: '',
		subject: '',
		questions: []
	}
}

const testReducer = (
	state: ITestsState = initialState,
	action: TestsAction
) => {
	switch (action.type) {
		case Type.TESTS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case Type.TESTS_LOADED:
			return {
				...state,
				isLoading: false,
				tests: action.payload
			}
		case Type.TESTS_FAIL:
			return {
				...state,
				isLoading: false
			}
		case Type.TEST_LOADED:
			console.log(action.payload);
			
			return {
				...state,
				isLoading: false,
				test: action.payload
			}
		default:
			return state
	}
}

export { testReducer }