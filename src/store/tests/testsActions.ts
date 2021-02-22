import { Type } from '../types'
import firebase from 'firebase/app'
import { Dispatch } from 'react'
import { RootState, TypeDispatch } from '../types'
import { ITest, ICreateTest, TestFromFirebase } from '../types/tests'
import { parseData } from '../../utils/utils'

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
			firebase
				.database()
				.ref(`/tests`)
				.on('value', async snapshot => {
					const data = await snapshot.val()
					const arr = parseData(data)
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
		let data
		firebase
			.database()
			.ref(`/tests/${id}`)
			.on('value', snapshot => {
				data = snapshot.val()
				dispatch({ type: Type.TEST_LOADED, payload: { ...data, id } })
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
		firebase
			.database()
			.ref('/tests')
			.on('value', async (snapshot) => {
				const data = await snapshot.val()
				const arr = parseData(data)
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
		const { uid } = getState().auth
		const { test } = getState().tests
		let countOfRights = 0
		test.questions.map((it, idx) => {
			const r_a = it.r_a
			if (data[idx] === it[r_a]) {
				countOfRights++
			}
		})
		const result = Math.floor(countOfRights / test.questions.length * 100)
		await firebase.database().ref(`/users/${uid}/tests/${test.id}`).set({
			title: test.title,
			result
		})
		dispath({ type: Type.TEST_FINISHED, payload: result })
	} catch (error) {
		dispath({ type: Type.TESTS_FAIL })
		throw error
	}
}

const resetTest = () => async (
	dispath: Dispatch<TypeDispatch>,
	getState: () => RootState
) => {
	try {
		dispath({ type: Type.TEST_RESET })
	} catch (error) {
		dispath({ type: Type.TESTS_FAIL })
		throw error
	}
}

export { createTest, deleteTest, loadTests, getTest, finishTest, resetTest }
