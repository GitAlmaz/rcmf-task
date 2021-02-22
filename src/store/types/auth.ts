export type TUser = {
	email: string
	password: string
	name?: string
}

export interface IAuthState {
	token: string | null
	isAuth: boolean | null
	isLoading: boolean
	user: {
		info: {
			email: string
			name: string
			password: string,
			admin: boolean | null
		}
		tasks?: object[],
		tests?: object[]
	} | null
	uid: string | null
}

export type AuthAction = {
	type: string
	payload: {
		token: string
		uid: string
	}
}