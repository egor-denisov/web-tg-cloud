import React, { useState, useEffect } from 'react'
import File from './File'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import Previewer from './Previewer'
import Directory from './Directory'
import Creator from './Creator/Creator'
import { Loader, Notification, useToaster } from 'rsuite'

const Content = () => {
	const toaster = useToaster()
	const [previewer, setPreviewer] = useState({
		visible: false,
		fileIndex: 0
	})
	const { content, error, loading, notification } = useTypedSelector(
		(state) => state.content
	)
	const { data, authorized } = useTypedSelector((state) => state.user)
	const { fetchContent, login } = useActions()

	useEffect(() => {
		login()
	}, [])
	useEffect(() => {
		fetchContent(data.userId, data.currentDirectory)
	}, [authorized, data.currentDirectory])

	useEffect(() => {
		if (notification != null) {
			toaster.push(
				<Notification type="success" header={'Success'} closable>
					<p>{notification}</p>
				</Notification>,
				{ placement: 'topEnd' }
			)
		}
	}, [notification])

	useEffect(() => {
		if (error != null) {
			toaster.push(
				<Notification type="error" header={'Error'} closable>
					<p>{error}</p>
				</Notification>,
				{ placement: 'topEnd' }
			)
		}
	}, [error])

	const jumpTo = (step: number) => {
		const change = previewer.fileIndex + step
		if (change >= 0 && change < content.files.length) {
			setPreviewer({ ...previewer, fileIndex: change })
		}
	}
	if (loading) {
		return (
			<div id="loaderInverseWrapper" style={{ height: 200 }}>
				<Loader inverse center content="loading..." />
			</div>
		)
	}
	return (
		<div className="content">
			<div className="items">
				{content.files.map((file, index) => {
					return (
						<File
							file={file}
							key={file.fileUniqueId}
							goPreview={() =>
								setPreviewer({
									visible: true,
									fileIndex: index
								})
							}
						/>
					)
				})}
				{content.directories.map((directory) => {
					return (
						<Directory directory={directory} key={directory.id} />
					)
				})}
			</div>
			{previewer.visible && (
				<Previewer
					file={content.files[previewer.fileIndex]}
					jumpTo={jumpTo}
					setVisible={(viz: boolean) =>
						setPreviewer({ ...previewer, visible: viz })
					}
				/>
			)}
			<Creator />
		</div>
	)
}

export default Content
