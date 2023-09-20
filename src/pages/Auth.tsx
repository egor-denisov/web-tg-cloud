import { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { Button, FlexboxGrid, Panel } from 'rsuite'
interface ResponseType {
	auth_date: number
	first_name: string
	hash: string
	id: number
	last_name: string
	photo_url: string
	username: string
}
const Auth = () => {
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
			localStorage.setItem('username', user.username);
			localStorage.setItem('first_name', user.first_name);
			localStorage.setItem('last_name', user.last_name);
            window.dispatchEvent(new Event("storage"));`
		)
		script.setAttribute('data-request-access', 'write')
		document.body.appendChild(script)
	}, [])
	const goLogin = () => {
		;(window as any)?.Telegram?.Login.auth(
			{ bot_id: '5837544572' },
			(data: ResponseType) => {
				login(
					String(data.id),
					data.username,
					data.first_name,
					data.last_name
				)
			}
		)
	}

	return (
		<div className="auth">
			<FlexboxGrid>
				<FlexboxGrid.Item>
					<Panel header={<h3>Login</h3>} bordered>
						<p>
							You need to log in to your telegram account to
							continue!
						</p>
						<Button
							appearance="primary"
							style={{ marginTop: '20px' }}
							block
							onClick={() => goLogin()}
						>
							Log in
						</Button>
					</Panel>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</div>
	)
}

export default Auth
