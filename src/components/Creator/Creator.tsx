import React, { useState } from 'react'
import PlusSVG from '../../svg/Plus'
import UploadModal from './UploadModal'
import CreateModal from './CreateModal'
import { Button } from 'rsuite'
const Creator = () => {
	const [active, setActive] = useState(false)
	const [uploadActive, setUploadActive] = useState(false)
	const [createActive, setCreateActive] = useState(false)
	return (
		<div className="creator">
			<UploadModal
				show={uploadActive}
				onHide={() => setUploadActive(false)}
			/>
			<CreateModal
				show={createActive}
				onHide={() => setCreateActive(false)}
			/>
			{active && (
				<div className="menu">
					<div
						className="option folder"
						onClick={() => setCreateActive(true)}
					>
						<Button appearance="subtle">Create new folder</Button>
					</div>
					<div
						className="option file"
						onClick={() => setUploadActive(true)}
					>
						<Button appearance="subtle">Upload file</Button>
					</div>
				</div>
			)}
			<div className={['btn', active && 'active'].join(' ')}>
				<PlusSVG onClick={() => setActive(!active)} />
			</div>
		</div>
	)
}

export default Creator
