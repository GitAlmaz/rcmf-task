import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { useRoutes } from './routes/routes'
import { store } from './store'
import { RootState } from './store/types'

const App: React.FC = () => {
	const isAuth = !!useSelector((state: RootState) => state.auth.token)
	const routes = useRoutes(isAuth)
	useEffect(() => {
		console.log('isAuth is: ', isAuth)
	}, [isAuth])

	return <Router>{routes}</Router>
}

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

export default app
