import { Type } from '../types'
import { ITestsState, TestsAction } from '../types/tests'

const initialState: ITestsState = {
	tests: [],
	isLoading: false,
	test: {
		id: '',
		title: '',
		subject: '',
		questions: [],
		test_time: 60
	},
	showResult: false,
	result: 0
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
			return {
				...state,
				isLoading: false,
				test: action.payload
			}
		case Type.TEST_FINISHED:
			return {
				...state,
				isLoading: false,
				result: action.payload,
				showResult: true
			}
		case Type.TEST_RESET: 
			return {
				...state,
				result: 0,
				test: {
					id: '',
					title: '',
					subject: '',
					questions: [],
				},
				showResult: false
			}
		default:
			return state
	}
}

export { testReducer }