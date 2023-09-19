import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useActions } from './hooks/useActions'
import Drive from './pages/Drive'
import Auth from './pages/Auth'

const getRouter = () => {
	return createBrowserRouter([
		{
			path: '/',
			element: <Drive />
		},
		{
			path: '/auth/',
			element: <Auth />
		},
		{
			path: '/home/',
			element: (
				<>
					<p>home</p>
				</>
			)
		},
		{
			path: '/drive/',
			element: <Drive />
		}
	])
}
const App = () => {
	const { login } = useActions()
	useEffect(() => {
		login(
			window.localStorage.getItem('user_id'),
			window.localStorage.getItem('username'),
			window.localStorage.getItem('first_name'),
			window.localStorage.getItem('last_name')
		)
		document.body.querySelector('#telegram-login-StorageTest1Bot')?.remove()
	})
	return (
		<div>
			<RouterProvider router={getRouter()} />
		</div>
	)
}

export default App
