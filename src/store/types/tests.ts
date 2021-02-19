
export interface question {
	q: string
	a_1: string
	a_2: string
	a_3: string
	a_4: string
	r_a: string
}

export interface ICreateTest {
	title: string
	subject: string
	questions: question[]
}

export interface ITestsState {
	tests: ITest[]
	isLoading: boolean
	test: {
		title: string
		subject: string
		questions: question[]
	}
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
	payload?: object[]
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