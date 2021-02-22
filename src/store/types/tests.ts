export interface ITestsState {
	tests: ITest[]
	isLoading: boolean
	test: {
		id: string
		title: string
		subject: string
		questions: question[]
	}
	showResult?: boolean
	result?: number
}

export interface question {
	q: string
	a_1: string
	a_2: string
	a_3: string
	a_4: string
	r_a: string
	[key: string]: string
}

export interface ICreateTest {
	title: string
	subject: string
	questions: question[]
}

export interface ITest {
	id: string
	title: string
	status: boolean
	subject: string
	questions: question[]
}

export type TestsAction = {
	type: string
	payload?: object[] | number
}

export type RouteParams = {
	id: string
}

export type TestFromFirebase = {
	[key: string]: {
		title: string
		status: boolean
		subject: string
		questions: question[]
	}
}

export type TUserTests = {
	[key: string]: {
		title: string,
		result: number
	}
}