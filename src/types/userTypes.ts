import { UserDataType } from '.'

export type UserState = {
	data: UserDataType
	authorized: boolean
	error: null | string
}

export enum UserActionTypes {
	LOGIN_USER = 'LOGIN_USER',
	REGISTER_USER = 'REGISTER_USER',
	UPDATE_USER = 'UPDATE_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	CHANGE_DIRECTORY = 'CHANGE_DIRECTORY',
	SET_ERROR = 'SET_ERROR'
}
interface LoginUser {
	type: UserActionTypes.LOGIN_USER
	payload: UserDataType
}
interface RegisterUser {
	type: UserActionTypes.REGISTER_USER
	payload: UserDataType
}
interface UpdateUser {
	type: UserActionTypes.UPDATE_USER
	payload: UserDataType
}
interface LogoutUser {
	type: UserActionTypes.LOGOUT_USER
}
interface ChangeDirectory {
	type: UserActionTypes.CHANGE_DIRECTORY
	payload: number
}
interface SetError {
	type: UserActionTypes.SET_ERROR
	payload: string
}

export type UserAction =
	| LoginUser
	| RegisterUser
	| LogoutUser
	| UpdateUser
	| ChangeDirectory
	| SetError
