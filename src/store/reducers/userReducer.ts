import { DirectoryType } from '../../types'
import { UserAction, UserActionTypes, UserState } from '../../types/userTypes'

const initialState: UserState = {
	data: {
		id: -1,
		username: '',
		userId: -1,
		firstname: '',
		lastname: '',
		currentDirectoryId: -1
	},
	currentDirectory: <DirectoryType>{},
	loadingAuth: false,
	authorized: false,
	error: null
}

export const UserReducer = (
	state = initialState,
	action: UserAction
): UserState => {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER:
			return {
				...state,
				authorized: true,
				data: action.payload,
				loadingAuth: false
			}
		case UserActionTypes.START_LOGIN:
			return { ...state, loadingAuth: true }
		case UserActionTypes.UPDATE_USER:
			return { ...state, data: action.payload }
		case UserActionTypes.LOGOUT_USER:
			return initialState
		case UserActionTypes.CHANGE_DIRECTORY:
			return {
				...state,
				data: { ...state.data, currentDirectoryId: action.payload.id },
				currentDirectory: action.payload
			}
		case UserActionTypes.SET_ERROR:
			return { ...state, error: action.payload, loadingAuth: false }
		default:
			return state
	}
}
