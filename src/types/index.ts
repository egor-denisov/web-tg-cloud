export type FileType = {
	id: number
	name: string
	fileId: string
	fileUniqueId: string
	fileSize: number
	thumbnailFileId: string
	thumbnailSource: string
	fileSource: string
}

export type DirectoryType = {
	id: number
	parentId: number
	name: string
	userId: number
	files: number[]
	directories: number[]
	size: number
}

export type ContentType = {
	files: FileType[]
	directories: DirectoryType[]
}
