import React, { FC } from 'react'
import { Button, Modal } from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
type props = {
	show: boolean
	id: number
	name: string
	type: 'file' | 'directory'
	onHide: (event: React.SyntheticEvent) => void
}

const DeleteModal: FC<props> = ({ show, id, name, type, onHide }) => {
	const { currentDirectory } = useTypedSelector((state) => state.user)
	const { deleteItem } = useActions()
	const deleteFunc = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		deleteItem(id, currentDirectory.id, type)
		onHide(e)
	}
	return (
		<Modal backdrop="static" open={show} onClose={onHide}>
			<Modal.Header>Delete item</Modal.Header>
			<Modal.Body>
				Do you really want to delete {type} "{name}" from "
				{currentDirectory.name}"?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={(e) => deleteFunc(e)} appearance="primary">
					Delete
				</Button>
				<Button onClick={onHide} appearance="subtle">
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteModal
