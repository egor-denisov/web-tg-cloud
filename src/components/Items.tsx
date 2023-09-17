import React, { FC } from 'react'
import Directory from './Directory'
import File from './File'
import { useTypedSelector } from '../hooks/useTypedSelector'
type props = {
	setAboutData: Function
	setEditModal: Function
	setPreviewer: Function
}
const Items: FC<props> = ({ setAboutData, setEditModal, setPreviewer }) => {
	const { content } = useTypedSelector((state) => state.content)
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
					/>
				)
			})}
		</div>
	)
}

export default Items
