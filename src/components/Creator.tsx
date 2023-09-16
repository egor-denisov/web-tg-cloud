import React, { useState } from 'react'
import UploadModal from './Modals/UploadModal'
import CreateModal from './Modals/CreateModal'
import { Dropdown } from 'rsuite'
const Creator = () => {
	const [uploadActive, setUploadActive] = useState(false)
	const [createActive, setCreateActive] = useState(false)
	return (
		<>
			<UploadModal
				show={uploadActive}
				onHide={() => setUploadActive(false)}
			/>
			<CreateModal
				show={createActive}
				onHide={() => setCreateActive(false)}
			/>
			<div className="creator">
				<Dropdown
					title="+"
					placement="topEnd"
					appearance="primary"
					noCaret
				>
					<Dropdown.Item
						className="option folder"
						onClick={() => setCreateActive(true)}
					>
						Create new folder
					</Dropdown.Item>
					<Dropdown.Item
						className="option file"
						onClick={() => setUploadActive(true)}
					>
						Upload file
					</Dropdown.Item>
				</Dropdown>
			</div>
		</>
	)
}

export default Creator
