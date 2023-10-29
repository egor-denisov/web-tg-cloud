import React, { useState, useEffect } from 'react'
import { Button, Modal, Popover, Stack, Whisper } from 'rsuite'
import User from '../svg/User'
import { OverlayTriggerHandle } from 'rsuite/esm/Picker'
import { Exit, Trash } from '@rsuite/icons/'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const UserMenu = () => {
	const [modal, setModal] = useState({ show: false, isExit: true })
	const onHide = () => setModal({ ...modal, show: false })
	const ref = React.useRef<OverlayTriggerHandle | null>(null)
	const { data } = useTypedSelector((state) => state.user)
	const { userExit, userReset } = useActions()
	const onOpen = () => {
		let event = new CustomEvent('openNewMenu', {
			detail: 'user-menu'
		})
		document.dispatchEvent(event)
	}
	const exitFunc = () => {
		userExit()
		onHide()
	}
	const resetFunc = () => {
		userReset(data.hash, data.userId)
		onHide()
	}
	useEffect(() => {
		document.addEventListener('openNewMenu', (e: any) => {
			if (e?.detail !== 'user-menu') ref.current?.close()
		})
	}, [])
	return (
		<>
			<Modal backdrop="static" open={modal.show} onClose={onHide}>
				<Modal.Header>
					{modal.isExit ? 'Log out' : 'Reset data'}
				</Modal.Header>
				<Modal.Body>
					{modal.isExit
						? 'Do you really want to exit from account?'
						: 'Do you really want to reset all data from account?'}
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() =>
							modal.isExit ? exitFunc() : resetFunc()
						}
						appearance="primary"
						color="red"
					>
						{modal.isExit ? 'Exit' : 'Reset'}
					</Button>
					<Button onClick={onHide} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<Whisper
				placement="bottomEnd"
				trigger="click"
				onContextMenu={(e) => {
					e.preventDefault()
				}}
				onOpen={onOpen}
				ref={ref}
				delayClose={0}
				speaker={
					<Popover className="user-menu">
						<div>
							<div className="info">
								<p className="name">
									Hello, {data.firstname} {data.lastname}
								</p>
								<p className="username">@{data.username}</p>
								<div className="limits">
									<p className="limit">
										Uploading limit: 50Mb
									</p>
									<p className="limit">
										Downloading limit: 20Mb
									</p>
								</div>
							</div>
							<Stack
								justifyContent="flex-end"
								alignItems="flex-end"
							>
								<Button
									className="trash-btn"
									color="red"
									endIcon={<Trash />}
									onClick={() => {
										setModal({ show: true, isExit: false })
										ref.current?.close()
									}}
								>
									Reset
								</Button>
								<Button
									className="exit-btn"
									appearance="subtle"
									color="red"
									endIcon={<Exit />}
									onClick={() => {
										setModal({ show: true, isExit: true })
										ref.current?.close()
									}}
								>
									Exit
								</Button>
							</Stack>
						</div>
					</Popover>
				}
			>
				<div className="user-menu-btn">
					<User />
				</div>
			</Whisper>
		</>
	)
}

export default UserMenu
