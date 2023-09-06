import { ContentType, DirectoryType } from '.'

export interface ContentState {
	content: ContentType
	loading: boolean
	error: null | string
	notification: null | string
}

export enum ContentActionTypes {
	FETCH_CONTENT = 'FETCH_CONTENT',
	FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS',
	FETCH_CONTENT_ERROR = 'FETCH_CONTENT_ERROR',
	SET_ERROR = 'SET_ERROR',
	SET_NOTIFICATION = 'SET_NOTIFICATION'
}
interface FetchContentAction {
	type: ContentActionTypes.FETCH_CONTENT
}
interface FetchContentSuccessAction {
	type: ContentActionTypes.FETCH_CONTENT_SUCCESS
	payload: ContentType
}
interface FetchContentErrorAction {
	type: ContentActionTypes.FETCH_CONTENT_ERROR
	payload: string
}
interface SetErrorAction {
	type: ContentActionTypes.SET_ERROR
	payload: string
}
interface SetNotificationAction {
	type: ContentActionTypes.SET_NOTIFICATION
	payload: string
}

export type ContentAction =
	| FetchContentAction
	| FetchContentSuccessAction
	| FetchContentErrorAction
	| SetErrorAction
	| SetNotificationAction
