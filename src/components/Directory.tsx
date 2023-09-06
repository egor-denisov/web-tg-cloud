import React, { FC } from 'react'
import { DirectoryType } from '../types'
import { makeNameShorter } from '../utils/helper'
import FolderSVG from '../svg/Folder'
import { useActions } from '../hooks/useActions'

type props = {
	directory: DirectoryType
}

const Directory: FC<props> = ({ directory }) => {
	const { changeDirectory } = useActions()
	return (
		<div
			className="item directory"
			title={directory.name}
			onClick={() => changeDirectory(directory.id)}
		>
			<div className="thumbnail">
				<FolderSVG />
			</div>
			<div className="name">{makeNameShorter(directory.name)}</div>
		</div>
	)
}

export default Directory
