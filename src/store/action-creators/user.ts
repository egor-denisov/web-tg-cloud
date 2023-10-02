import { Dispatch } from 'redux'
import axios from 'axios'
import { UserAction, UserActionTypes } from '../../types/userTypes'
import { DirectoryType, UserDataType } from '../../types'
import { iso2date } from '../../utils/helper'
import { SERVER } from '../../env'

export const login = (
	user_id: string | null,
	username: string | null,
	firstName: string | null,
	lastName: string | null
) => {
	return async (dispatch: Dispatch<UserAction>) => {
		if (user_id === null || user_id === 'undefined') {
			return
		}
		dispatch({
			type: UserActionTypes.START_LOGIN
		})
		await axios
			.get(`${SERVER}/auth`, {
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
					payload: {
						id: response.data['id'],
						username: response.data['username'],
						userId: response.data['user_id'],
						firstname: response.data['firstname'],
						lastname: response.data['lastname'],
						currentDirectoryId: response.data['current_directory'],
						hash: response.data['hash']
					} as UserDataType
				})
				return response
			})
			.then((response) => {
				var f = changeDirectory(
					response.data['hash'],
					response.data['current_directory']
				)
				//Number(localStorage.getItem('current_directory')) ?? response.data['current_directory']
				f(dispatch)
			})
			.catch((e) => {
				dispatch({
					type: UserActionTypes.SET_ERROR,
					payload: "Couldn't log in. Try again"
				})
			})
	}
}
export const changeDirectory = (hash: string, id: number) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const response = await axios.get(`${SERVER}/directory`, {
				params: { hash: hash, id: id }
			})
			var d = response.data
			dispatch({
				type: UserActionTypes.CHANGE_DIRECTORY,
				payload: {
					id: d['id'],
					parentId: d['parent_id'],
					name: d['name'],
					userId: d['user_id'],
					files: d['files'],
					directories: d['directories'],
					size: d['size'],
					path: d['path'],
					created: iso2date(d['created'])
				} as DirectoryType
			})
			localStorage.setItem('current_directory', d['id'])
		} catch (e) {
			dispatch({
				type: UserActionTypes.SET_ERROR,
				payload: String(e)
			})
		}
	}
}
