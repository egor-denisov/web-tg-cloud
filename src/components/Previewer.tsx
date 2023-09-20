import React, { FC, useEffect, useState, memo } from 'react'
import { FileType } from '../types'
import ChevronLeftSVG from '../svg/ChevronLeft'
import ChevronRightSVG from '../svg/ChevronRight'
import CloseSVG from '../svg/Close'
import DownloadSVG from '../svg/Download'
import { Button } from 'rsuite'

type props = {
	file: FileType
	jumpTo: Function
	setVisible: Function
}

const Previewer: FC<props> = memo(({ file, jumpTo, setVisible }) => {
	const [imageSrc, setImageSrc] = useState('')

	useEffect(() => {
		if (file.type.slice(0, 5) === 'image') {
			if (file.thumbnailFileId.length > 0) {
				setImageSrc(file.thumbnailSource)
			}
			const img = new Image()
			img.onload = () => {
				setImageSrc(file.fileSource)
			}
			img.src = file.fileSource
		}
	}, [file.id])

	const saveFile = (e: React.MouseEvent, src: string) => {
		e.stopPropagation()
		window.location.replace(src)
	}
	const goJump = (e: React.MouseEvent, step: number) => {
		e.stopPropagation()
		jumpTo(step)
	}

	return (
		<div className="previewer" onClick={() => setVisible(false)}>
			<div className="content" onClick={(e) => e.stopPropagation()}>
				{file.type.slice(0, 5) === 'image' ? (
					<img src={imageSrc} alt="" />
				) : (
					<div className="card">
						<p className="text">Preview is not available</p>
						<Button onClick={(e) => saveFile(e, file.fileSource)}>
							Download!
						</Button>
					</div>
				)}
				<figcaption>{file.name}</figcaption>
			</div>
			<div className="navigator">
				<div className="btn prev" onClick={(e) => goJump(e, -1)}>
					<ChevronLeftSVG />
				</div>
				<div className="btn next" onClick={(e) => goJump(e, 1)}>
					<ChevronRightSVG />
				</div>
				<div className="btn close" onClick={() => setVisible(false)}>
					<CloseSVG />
				</div>
				<div
					className="btn save"
					onClick={(e) => saveFile(e, file.fileSource)}
				>
					<DownloadSVG />
				</div>
			</div>
		</div>
	)
})

export default Previewer
