import React, { FC } from 'react'
import { Drawer, Uploader } from 'rsuite'
import { useTypedSelector } from '../../hooks/useTypedSelector'

type props = {
	show: boolean
	onHide: (event: React.SyntheticEvent) => void
}
const styles = {
	lineHeight: '200px'
}
const UploadDrawer: FC<props> = ({ show, onHide }) => {
	const { data } = useTypedSelector((state) => state.user)
	return (
		<div className="Drawer">
			<Drawer open={show} onClose={onHide} size="md" placement="bottom">
				<Drawer.Header>
					<Drawer.Title>Upload new files</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body style={{ textAlign: 'center' }}>
					<Uploader
						action="http://localhost:8080/upload"
						data={{
							user_id: data.userId,
							directory_id: data.currentDirectoryId
						}}
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
