import React, { FC, useState, useEffect } from 'react'
import { DirectoryType } from '../types'
import PictureThumbnail from '../svg/PictureThumbnail'
import { makeNameShorter } from '../utils/helper'
import FolderSVG from '../svg/Folder'

type props = {
	directory: DirectoryType
}

const Directory: FC<props> = ({ directory }) => {
	return (
		<div className="item directory" title={directory.name}>
			<div className="thumbnail">
				<FolderSVG />
			</div>
			<div className="name">{makeNameShorter(directory.name)}</div>
		</div>
	)
}

export default Directory
