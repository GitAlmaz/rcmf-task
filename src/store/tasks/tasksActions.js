import firebase from 'firebase/app'
import { TASKS_LOADING, TASKS_LOADED, TASKS_FAIL } from '../types'

const createTask = ({ title, description, status, create_date }) => async (dispatch, getState) => {
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

const deleteTask = (taskId) => async (dispatch, getState) => {
	try {
		const { uid } = getState().auth
		await firebase.database().ref(`/users/${uid}/tasks/${taskId}`).remove()
	} catch (error) {
		throw error
	}
}

const editTask = ({id, title, description, status}) => async (dispatch, getState) => {
	try {
		const { uid } = getState().auth
		await firebase.database().ref(`/users/${uid}/tasks/${id}`).update({
			title,
			description,
			status
		})
	} catch(error) {
		throw error
	}
}

const loadTasks = () => async dispatch => {
	dispatch({ type: TASKS_LOADING })
	try {
		const { uid } = await firebase.auth().currentUser
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
