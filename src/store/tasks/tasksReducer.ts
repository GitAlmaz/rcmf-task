import { Reducer } from 'redux'
import { Type } from '../types'
import {ITasksState, AnyAction} from '../types/tasks'

const initialState = {
	tasks: {
		completed: [],
		unfulfilled: []
	},
	isLoading: false
}

const tasksReducer: Reducer = (state: ITasksState = initialState, action: AnyAction) => {
	switch (action.type) {
		case Type.TASKS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case Type.TASKS_LOADED:
			return {
				...state,
				isLoading: false,
				tasks: action.payload
			}
		case Type.TASKS_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}

export { tasksReducer }
