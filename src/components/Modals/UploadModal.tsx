import React, { FC } from 'react'
import { Drawer, Uploader } from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { SERVER } from '../../env'

type props = {
	show: boolean
	onHide: (event: React.SyntheticEvent) => void
}
const styles = {
	lineHeight: '200px'
}
const UploadDrawer: FC<props> = ({ show, onHide }) => {
	const { data } = useTypedSelector((state) => state.user)
	const { addNewFile, setError } = useActions()
	return (
		<div className="Drawer">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>Upload new files</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body style={{ textAlign: 'center' }}>
					<Uploader
						action={`${SERVER}/upload`}
						data={{
							hash: data.hash,
							user_id: data.userId,
							directory_id: data.currentDirectoryId
						}}
						onSuccess={(response) =>
							addNewFile(data.hash, data.userId, response.id)
						}
						onError={(response) => setError(response.response)}
						multiple
						draggable
					>
						<div style={styles}>
							Click or Drag files to this area to upload
						</div>
					</Uploader>
				</Drawer.Body>
			</Drawer>
		</div>
	)
}

export default UploadDrawer
