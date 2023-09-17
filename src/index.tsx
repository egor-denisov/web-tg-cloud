import React from 'react'
import ReactDOM from 'react-dom/client'
import 'rsuite/dist/rsuite.min.css'
import './styles/App.scss'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
