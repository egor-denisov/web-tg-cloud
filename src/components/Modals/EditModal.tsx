import React, { FC, useState, useEffect } from 'react'
import { Button, Container, Drawer, Input } from 'rsuite'
import { useActions } from '../../hooks/useActions'
import { DirectoryType, FileType } from '../../types'

type props = {
	show: boolean
	item: FileType | DirectoryType
	type: 'file' | 'directory'
	onHide: (event: React.SyntheticEvent) => void
}

const EditModal: FC<props> = ({ show, item, type, onHide }) => {
	const [name, setName] = useState('')
	const { editItem } = useActions()
	const edit = () => {
		if (name !== item.name) {
			editItem(item.id, name, type)
		}
	}
	useEffect(() => {
		if (item?.name) setName(item?.name)
	}, [item.name])
	return (
		<div className="modal">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>Edit folder</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<p>Write new name:</p>
					<Input
						placeholder="New name"
						style={{ margin: '20px 0px' }}
						value={name}
						onChange={setName}
						onPressEnter={(e) => {
							edit()
							onHide(e)
						}}
						onFocus={(e) => e.target.select()}
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
								edit()
								onHide(e)
							}}
							appearance="primary"
						>
							Edit
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

export default EditModal
