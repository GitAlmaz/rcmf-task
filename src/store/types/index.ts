import { ITasksState } from './tasks'
import { IAuthState } from './auth'
import { ITestsState } from './tests'

export enum Type {
	REGISTER_SUCCESS = 'REGISTER_SUCCESS',
	REGISTER_FAIL = 'REGISTER_FAIL',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAIL = 'LOGIN_FAIL',
	LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
	AUTH_ERROR = 'AUTH_ERROR',
	USER_LOADING = 'USER_LOADING',
	USER_LOADED = 'USER_LOADED',
	GET_ERRORS = 'GET_ERRORS',
	CLEAR_ERRORS = 'CLEAR_ERRORS',
	TASKS_LOADING = 'TASKS_LOADING',
	TASKS_LOADED = 'TASKS_LOADED',
	TASKS_FAIL = 'TASKS_FAIL',
	TESTS_FAIL = 'TESTS_FAIL',
	TESTS_LOADED = 'TESTS_LOADED',
	TESTS_LOADING = 'TESTS_FAIL',
	TEST_LOADED = 'TEST_LOADED',
	TEST_LOADING = 'TEST_LOADING'
	
}

export interface RootState {
	tasks: ITasksState
	error: any
	auth: IAuthState
	tests: ITestsState
}

export type TypeDispatch = {
	type: string
	payload?: object
}
