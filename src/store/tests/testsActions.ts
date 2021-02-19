import { Type } from '../types'
import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '../types'
import { ITest, ICreateTest, TestFromFirebase } from '../types/tests'

const addIdToTests = (data: TestFromFirebase) => {
	const arr = [] as ITest[]
	for (const key in data) {
		const item: ITest = {
			id: key,
			title: data[key].title,
			status: data[key].status,
			subject: data[key].subject,
			questions: data[key].questions
		}
		arr.push(item)
	}
	return arr
}

const createTest = ({ title, subject, questions }: ICreateTest) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.TESTS_LOADING })
	try {
		const admin = getState().auth.user?.info.admin
		if (admin) {
			await firebase.database().ref('/tests/').push({
				title,
				subject,
				questions,
				status: false
			})
			await firebase
				.database()
				.ref(`/tests`)
				.on('value', async snapshot => {
					const data = await snapshot.val()
					const arr = addIdToTests(data)
					dispatch({ type: Type.TESTS_LOADED, payload: arr })
				})
		} else {
			throw new Error('access denied')
		}
	} catch (error) {
		dispatch({ type: Type.TESTS_FAIL })
		throw error
	}
}

const deleteTest = (id: string) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.TESTS_LOADING })
	try {
		await firebase.database().ref(`/tests/${id}`).remove()
		const { tests } = getState().tests
		const filteredArr = tests.filter(it => it.id !== id)
		dispatch({ type: Type.TESTS_LOADED, payload: filteredArr })
	} catch (error) {
		dispatch({ type: Type.TESTS_FAIL })
		throw error
	}
}

const getTest = (id: string) => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.TESTS_LOADING })
	try {
		await firebase
			.database()
			.ref(`/tests/${id}`)
			.on('value', snapshot => {
				const data = snapshot.val()
				dispatch({ type: Type.TEST_LOADED, payload: data })
			})
	} catch (error) {
		dispatch({ type: Type.TESTS_FAIL })
		throw error
	}
}

const loadTests = () => async (
	dispatch: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispatch({ type: Type.TESTS_LOADING })
	try {
		const isAdmin = getState().auth.user?.info.admin
		await firebase
			.database()
			.ref('/tests')
			.on('value', async snapshot => {
				const data = await snapshot.val()
				const arr = addIdToTests(data)
				dispatch({ type: Type.TESTS_LOADED, payload: arr })
			})
	} catch (error) {
		throw error
	}
}

const finishTest = (data: any) => async (
	dispath: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	dispath({ type: Type.TEST_LOADING })
	try {
		const { test } = getState().tests
		console.log(data)
		test.questions.map(data => {})
		// await firebase.database().ref(`/tests/${testId}`).on('value', snapshot => {
		// 	const test = snapshot.val()
		// 	console.log(test)
		// })
	} catch (error) {
		dispath({ type: Type.TESTS_FAIL })
		throw error
	}
}

export { createTest, deleteTest, loadTests, getTest, finishTest }
