import { ContentType } from '.'

export interface ContentState {
	content: ContentType
	loading: boolean
	error: null | string
}

export enum ContentActionTypes {
	FETCH_CONTENT = 'FETCH_CONTENT',
	FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS',
	FETCH_CONTENT_ERROR = 'FETCH_CONTENT_ERROR'
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

export type ContentAction =
	| FetchContentAction
	| FetchContentSuccessAction
	| FetchContentErrorAction
