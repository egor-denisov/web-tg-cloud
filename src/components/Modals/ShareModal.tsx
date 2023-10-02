import React, { FC } from 'react'
import {
	Button,
	Container,
	Drawer,
	Input,
	InputGroup,
	Tooltip,
	Whisper
} from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { SERVER } from '../../env'
import { Copy } from '@rsuite/icons/'

type props = {
	show: boolean
	id: number
	name: string
	sharedId: string
	onHide: (event: React.SyntheticEvent) => void
}

const ShareModal: FC<props> = ({ show, id, name, sharedId, onHide }) => {
	const { data } = useTypedSelector((state) => state.user)
	const { content } = useTypedSelector((state) => state.content)
	const { shareFile, stopSharingFile } = useActions()
	const shareFunc = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		shareFile(data.hash, id, data.userId)
	}
	const stopSharingFunc = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		stopSharingFile(data.hash, id, data.userId)
	}
	return (
		<div className="modal">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>Share file</Drawer.Title>
				</Drawer.Header>
				{content.files.filter((el) => el.id === id)[0]?.isShared ? (
					<Drawer.Body>
						<p>
							File "{name}" is shared. You can send a link or stop
							access to it.
						</p>
						<InputGroup style={{ margin: '20px 0px' }}>
							<Input
								value={`${SERVER}/shared?shared_id=${sharedId}`}
							/>

							<Whisper
								placement="top"
								trigger="click"
								speaker={<Tooltip>Link was copied</Tooltip>}
							>
								<InputGroup.Button
									onClick={() => {
										navigator.clipboard.writeText(
											`${SERVER}/shared?shared_id=${sharedId}`
										)
									}}
								>
									<Copy />
								</InputGroup.Button>
							</Whisper>
						</InputGroup>
						<Container
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-end',
								alignItems: 'flex-end'
							}}
						>
							<Button
								onClick={(e) => {
									stopSharingFunc(e)
								}}
								appearance="primary"
								color="red"
							>
								Stop access
							</Button>
							<Button onClick={onHide} appearance="subtle">
								Cancel
							</Button>
						</Container>
					</Drawer.Body>
				) : (
					<Drawer.Body>
						<p>
							Do you really want to share "{name}"? Access will
							appear to all users with a link to the file.
						</p>
						<Input
							style={{ margin: '20px 0px' }}
							value={`${SERVER}/shared?shared_id=${sharedId}`}
							disabled
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
									shareFunc(e)
								}}
								appearance="primary"
							>
								Share
							</Button>
							<Button onClick={onHide} appearance="subtle">
								Cancel
							</Button>
						</Container>
					</Drawer.Body>
				)}
			</Drawer>
		</div>
	)
}

export default ShareModal
