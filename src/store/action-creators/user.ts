import { Dispatch } from 'redux'
import axios from 'axios'
import { UserAction, UserActionTypes } from '../../types/userTypes'
import { DirectoryType, UserDataType } from '../../types'
import { iso2date } from '../../utils/helper'

export const login = (
	user_id: string | null,
	username: string | null,
	firstName: string | null,
	lastName: string | null
) => {
	return async (dispatch: Dispatch<UserAction>) => {
		dispatch({
			type: UserActionTypes.START_LOGIN
		})
		await axios
			.get('http://localhost:8080/auth', {
				params: {
					user_id: user_id,
					username: username,
					first_name: firstName,
					last_name: lastName
				}
			})
			.then((response) => {
				dispatch({
					type: UserActionTypes.LOGIN_USER,
					payload: <UserDataType>{
						id: response.data['id'],
						username: response.data['username'],
						userId: response.data['user_id'],
						firstname: response.data['firstname'],
						lastname: response.data['lastname'],
						currentDirectoryId: response.data['current_directory']
					}
				})
				return response
			})
			.then((response) => {
				var f = changeDirectory(response.data['current_directory'])
				f(dispatch)
			})
			.catch((e) => {
				dispatch({
					type: UserActionTypes.SET_ERROR,
					payload: 'Error with user login' + e
				})
			})
	}
}
export const changeDirectory = (id: number) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const response = await axios.get(
				'http://localhost:8080/directory',
				{
					params: { id: id }
				}
			)
			var d = response.data
			dispatch({
				type: UserActionTypes.CHANGE_DIRECTORY,
				payload: <DirectoryType>{
					id: d['id'],
					parentId: d['parent_id'],
					name: d['name'],
					userId: d['user_id'],
					files: d['files'],
					directories: d['directories'],
					size: d['size'],
					path: d['path'],
					created: iso2date(d['created'])
				}
			})
		} catch (e) {
			dispatch({
				type: UserActionTypes.SET_ERROR,
				payload: String(e)
			})
		}
	}
}
