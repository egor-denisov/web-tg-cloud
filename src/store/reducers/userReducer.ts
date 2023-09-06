import { UserAction, UserActionTypes, UserState } from '../../types/userTypes'

const initialState: UserState = {
	data: {
		id: -1,
		username: '',
		userId: -1,
		firstname: '',
		lastname: '',
		currentDirectory: -1
	},
	authorized: false,
	error: null
}

export const UserReducer = (
	state = initialState,
	action: UserAction
): UserState => {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER:
			return { ...state, authorized: true, data: action.payload }
		case UserActionTypes.REGISTER_USER:
			return { ...state, authorized: true, data: action.payload }
		case UserActionTypes.UPDATE_USER:
			return { ...state, data: action.payload }
		case UserActionTypes.LOGOUT_USER:
			return initialState
		case UserActionTypes.CHANGE_DIRECTORY:
			return {
				...state,
				data: { ...state.data, currentDirectory: action.payload }
			}
		case UserActionTypes.SET_ERROR:
			return { ...state, error: action.payload }
		default:
			return state
	}
}
