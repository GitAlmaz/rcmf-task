import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Main = lazy(() => import('../pages/Main'))
const Tasks = lazy(() => import('../pages/Tasks'))
const Login = lazy(() => import('../pages/Login'))
const EmptyLayout = lazy(() => import('../layouts/EmptyLayout'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))

const useRoutes = isAuthenticated =>
	isAuthenticated ? (
		<Switch>
			<Suspense fallback='Loading ...'>
				<DashboardLayout>
					<Route exact path='/'>
						<Main />
					</Route>
					<Route exact path='/tasks'>
						<Tasks />
					</Route>
				</DashboardLayout>
			</Suspense>
			<Redirect to='/' />
		</Switch>
	) : (
		<Switch>
			<Suspense fallback='Loading ...'>
				<Route exact path='/'>
					<EmptyLayout>
						<Login />
					</EmptyLayout>
				</Route>
			</Suspense>
		</Switch>
	)

export { useRoutes }
