import { Dispatch } from 'redux'
import axios from 'axios'
import { UserAction, UserActionTypes } from '../../types/userTypes'
import { DirectoryType, UserDataType } from '../../types'

export const login = () => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const response = await axios.get('http://localhost:8080/auth', {
				params: { user_id: 694916310 }
			})

			dispatch({
				type: UserActionTypes.LOGIN_USER,
				payload: <UserDataType>{
					id: response.data['id'],
					username: response.data['username'],
					userId: response.data['user_id'],
					firstname: response.data['firstname'],
					lastname: response.data['lastname'],
					currentDirectory: response.data['current_directory']
				}
			})
		} catch (e) {
			dispatch({
				type: UserActionTypes.SET_ERROR,
				payload: 'Error with user login' + e
			})
		}
	}
}
export const changeDirectory = (id: number) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			dispatch({
				type: UserActionTypes.CHANGE_DIRECTORY,
				payload: id
			})
		} catch (e) {
			dispatch({
				type: UserActionTypes.SET_ERROR,
				payload: String(e)
			})
		}
	}
}
