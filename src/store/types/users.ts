import { IFireBaseTask } from './tasks'
import { TUserTests } from './tests'

export interface IUsersState {
	users: IUser[]
	isLoading: boolean
}

export interface IUserInfo {
		admin: boolean
		email: string
		name: string
		password: string
}

export interface IUser {
	id: string
	info: IUserInfo
	tasks: IFireBaseTask[]
	tests: TUserTests[]
}

export type UsersAction = {
	type: string
	payload?: IUser[]
}

export type UsersFromFirebase = {
	[id: string]: {
		info: IUserInfo
		tasks: IFireBaseTask[]
		tests: TUserTests[]
	}
}
