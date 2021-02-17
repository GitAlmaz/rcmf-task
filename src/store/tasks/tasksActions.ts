import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '..'
import { TASKS_LOADING, TASKS_LOADED } from '../types'
import { ITask } from './tasksReducer'
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

const createTask = ({ title, description, status, create_date }: ICreateTask) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: TASKS_LOADING })
	try {
		const { uid } = getState().auth
		await firebase
			.database()
			.ref(`/users/${uid}/tasks`)
			.push({
				title,
				description,
				status: status ? true : false,
				create_date
			})
	} catch (error) {
		throw error
	}
}

const deleteTask = (taskId: string) => async (dispatch: Dispatch<TypeDispatch>, getState: () => RootState) => {
	try {
		const { uid } = getState().auth
		await firebase.database().ref(`/users/${uid}/tasks/${taskId}`).remove()
	} catch (error) {
		throw error
	}
}

const editTask = ({ id, title, description, status }: IEditTask) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	try {
		const { uid } = getState().auth
		await firebase.database().ref(`/users/${uid}/tasks/${id}`).update({
			title,
			description,
			status
		})
	} catch (error) {
		throw error
	}
}

const loadTasks = () => async (dispatch: Dispatch<TypeDispatch>, getState: () => RootState) => {
	dispatch({ type: TASKS_LOADING })
	try {
		const { uid } = getState().auth
		await firebase
			.database()
			.ref(`/users/${uid}/tasks`)
			.on('value', async snapshot => {
				const data = await snapshot.val()
				const obj = {
					completed: [] as object[],
					unfulfilled: [] as object[]
				}
				for (const key in data) {
					let item: ITask = {
						id: key,
						title: data[key].title,
						description: data[key].description,
						status: data[key].status,
						create_date: data[key].create_date
					}
					data[key].status ? obj.completed.push(item) : obj.unfulfilled.push(item)
				}
				dispatch({ type: TASKS_LOADED, payload: obj })
			})
	} catch (error) {
		throw error
	}
}

export { createTask, deleteTask, editTask, loadTasks }
