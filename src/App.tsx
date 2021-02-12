import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoutes } from './routes/routes'
import RootState from './store/index'

const App = () => {
	const isAuth = !!useSelector<RootState>(state => state.auth.token)
	const routes = useRoutes(isAuth)
	useEffect(() => {
		console.log('isAuth is: ', isAuth)
	}, [isAuth])

	return <Router>{routes}</Router>
}

export default App
