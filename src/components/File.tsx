import React, { FC, useState, useEffect } from 'react'
import { FileType } from '../types'
import PictureThumbnail from '../svg/PictureThumbnail'
import { makeNameShorter } from '../utils/helper'
import { Dropdown, Popover, Whisper } from 'rsuite'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'

type props = {
	file: FileType
	goPreview: Function
	goAbout: Function
	goRename: Function
}

const File: FC<props> = ({ file, goPreview, goAbout, goRename }) => {
	const [imageSrc, setImageSrc] = useState('')
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	useEffect(() => {
		const img = new Image()
		img.onload = () => {
			setImageSrc(file.thumbnailSource)
		}
		img.src = file.thumbnailSource
	}, [file.id])
	function handleSelectMenu(
		eventKey: string | undefined,
		event: React.SyntheticEvent<Element, Event>
	) {
		switch (Number(eventKey)) {
			case 1:
				goPreview()
				break
			case 2:
				goRename()
				break
			case 6:
				goAbout()
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
					<Dropdown.Menu onSelect={(k, e) => handleSelectMenu(k, e)}>
						<Dropdown.Item eventKey={1}>Open</Dropdown.Item>
						<Dropdown.Item eventKey={2}>Rename</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item eventKey={4}>Copy</Dropdown.Item>
						<Dropdown.Item eventKey={5}>Cut</Dropdown.Item>
						<Dropdown.Item eventKey={3}>Delete</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item eventKey={6}>About</Dropdown.Item>
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
