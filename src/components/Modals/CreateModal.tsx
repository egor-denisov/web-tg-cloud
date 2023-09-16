import React, { FC, useState } from 'react'
import { Button, Container, Drawer, Input } from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { DirectoryType } from '../../types'
import { useActions } from '../../hooks/useActions'

type props = {
	show: boolean
	onHide: (event: React.SyntheticEvent) => void
}

const CreateModal: FC<props> = ({ show, onHide }) => {
	const { data } = useTypedSelector((state) => state.user)
	const { createDirectory } = useActions()
	const [name, setName] = useState('')
	const create = () => {
		const d: DirectoryType = {
			id: -1,
			parentId: data.currentDirectoryId,
			name: name,
			userId: data.userId
		}
		createDirectory(d)
	}
	return (
		<div className="modal">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>Create new folder</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<p>Write name:</p>
					<Input
						placeholder="Folder name"
						style={{ margin: '20px 0px' }}
						value={name}
						onChange={(e) => setName(e)}
						onPressEnter={(e) => {
							create()
							onHide(e)
						}}
						autoFocus
					/>
					<Container
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'flex-end'
						}}
					>
						<Button
							onClick={(e) => {
								create()
								onHide(e)
							}}
							appearance="primary"
						>
							Create
						</Button>
						<Button onClick={onHide} appearance="subtle">
							Cancel
						</Button>
					</Container>
				</Drawer.Body>
			</Drawer>
		</div>
	)
}

export default CreateModal
