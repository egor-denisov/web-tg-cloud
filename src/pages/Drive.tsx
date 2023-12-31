import { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import Previewer from '../components/Previewer'
import Creator from '../components/Creator'
import { Loader, Notification, useToaster } from 'rsuite'
import AboutModal from '../components/Modals/AboutModal'
import Path from '../components/Path'
import EditModal from '../components/Modals/EditModal'
import { DirectoryType, FileType } from '../types'
import Items from '../components/Items'
import DeleteModal from '../components/Modals/DeleteModal'
import Auth from './Auth'

type ItemType = FileType | DirectoryType

const Drive = () => {
	const toaster = useToaster()
	const [path, setPath] = useState('')
	const [previewer, setPreviewer] = useState({
		visible: false,
		fileIndex: 0
	})
	const [aboutModal, setAboutModal] = useState({
		visible: false,
		data: {}
	})
	const [editModal, setEditModal] = useState<{
		visible: boolean
		item: ItemType
		type: 'file' | 'directory'
	}>({
		visible: false,
		item: {} as FileType,
		type: 'file'
	})
	const [deleteModal, setDeleteModal] = useState<{
		visible: boolean
		id: number
		name: string
		type: 'file' | 'directory'
	}>({
		visible: false,
		id: -1,
		name: '',
		type: 'file'
	})
	const { content, error, loading, notification } = useTypedSelector(
		(state) => state.content
	)
	const { data, currentDirectory, loadingAuth, authorized } =
		useTypedSelector((state) => state.user)
	const { fetchContent, clearNotification, clearError } = useActions()

	useEffect(() => {
		if (authorized) {
			fetchContent(data.hash, data.userId, data.currentDirectoryId)
		}
	}, [authorized, data.userId, data.currentDirectoryId])

	useEffect(() => {
		if (notification != null) {
			toaster.push(
				<Notification type="success" header={'Success'} closable>
					<p>
						{notification[0].toUpperCase() + notification.slice(1)}
					</p>
				</Notification>,
				{ placement: 'topEnd' }
			)
			clearNotification()
		}
	}, [notification])

	useEffect(() => {
		if (error != null) {
			toaster.push(
				<Notification type="error" header={'Error'} closable>
					<p>{error[0].toUpperCase() + error.slice(1)}</p>
				</Notification>,
				{ placement: 'topEnd' }
			)
			clearError()
		}
	}, [error])

	useEffect(() => {
		setPath(currentDirectory.path ?? '')
	}, [currentDirectory.path])

	const setAboutData = (index: number, type: 'file' | 'directory') => {
		var res =
			type === 'directory'
				? {
						name: content.directories[index].name,
						path: content.directories[index].path,
						type: 'directory',
						created: content.directories[index].created,
						includes: {
							files:
								content.directories[index]?.files?.length ?? 0,
							directories:
								content.directories[index]?.directories
									?.length ?? 0
						},
						size: content.directories[index].size
				  }
				: {
						name: content.files[index].name,
						path: currentDirectory.path + content.files[index].name,
						type: content.files[index].type,
						created: content.files[index].created,
						size: content.files[index].fileSize
				  }
		setAboutModal({
			visible: true,
			data: res
		})
	}

	const jumpTo = (step: number) => {
		const change = previewer.fileIndex + step
		if (change >= 0 && change < content.files.length) {
			setPreviewer({ ...previewer, fileIndex: change })
		}
	}
	if (loadingAuth || loading) {
		return (
			<div className="loader">
				<Loader size="lg" content="Loading..." vertical />
			</div>
		)
	}
	if (!authorized) {
		return <Auth />
	}

	return (
		<div className="content">
			<Path path={path} />
			<Items
				content={content}
				setAboutData={setAboutData}
				setEditModal={setEditModal}
				setPreviewer={setPreviewer}
				setDeleteModal={setDeleteModal}
			/>
			<AboutModal
				show={aboutModal.visible}
				onHide={() => setAboutModal({ ...aboutModal, visible: false })}
				data={aboutModal.data}
			/>
			<EditModal
				show={editModal.visible}
				onHide={() => setEditModal({ ...editModal, visible: false })}
				item={editModal.item}
				type={editModal.type}
			/>
			<DeleteModal
				show={deleteModal.visible}
				id={deleteModal.id}
				name={deleteModal.name}
				type={deleteModal.type}
				onHide={() =>
					setDeleteModal({ ...deleteModal, visible: false })
				}
			/>
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

export default Drive
