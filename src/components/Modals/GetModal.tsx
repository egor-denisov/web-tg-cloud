import React, { FC } from 'react'
import { Button, Modal } from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
type props = {
	show: boolean
	id: number
	name: string
	onHide: (event: React.SyntheticEvent) => void
}

const GetModal: FC<props> = ({ show, id, name, onHide }) => {
	const { data } = useTypedSelector((state) => state.user)
	const { getFileInTelegram } = useActions()
	const getFunc = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		getFileInTelegram(data.hash, id, data.userId)
		onHide(e)
	}
	return (
		<Modal backdrop="static" open={show} onClose={onHide}>
			<Modal.Header>Get file</Modal.Header>
			<Modal.Body>
				Do you really want to get "{name}" in Telegram @{data.username}?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={(e) => getFunc(e)} appearance="primary">
					Get file
				</Button>
				<Button onClick={onHide} appearance="subtle">
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default GetModal
