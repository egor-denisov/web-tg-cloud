import React, { FC, useState, useEffect } from 'react'
import { FileType } from '../types'
import PictureThumbnail from '../svg/PictureThumbnail'
import { makeNameShorter } from '../utils/helper'
import { Dropdown, Popover, Whisper } from 'rsuite'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'
import {
	InfoRound,
	Copy,
	Edit,
	Trash,
	Detail,
	FileDownload
} from '@rsuite/icons/'
type props = {
	file: FileType
	goPreview: Function
	goSave: Function
	goAbout: Function
	goRename: Function
	goDelete: Function
}

const File: FC<props> = ({
	file,
	goPreview,
	goSave,
	goAbout,
	goRename,
	goDelete
}) => {
	const [imageSrc, setImageSrc] = useState('')
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	useEffect(() => {
		const img = new Image()
		img.onload = () => {
			setImageSrc(file.thumbnailSource)
		}
		img.src = file.thumbnailSource
	}, [file.id])
	const handleSelectMenu = (eventKey: string | undefined) => {
		switch (Number(eventKey)) {
			case 1:
				goPreview()
				break
			case 2:
				goSave()
				break
			case 3:
				goRename()
				break
			case 5:
				goDelete()
				break
			case 6:
				goAbout()
				break
		}
		ref.current?.close()
	}
	return (
		<Whisper
			placement="bottomStart"
			trigger="contextMenu"
			ref={ref}
			speaker={
				<Popover full style={{ minWidth: '250px' }}>
					<Dropdown.Menu onSelect={handleSelectMenu}>
						<Dropdown.Item icon={<Detail />} eventKey={1}>
							Open
						</Dropdown.Item>
						<Dropdown.Item icon={<FileDownload />} eventKey={2}>
							Save
						</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item icon={<Edit />} eventKey={3}>
							Rename
						</Dropdown.Item>
						<Dropdown.Item icon={<Copy />} eventKey={4}>
							Copy
						</Dropdown.Item>
						<Dropdown.Item icon={<Trash />} eventKey={5}>
							Delete
						</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item icon={<InfoRound />} eventKey={6}>
							About
						</Dropdown.Item>
					</Dropdown.Menu>
				</Popover>
			}
		>
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
		</Whisper>
	)
}

export default File
