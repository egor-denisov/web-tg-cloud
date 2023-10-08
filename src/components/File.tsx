import React, { FC, useEffect } from 'react'
import { FileType } from '../types'
import FileText from '../svg/FileText'
import { makeNameShorter } from '../utils/helper'
import { Dropdown, Popover, Whisper } from 'rsuite'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'
import {
	InfoRound,
	ShareOutline,
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
	goShare: Function
}

const File: FC<props> = ({
	file,
	goPreview,
	goSave,
	goAbout,
	goRename,
	goDelete,
	goShare
}) => {
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	const onOpen = () => {
		let event = new CustomEvent('openNewMenu', {
			detail: 'file' + file.id
		})
		document.dispatchEvent(event)
	}
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
			case 4:
				goShare()
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
	useEffect(() => {
		document.addEventListener('openNewMenu', (e: any) => {
			if (e?.detail !== 'file' + file.id) ref.current?.close()
		})
	}, [])
	return (
		<Whisper
			placement="bottomStart"
			trigger="contextMenu"
			ref={ref}
			onOpen={onOpen}
			delayClose={0}
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
						<Dropdown.Item icon={<ShareOutline />} eventKey={4}>
							Share
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
					{file.thumbnailFileId.length === 0 ? (
						<FileText />
					) : (
						<img src={file.thumbnailSource} alt="" />
					)}
				</div>
				<div className="name">{makeNameShorter(file.name)}</div>
			</div>
		</Whisper>
	)
}

export default File
