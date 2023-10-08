import React, { FC, useEffect } from 'react'
import { DirectoryType } from '../types'
import { makeNameShorter } from '../utils/helper'
import FolderSVG from '../svg/Folder'
import { useActions } from '../hooks/useActions'
import { Dropdown, Popover, Whisper } from 'rsuite'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'
import {
	InfoRound,
	Copy,
	Edit,
	Trash,
	FolderFill,
	FileDownload
} from '@rsuite/icons/'
import { useTypedSelector } from '../hooks/useTypedSelector'
type props = {
	directory: DirectoryType
	goAbout: Function
	goRename: Function
	goDelete: Function
}

const Directory: FC<props> = ({ directory, goAbout, goRename, goDelete }) => {
	const { changeDirectory } = useActions()
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	const { data } = useTypedSelector((state) => state.user)
	const onOpen = () => {
		let event = new CustomEvent('openNewMenu', {
			detail: 'directory' + directory.id
		})
		document.dispatchEvent(event)
	}
	const handleSelectMenu = (eventKey: string | undefined) => {
		switch (Number(eventKey)) {
			case 1:
				changeDirectory(data.hash, directory.id)
				break
			case 3:
				goRename()
				break
			case 4:
				goDelete()
				break
			case 5:
				goAbout()
				break
		}
		ref.current?.close()
	}
	useEffect(() => {
		document.addEventListener('openNewMenu', (e: any) => {
			if (e?.detail !== 'directory' + directory.id) ref.current?.close()
		})
	}, [])
	return (
		<Whisper
			placement="bottomStart"
			trigger="contextMenu"
			disabled={directory.name === '../'}
			onContextMenu={(e) => {
				e.preventDefault()
			}}
			onOpen={onOpen}
			ref={ref}
			delayClose={0}
			speaker={
				<Popover full style={{ minWidth: '250px' }}>
					<Dropdown.Menu onSelect={handleSelectMenu}>
						<Dropdown.Item icon={<FolderFill />} eventKey={1}>
							Open
						</Dropdown.Item>
						<Dropdown.Item
							icon={<FileDownload />}
							eventKey={2}
							disabled
						>
							Save
						</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item icon={<Edit />} eventKey={3}>
							Rename
						</Dropdown.Item>
						<Dropdown.Item icon={<Trash />} eventKey={4}>
							Delete
						</Dropdown.Item>
						<hr style={{ margin: '0px' }} />
						<Dropdown.Item icon={<InfoRound />} eventKey={5}>
							About
						</Dropdown.Item>
					</Dropdown.Menu>
				</Popover>
			}
		>
			<div
				className="item directory"
				title={directory.name}
				onClick={() => changeDirectory(data.hash, directory.id)}
			>
				<div className="thumbnail">
					<FolderSVG />
				</div>
				<div className="name">{makeNameShorter(directory.name)}</div>
			</div>
		</Whisper>
	)
}

export default Directory
