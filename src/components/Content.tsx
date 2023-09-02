import React, { useState, useEffect } from 'react'
import File from './File'
import { FileType } from '../types'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import Previewer from './Previewer'
import Directory from './Directory'
import Creator from './Creator'

const Content = () => {
	const [previewer, setPreviewer] = useState({
		visible: false,
		fileIndex: 0
	})
	const { content, error, loading } = useTypedSelector(
		(state) => state.content
	)
	const { fetchContent } = useActions()

	useEffect(() => {
		fetchContent()
	}, [])

	if (loading) {
		return <h1>Идет загрузка...</h1>
	}
	if (error) {
		return <h1>{error}</h1>
	}

	const jumpTo = (step: number) => {
		const change = previewer.fileIndex + step
		if (change >= 0 && change < content.files.length) {
			setPreviewer({ ...previewer, fileIndex: change })
		}
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
