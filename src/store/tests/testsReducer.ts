import { TESTS_LOADING, TESTS_LOADED, TESTS_FAIL } from '../types'


export interface question {
	q: string
	a_1: string
	a_2: string
	a_3: string
	a_4: string
	r_a: string
}

export interface ICreateTest {
	title: string
	subject: string
	questions: question[]
}

export interface ITestsState {
	tests: ITest[]
	isLoading: boolean
}

export interface ITest {
	id: string
	title: string
	status: boolean
	subject: string
	questions: question[]
}

type TestsAction = {
	type: string
	payload?: object[]
}

const initialState = {
	tests: [],
	isLoading: false
}

const testReducer = (state: ITestsState = initialState, action: TestsAction) => {
	switch (action.type) {
		case TESTS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case TESTS_LOADED:
			return {
				...state,
				isLoading: false,
				tests: action.payload
			}
		case TESTS_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}

export { testReducer }