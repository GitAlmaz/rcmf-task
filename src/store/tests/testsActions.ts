import { TESTS_LOADING, TESTS_LOADED } from '../types';
import create from '@ant-design/icons/lib/components/IconFont'
import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '..'
import { ITest, ICreateTest } from './testsReducer'

const createTest = ({ title, subject, questions }: ICreateTest) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: TESTS_LOADING })
	try {
		const { uid, user } = getState().auth
		if (user?.info.admin) {
			await firebase.database().ref('/tests').push({
				title,
				subject,
				questions
			})
			dispatch({ type: TESTS_LOADED })
		} else {
			throw new Error('access denied')
		}
	} catch (error) {
		throw error
	}
}

const loadTests = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState:() => RootState
) => {
	dispatch({ type: TESTS_LOADING })
	try {
		await firebase
			.database()
			.ref(`/tests`)
			.on('value', async snapshot => {
				const data = await snapshot.val()
				const arr = []
				for (const key in data) {
					let item: ITest = {
						id: key,
						title: data[key].title,
						status: data[key].status,
						subject: data[key].subject,
						questions: data[key].questions
					}
					arr.push(item)
				}
				dispatch({ type: TESTS_LOADED, payload: arr })
			})
	} catch (error) {
		throw error
	}
}

export { createTest, loadTests }
