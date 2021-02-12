import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import DashboardLayout from '../layouts/DashboardLayout'

const Main = lazy(() => import('../pages/Main'))
const Tasks = lazy(() => import('../pages/Tasks'))
const Login = lazy(() => import('../pages/Login'))
const EmptyLayout = lazy(() => import('../layouts/EmptyLayout'))

const useRoutes = isAuthenticated =>
	isAuthenticated ? (
		<Switch>
			<DashboardLayout>
				<Suspense
					fallback={
						<Spin
							size='large'
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						/>
					}
				>
					<Route exact path='/'>
						<Main />
					</Route>
					<Route exact path='/tasks'>
						<Tasks />
					</Route>
				</Suspense>
			</DashboardLayout>
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
