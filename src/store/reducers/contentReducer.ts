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
		case ContentActionTypes.SET_ERROR:
			return { ...state, error: action.payload }
		case ContentActionTypes.SET_NOTIFICATION:
			return { ...state, notification: action.payload }
		default:
			return state
	}
}
