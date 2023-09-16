import React, { FC } from 'react'
import { DirectoryType } from '../types'
import { makeNameShorter } from '../utils/helper'
import FolderSVG from '../svg/Folder'
import { useActions } from '../hooks/useActions'
import { Dropdown, Popover, Whisper } from 'rsuite'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'

type props = {
	directory: DirectoryType
	goAbout: Function
	goRename: Function
}

const Directory: FC<props> = ({ directory, goAbout, goRename }) => {
	const { changeDirectory } = useActions()
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	function handleSelectMenu(
		eventKey: string | undefined,
		event: React.SyntheticEvent<Element, Event>
	) {
		switch (Number(eventKey)) {
			case 1:
				changeDirectory(directory.id)
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
				className="item directory"
				title={directory.name}
				onClick={() => changeDirectory(directory.id)}
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
