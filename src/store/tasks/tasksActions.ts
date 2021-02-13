import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '..'
import { TASKS_LOADING, TASKS_LOADED } from '../types'

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

const createTask = ({
	title,
	description,
	status,
	create_date
}: ICreateTask) => async (
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

const deleteTask = (taskId: string) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
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

const loadTasks = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: TASKS_LOADING })
	try {
		const { uid } = getState().auth
		await firebase
			.database()
			.ref(`/users/${uid}/tasks`)
			.on('value', async snapshot => {
				const data = await snapshot.val()
				dispatch({ type: TASKS_LOADED, payload: data })
			})
	} catch (error) {
		throw error
	}
}

export { createTask, deleteTask, editTask, loadTasks }
