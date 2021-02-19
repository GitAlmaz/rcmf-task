export interface ICreateTask {
	title: string
	description: string
	status: boolean
	create_date: number
}

export interface IEditTask {
	id: string
	title: string
	description: string
	status: boolean
}

export interface ITasksState {
	tasks: {
		completed: ITask[]
		unfulfilled: ITask[]
	}
	isLoading: boolean
}
export interface ITask {
	id: string
	title: string
	description: string
	status: boolean
	create_date: number
}
export interface AnyAction {
	type: string,
	payload?: object
}
interface ITaskLoadPayload {
	[key: string]: {
		title: string
		description: string
		status: boolean
		create_date: number
	}
}