import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import DashboardLayout from '../layouts/DashboardLayout'

const Main = lazy(() => import('../pages/Main'))
const Tasks = lazy(() => import('../pages/Tasks'))
const Tests = lazy(() => import('../pages/Tests'))
const Login = lazy(() => import('../pages/Login'))
const Testing = lazy(() => import('../pages/Testing'))

const EmptyLayout = lazy(() => import('../layouts/EmptyLayout'))

const useRoutes = (isAuthenticated: boolean) =>
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
					<Route exact path='/' component={Main} />
					<Route exact path='/tasks' component={Tasks} />
					<Route exact path='/tests' component={Tests} />
					<Route exact path='/tests/:id' component={Testing} />
				</Suspense>
			</DashboardLayout>
			<Redirect to='/' />
		</Switch>
	) : (
		<Switch>
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
					<EmptyLayout>
						<Login />
					</EmptyLayout>
				</Route>
			</Suspense>
		</Switch>
	)

export { useRoutes }
