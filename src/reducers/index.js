import { combineReducers } from 'redux'
import { tasksReducer } from '../reducers/tasksReducer'
import { errorReducer } from '../reducers/errorReducer'
import { authReducer } from '../reducers/authReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	error: errorReducer,
	auth: authReducer
})

export { rootReducer }
