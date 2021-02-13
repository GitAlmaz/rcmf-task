import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes/routes'
import { RootState } from './store'

const App = () => {
	const isAuth = !!useSelector((state:RootState) => state.auth.token)
	const routes = useRoutes(isAuth)
	useEffect(() => {
		console.log('isAuth is: ', isAuth)
	}, [isAuth])

	return <Router>{routes}</Router>
}

export default App
