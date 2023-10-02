export type FileType = {
	id: number
	name: string
	fileId: string
	fileUniqueId: string
	fileSize: number
	type: string
	created: string
	thumbnailFileId: string
	thumbnailSource: string
	fileSource: string
	sharedId: string
	isShared: boolean
}

export type DirectoryType = {
	id: number
	parentId: number
	name: string
	userId: number
	files?: number[]
	directories?: number[]
	size?: number
	path?: string
	created?: string
}

export type ContentType = {
	files: FileType[]
	directories: DirectoryType[]
}
export type UserDataType = {
	id: number
	username: string
	userId: number
	firstname: string
	lastname: string
	currentDirectoryId: number
	hash: string
}
