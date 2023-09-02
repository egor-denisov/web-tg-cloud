import React, { FC, useState, useEffect } from 'react'
import { FileType } from '../types'
import PictureThumbnail from '../svg/PictureThumbnail'
import { makeNameShorter } from '../utils/helper'

type props = {
	file: FileType
	goPreview: Function
}

const File: FC<props> = ({ file, goPreview }) => {
	const [imageSrc, setImageSrc] = useState('')
	useEffect(() => {
		const img = new Image()
		img.onload = () => {
			setImageSrc(file.thumbnailSource)
		}
		img.src = file.thumbnailSource
	}, [file.id])
	return (
		<div
			className="item file"
			title={file.name}
			onClick={() => goPreview()}
		>
			<div className="thumbnail">
				{imageSrc.length === 0 ? (
					<PictureThumbnail />
				) : (
					<img src={imageSrc} alt="" />
				)}
			</div>
			<div className="name">{makeNameShorter(file.name)}</div>
		</div>
	)
}

export default File
