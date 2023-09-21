import React, { FC } from 'react'
import { Drawer } from 'rsuite'
import { formatBytes } from '../../utils/helper'

type props = {
	show: boolean
	onHide: (event: React.SyntheticEvent) => void
	data: {
		name?: string
		path?: string
		type?: string
		size?: number
		created?: string
		includes?: {
			files: number
			directories: number
		}
	}
}

const AboutModal: FC<props> = ({ show, onHide, data }) => {
	return (
		<div className="modal">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>About</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<p>Name: {data.name}</p>
					<p>Path: {data.path}</p>
					<p>Type: {data.type}</p>
					<p>Size: {formatBytes(data.size ?? 0)}</p>
					<p>Created: {data.created}</p>
					{data.type === 'directory' && (
						<>
							<p>Files: {data.includes?.files}</p>
							<p>Directories: {data.includes?.directories}</p>
						</>
					)}
				</Drawer.Body>
			</Drawer>
		</div>
	)
}

export default AboutModal
