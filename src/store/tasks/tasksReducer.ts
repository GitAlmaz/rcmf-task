import { TASKS_LOADING, TASKS_LOADED, TASKS_FAIL } from '../types'
export interface ITasksState {
	tasks: {
		completed: ITask[]
		unfulfilled: ITask[]
	}
	isLoading: boolean
}
type TasksAction = {
	type: string
	payload?: object[]
}

export interface ITask {
	id: string
	title: string
	description: string
	status: boolean
	create_date: number
}
interface ITaskLoadPayload {
	[key: string]: {
		title: string
		description: string
		status: boolean
		create_date: number
	}
}
const initialState = {
	tasks: {
		completed: [],
		unfulfilled: []
	},
	isLoading: false
}

const tasksReducer = (state: ITasksState = initialState, action: TasksAction) => {
	switch (action.type) {
		case TASKS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case TASKS_LOADED:
			return {
				...state,
				isLoading: false,
				tasks: action.payload
			}
		case TASKS_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}

export { tasksReducer }
