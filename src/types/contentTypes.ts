import { ContentType, DirectoryType, FileType } from '.'

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
	UPDATE_ITEM_NAME = 'UPDATE_ITEM_NAME',
	CREATE_DIRECTORY = 'CREATE_DIRECTORY',
	DELETE_ITEM = 'DELETE_ITEM',
	ADD_NEW_FILE = 'ADD_NEW_FILE',
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
interface UpdateItemNameAction {
	type: ContentActionTypes.UPDATE_ITEM_NAME
	payload: {
		id: number
		name: string
		type: string
	}
}
interface CreateDirectoryAction {
	type: ContentActionTypes.CREATE_DIRECTORY
	payload: DirectoryType
}
interface DeleteItemAction {
	type: ContentActionTypes.DELETE_ITEM
	payload: {
		id: number
		type: string
	}
}
interface AddNewFile {
	type: ContentActionTypes.ADD_NEW_FILE
	payload: FileType
}
interface SetErrorAction {
	type: ContentActionTypes.SET_ERROR
	payload: null | string
}
interface SetNotificationAction {
	type: ContentActionTypes.SET_NOTIFICATION
	payload: null | string
}

export type ContentAction =
	| FetchContentAction
	| FetchContentSuccessAction
	| FetchContentErrorAction
	| UpdateItemNameAction
	| CreateDirectoryAction
	| DeleteItemAction
	| AddNewFile
	| SetErrorAction
	| SetNotificationAction
