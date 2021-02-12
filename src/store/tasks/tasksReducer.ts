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
			const obj = {
				completed: [],
				unfulfilled: []
			}
			// let arr = []
			// for (const key in data) {
			// 	arr = [
			// 		...arr,
			// 		{
			// 			id: key,
			// 			title: data[key].title,
			// 			description: data[key].description,
			// 			status: data[key].status,
			// 			create_date: data[key].create_date
			// 		}
			// 	]
			// }
			
			for (const key in data) {
				let item = {
					id: key,
					title: data[key].title,
					description: data[key].description,
					status: data[key].status,
					create_date: data[key].create_date
				}
				data[key].status ? obj.completed.push(item) : obj.unfulfilled.push(item)
			}
			console.log('obj', obj)
			return {
				...state,
				isLoading: false,
				tasks: obj
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
