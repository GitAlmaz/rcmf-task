import { TASKS_LOADING, TASKS_LOADED, TASKS_FAIL } from '../types'

const initialState = {
	tasks: [],
	isLoading: false
}

const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case TASKS_LOADING:
			return {
				...state,
				isLoading: true
			}
		case TASKS_LOADED:
			const data = { ...action.payload }
			let arr = []
			for (const key in data) {
				arr = [
					...arr,
					{
						id: key,
						title: data[key].title,
						description: data[key].description,
						status: data[key].status
					}
				]
			}
			return {
				...state,
				isLoading: false,
				tasks: arr
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
