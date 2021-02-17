import { combineReducers } from 'redux'
import { tasksReducer } from './tasks/tasksReducer'
import { errorReducer } from './error/errorReducer'
import { authReducer } from './auth/authReducer'
import { testReducer } from './tests/testsReducer'
import { ITasksState } from './tasks/tasksReducer'
import { IAuthState } from './auth/authReducer'
import { ITestsState } from './tests/testsReducer'

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

const rootReducer = combineReducers({
	tasks: tasksReducer,
	error: errorReducer,
	auth: authReducer,
	tests: testReducer
})

export { rootReducer }
