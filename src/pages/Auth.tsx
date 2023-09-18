import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
	const navigate = useNavigate()
	const { login } = useActions()
	useEffect(() => {
		const script = document.createElement('script')

		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', 'StorageTest1Bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-userpic', 'false')
		script.setAttribute(
			'data-onauth',
			`localStorage.setItem('user_id', user.id);
            localStorage.setItem('hash', user.hash);
            window.dispatchEvent(new Event("storage"));`
		)
		script.setAttribute('data-request-access', 'write')

		document.body.appendChild(script)
	}, [])
	window.addEventListener('storage', () => {
		login(
			window.localStorage.getItem('user_id'),
			window.localStorage.getItem('hash')
		)
		navigate('/')
	})
	return <div></div>
}

export default Auth
