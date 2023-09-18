import {
	ContentAction,
	ContentActionTypes,
	ContentState
} from '../../types/contentTypes'

const initialState: ContentState = {
	content: { files: [], directories: [] },
	loading: false,
	error: null,
	notification: null
}

export const ContentReducer = (
	state = initialState,
	action: ContentAction
): ContentState => {
	switch (action.type) {
		case ContentActionTypes.FETCH_CONTENT:
			return { ...state, loading: true }
		case ContentActionTypes.FETCH_CONTENT_SUCCESS:
			return { ...state, loading: false, content: action.payload }
		case ContentActionTypes.FETCH_CONTENT_ERROR:
			return { ...state, loading: false, error: action.payload }
		case ContentActionTypes.UPDATE_ITEM_NAME:
			var newContent = { ...state.content }
			if (action.payload.type === 'directory') {
				newContent.directories.forEach((el, i) => {
					if (el.id === action.payload.id) {
						newContent.directories[i].name = action.payload.name
						return { ...state, content: { ...newContent } }
					}
				})
			}
			newContent.files.forEach((el, i) => {
				if (el.id === action.payload.id) {
					newContent.files[i].name = action.payload.name
					return { ...state, content: { ...newContent } }
				}
			})
			return { ...state }
		case ContentActionTypes.CREATE_DIRECTORY:
			return {
				...state,
				content: {
					...state.content,
					directories: [...state.content.directories, action.payload]
				}
			}
		case ContentActionTypes.DELETE_ITEM:
			if (action.payload.type === 'directory') {
				return {
					...state,
					content: {
						...state.content,
						directories: state.content.directories.filter(
							(d) => d.id !== action.payload.id
						)
					}
				}
			}
			return {
				...state,
				content: {
					...state.content,
					files: state.content.files.filter(
						(f) => f.id !== action.payload.id
					)
				}
			}
		case ContentActionTypes.ADD_NEW_FILE:
			return {
				...state,
				content: {
					...state.content,
					files: [...state.content.files, action.payload]
				}
			}
		case ContentActionTypes.SET_ERROR:
			return { ...state, error: action.payload }
		case ContentActionTypes.SET_NOTIFICATION:
			return { ...state, notification: action.payload }
		default:
			return state
	}
}
