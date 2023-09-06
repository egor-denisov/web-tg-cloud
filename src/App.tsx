import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Drive from './pages/Drive'

const getRouter = () => {
	return createBrowserRouter([
		{
			path: '/',
			element: <Drive />
		},
		{
			path: '/login/',
			element: (
				<>
					<p>login</p>
				</>
			)
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
	return (
		<div>
			<RouterProvider router={getRouter()} />
		</div>
	)
}

export default App
