import { Dispatch } from 'redux'
import axios from 'axios'
import { ContentAction, ContentActionTypes } from '../../types/contentTypes'
import { ContentType, DirectoryType, FileType } from '../../types'
import { iso2date } from '../../utils/helper'
import { SERVER } from '../../env'

export const fetchContent = (user_id: number, directory_id = -1) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		try {
			dispatch({ type: ContentActionTypes.FETCH_CONTENT })
			const response = await axios.get(`${SERVER}/available`, {
				params: { user_id: user_id, directory_id: directory_id }
			})
			let res: ContentType = { files: [], directories: [] }
			if (response.data['files'] !== null) {
				res.files = response.data['files'].map((f: any) => {
					return {
						id: f['id'],
						name: f['name'],
						fileId: f['file_id'],
						fileUniqueId: f['file_unique_id'],
						fileSize: f['file_size'],
						type: f['file_type'],
						created: iso2date(f['created']),
						thumbnailFileId: f['thumbnail_file_id'],
						thumbnailSource: `${SERVER}/thumbnail?id=${f['id']}`,
						fileSource: `${SERVER}/file?id=${f['id']}`
					} as FileType
				})
			}

			if (response.data['directories'] !== null) {
				res.directories = response.data['directories'].map((d: any) => {
					return {
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
			}
			dispatch({
				type: ContentActionTypes.FETCH_CONTENT_SUCCESS,
				payload: res
			})
		} catch (e) {
			dispatch({
				type: ContentActionTypes.FETCH_CONTENT_ERROR,
				payload: 'Error fetching content' + e
			})
		}
	}
}

export const createDirectory = (directory: DirectoryType) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/createDirectory`, {
				params: {
					directory: JSON.stringify({
						...directory,
						user_id: directory.userId,
						parent_id: directory.parentId
					})
				}
			})
			.then((response) => {
				dispatch({
					type: ContentActionTypes.CREATE_DIRECTORY,
					payload: { ...directory, id: response.data['id'] ?? -1 }
				})
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: 'Directory is successfully created'
				})
			})
			.catch(({ response }) => {
				dispatch({
					type: ContentActionTypes.SET_ERROR,
					payload: response.data
				})
			})
	}
}

export const editItem = (
	id: number,
	directory_id: number,
	newName: string,
	type: string
) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/edit`, {
				params: {
					id: id,
					directory_id: directory_id,
					name: newName,
					type: type
				}
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.UPDATE_ITEM_NAME,
					payload: {
						id: id,
						name: newName,
						type: type
					}
				})
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: 'Name was successfully edited'
				})
			})
			.catch((err) => {
				dispatch({
					type: ContentActionTypes.SET_ERROR,
					payload: err.response?.data
				})
			})
	}
}

export const deleteItem = (id: number, directory_id: number, type: string) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/delete`, {
				params: {
					id: id,
					directory_id: directory_id,
					type: type
				}
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.DELETE_ITEM,
					payload: {
						id: id,
						type: type
					}
				})
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: type + ' was successfully deleted'
				})
			})
			.catch((err) => {
				dispatch({
					type: ContentActionTypes.SET_ERROR,
					payload: err.response?.data
				})
			})
	}
}

export const addNewFile = (id: number) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/fileInfo`, {
				params: {
					id: id
				}
			})
			.then((response) => {
				dispatch({
					type: ContentActionTypes.ADD_NEW_FILE,
					payload: {
						id: response.data['id'],
						name: response.data['name'],
						fileId: response.data['file_id'],
						fileUniqueId: response.data['file_unique_id'],
						fileSize: response.data['file_size'],
						type: response.data['file_type'],
						created: iso2date(response.data['created']),
						thumbnailFileId: response.data['thumbnail_file_id'],
						thumbnailSource: `${SERVER}/thumbnail?id=${response.data['id']}`,
						fileSource: `${SERVER}/file?id=${response.data['id']}`
					} as FileType
				})
				return response.data['name']
			})
			.then((name) => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: name + ' was successfully uploaded'
				})
			})
			.catch((err) => {
				dispatch({
					type: ContentActionTypes.SET_ERROR,
					payload: err.response?.data
				})
			})
	}
}

export const clearError = () => {
	return async (dispatch: Dispatch<ContentAction>) => {
		dispatch({
			type: ContentActionTypes.SET_ERROR,
			payload: null
		})
	}
}

export const clearNotification = () => {
	return async (dispatch: Dispatch<ContentAction>) => {
		dispatch({
			type: ContentActionTypes.SET_NOTIFICATION,
			payload: null
		})
	}
}
