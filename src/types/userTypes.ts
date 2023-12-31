import { DirectoryType, UserDataType } from '.'

export type UserState = {
	data: UserDataType
	currentDirectory: DirectoryType
	loadingAuth: boolean
	authorized: boolean
	error: null | string
}

export enum UserActionTypes {
	LOGIN_USER = 'LOGIN_USER',
	START_LOGIN = 'START_LOGIN',
	UPDATE_USER = 'UPDATE_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	CHANGE_DIRECTORY = 'CHANGE_DIRECTORY',
	SET_ERROR = 'SET_ERROR'
}
interface LoginUser {
	type: UserActionTypes.LOGIN_USER
	payload: UserDataType
}
interface StartLoginUser {
	type: UserActionTypes.START_LOGIN
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
	payload: DirectoryType
}
interface SetError {
	type: UserActionTypes.SET_ERROR
	payload: null | string
}

export type UserAction =
	| LoginUser
	| StartLoginUser
	| LogoutUser
	| UpdateUser
	| ChangeDirectory
	| SetError
