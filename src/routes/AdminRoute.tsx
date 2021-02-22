import React, { LazyExoticComponent, FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../store/types'

const AdminRoute = ({
	Component,
	exact,
	path
}: {
	Component: LazyExoticComponent<FC<{}>>
	exact: boolean
	path: string
}) => {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.info.admin)
	return isAdmin ? (
		<Route exact={exact} path={path} component={Component} />
	) : (
		<Redirect to={{ pathname: '/' }} />
	)
}
export default AdminRoute
