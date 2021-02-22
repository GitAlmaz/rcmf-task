import React from 'react'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../store/types/tests'


const UserInfo:React.FC = () => {
	const { id } = useParams<RouteParams>()
	return (
		<h1>{id}</h1>
	)
}

export default UserInfo