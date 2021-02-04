import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes/routes'

const App = () => {
	const isAuth = !!useSelector(state => state.auth.token)
	const routes = useRoutes(isAuth)
	useEffect(() => {
		console.log('isAuth is: ', isAuth);
	}, [isAuth])

	return <Router>{routes}</Router>
}

export default App
