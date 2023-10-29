import { Dispatch } from 'redux'
import axios from 'axios'
import { ContentAction, ContentActionTypes } from '../../types/contentTypes'
import { ContentType, DirectoryType, FileType } from '../../types'
import { iso2date } from '../../utils/helper'
import { SERVER } from '../../env'

export const fetchContent = (
	hash: string,
	user_id: number,
	directory_id = -1
) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		try {
			dispatch({ type: ContentActionTypes.FETCH_CONTENT })
			const response = await axios.get(`${SERVER}/available`, {
				params: {
					hash: hash,
					user_id: user_id,
					directory_id: directory_id
				}
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
						thumbnailSource: `${SERVER}/thumbnail?id=${f['id']}&hash=${hash}&user_id=${user_id}`,
						fileSource: `${SERVER}/file?id=${f['id']}&hash=${hash}&user_id=${user_id}`,
						sharedId: f['shared_id'],
						isShared: f['is_shared']
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

export const createDirectory = (hash: string, directory: DirectoryType) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/createDirectory`, {
				params: {
					hash: hash,
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
	hash: string,
	user_id: number,
	id: number,
	directory_id: number,
	newName: string,
	type: string
) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/edit`, {
				params: {
					hash: hash,
					user_id: user_id,
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

export const deleteItem = (
	hash: string,
	id: number,
	user_id: number,
	directory_id: number,
	type: string
) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/delete`, {
				params: {
					hash: hash,
					id: id,
					user_id: user_id,
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

export const addNewFile = (hash: string, user_id: number, id: number) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/fileInfo`, {
				params: {
					hash: hash,
					user_id: user_id,
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
						thumbnailSource: `${SERVER}/thumbnail?id=${response.data['id']}&hash=${hash}&user_id=${user_id}`,
						fileSource: `${SERVER}/file?id=${response.data['id']}&hash=${hash}&user_id=${user_id}`,
						sharedId: response.data['shared_id'],
						isShared: response.data['is_shared']
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
					payload: 'File was not uploaded'
				})
			})
	}
}

export const shareFile = (hash: string, id: number, user_id: number) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/share`, {
				params: {
					hash: hash,
					id: id,
					user_id: user_id
				}
			})
			.then((response) => {
				dispatch({
					type: ContentActionTypes.CHANGE_SHARING_FILE,
					payload: {
						id: id,
						isShared: true
					}
				})
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: 'File was successfully shared'
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

export const stopSharingFile = (hash: string, id: number, user_id: number) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/stopSharing`, {
				params: {
					hash: hash,
					id: id,
					user_id: user_id
				}
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.CHANGE_SHARING_FILE,
					payload: {
						id: id,
						isShared: false
					}
				})
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: 'File was successfully stoped sharing'
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

export const getFileInTelegram = (
	hash: string,
	id: number,
	user_id: number
) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		await axios
			.get(`${SERVER}/getInTelegram`, {
				params: {
					hash: hash,
					id: id,
					user_id: user_id
				}
			})
			.then(() => {
				dispatch({
					type: ContentActionTypes.SET_NOTIFICATION,
					payload: 'File was successfully sent'
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

export const setError = (err: string) => {
	return async (dispatch: Dispatch<ContentAction>) => {
		dispatch({
			type: ContentActionTypes.SET_ERROR,
			payload: err
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
