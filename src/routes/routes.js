import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Main = lazy(() => import('../pages/Main/Main'))
const Tasks = lazy(() => import('../pages/Tasks/Tasks'))
const Login = lazy(() => import('../pages/Login/Login'))
const EmptyLayout = lazy(() => import('../layouts/EmptyLayout'))

const useRoutes = isAuthenticated =>
	isAuthenticated ? (
		<Switch>
			<Route exact path='/'>
				<Main />
			</Route>
			<Route exact path='/tasks'>
				<Tasks />
			</Route>
		</Switch>
	) : (
		<Switch>
			<Route>
				<Suspense fallback='Loading ...'>
					<EmptyLayout>
						<Login />
					</EmptyLayout>
				</Suspense>
			</Route>
			<Redirect to='/login' />
		</Switch>
	)

export { useRoutes }
