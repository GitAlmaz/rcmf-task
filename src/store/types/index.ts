import { ITasksState } from './tasks'
import { IAuthState } from './auth'
import { ITestsState } from './tests'
import { IUsersState } from './users'

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
	TEST_LOADING = 'TEST_LOADING',
	TEST_FINISHED = 'TEST_FINISHED',
	TEST_RESET = 'TEST_RESET',
	USERS_LOADING = 'USERS_LOADING',
	USERS_SUCCESS = 'USERS_SUCCESS',
	USERS_FAIL = 'USERS_FAIL',
}

export interface RootState {
	tasks: ITasksState
	error: any
	auth: IAuthState
	tests: ITestsState
	users: IUsersState
}

export type TypeDispatch = {
	type: string
	payload?: object | number
}
