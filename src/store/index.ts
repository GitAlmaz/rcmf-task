import { combineReducers } from 'redux'
import { tasksReducer } from './tasks/tasksReducer'
import { errorReducer } from './error/errorReducer'
import { authReducer } from './auth/authReducer'
import { ITasksState } from './tasks/tasksReducer'
import { IAuthState } from './auth/authReducer'
export interface RootState {
	tasks: ITasksState
	error: any
	auth: IAuthState
}

export type TypeDispatch = {
	type: string
	payload?: object
}

const rootReducer = combineReducers({
	tasks: tasksReducer,
	error: errorReducer,
	auth: authReducer
})

export { rootReducer }
