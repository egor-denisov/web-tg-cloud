import { FC } from 'react'
import Directory from './Directory'
import File from './File'
import { ContentType } from '../types'
type props = {
	content: ContentType
	setAboutData: Function
	setEditModal: Function
	setPreviewer: Function
	setDeleteModal: Function
	setShareModal: Function
	setGetModal: Function
}
const Items: FC<props> = ({
	content,
	setAboutData,
	setEditModal,
	setPreviewer,
	setDeleteModal,
	setShareModal,
	setGetModal
}) => {
	return (
		<div className="items">
			{content.directories.map((directory, index) => {
				return (
					<Directory
						directory={directory}
						key={directory.id}
						goAbout={() => setAboutData(index, 'directory')}
						goRename={() =>
							setEditModal({
								visible: true,
								item: directory,
								type: 'directory'
							})
						}
						goDelete={() =>
							setDeleteModal({
								visible: true,
								id: directory.id,
								name: directory.name,
								type: 'directory'
							})
						}
					/>
				)
			})}
			{content.files.map((file, index) => {
				return (
					<File
						file={file}
						key={file.fileUniqueId}
						goPreview={() =>
							setPreviewer({
								visible: true,
								fileIndex: index
							})
						}
						goSave={() => {
							window.location.replace(file.fileSource)
						}}
						goAbout={() => setAboutData(index, 'file')}
						goRename={() =>
							setEditModal({
								visible: true,
								item: file,
								type: 'file'
							})
						}
						goDelete={() =>
							setDeleteModal({
								visible: true,
								id: file.id,
								name: file.name,
								type: 'file'
							})
						}
						goShare={() =>
							setShareModal({
								visible: true,
								id: file.id,
								name: file.name,
								sharedId: file.sharedId,
								isShared: file.isShared
							})
						}
						goGet={() =>
							setGetModal({
								visible: true,
								id: file.id,
								name: file.name
							})
						}
					/>
				)
			})}
		</div>
	)
}

export default Items
