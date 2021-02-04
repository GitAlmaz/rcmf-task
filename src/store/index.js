import { combineReducers } from 'redux'
import { tasksReducer } from './tasks/tasksReducer'
import { errorReducer } from './error/errorReducer'
import { authReducer } from './auth/authReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	error: errorReducer,
	auth: authReducer
})

export { rootReducer }
