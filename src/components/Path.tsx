import React, { FC } from 'react'
import { Breadcrumb } from 'rsuite'

type props = {
	path: string
}

const Path: FC<props> = ({ path }) => {
	var arr = path.split('/')
	return (
		<div className="path">
			<Breadcrumb>
				{arr.map((el, i) => (
					<Breadcrumb.Item key={i} active={i === arr.length - 1}>
						{el}
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
		</div>
	)
}

export default Path
