import {
	applyMiddleware,
	combineReducers,
	createStore,
	Store,
	Middleware,
	Reducer
} from 'redux'
import { tasksReducer } from './tasks/tasksReducer'
import { errorReducer } from './error/errorReducer'
import { authReducer } from './auth/authReducer'
import { testReducer } from './tests/testsReducer'
import { usersReducer } from './users/usersReducer'
import { userReducer } from './user/userReducer'
import { RootState } from './types'
import thunk from 'redux-thunk'

const middlewares: Middleware[] = [thunk]

const rootReducer: Reducer = combineReducers({
	tasks: tasksReducer,
	error: errorReducer,
	auth: authReducer,
	tests: testReducer,
	users: usersReducer,
	user: userReducer
})

export const store: Store<RootState> = createStore(
	rootReducer,
	applyMiddleware(...middlewares)
)
