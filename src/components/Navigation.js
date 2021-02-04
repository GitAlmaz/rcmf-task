import React from 'react'
import { connect, useSelector } from 'react-redux'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, BookOutlined, LogoutOutlined, RadarChartOutlined, LoadingOutlined } from '@ant-design/icons'
import { logoutUser } from '../store/auth/authActions'
import './styles/_logo.scss'

const { SubMenu } = Menu

const Navigation = ({ logoutUser }) => {
	const history = useHistory()
	const user = useSelector(state => state.auth.user)

	return (
		<>
			<NavLink to='/'>
				<div className='logo'>
					<img
						src='https://www.flaticon.com/svg/vstatic/svg/3845/3845877.svg?token=exp=1612415483~hmac=b9a486ade49f095945c9882829584943'
						alt=''
					/>
				</div>
			</NavLink>
			<Menu theme='dark' mode='vertical' defaultSelectedKeys={['user_info']}>
				<SubMenu key='user' title={user ? user.info.name : <LoadingOutlined />} icon={<UserOutlined />}>
					<Menu.Item key='user_info' icon={<RadarChartOutlined />}>
						Информация
						<Link to="/user_information" />
					</Menu.Item>
					<Menu.Item key='user_logout' icon={<LogoutOutlined  />} onClick={logoutUser}>
						Выйти
						<Link to="/" />
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='tasks' icon={<BookOutlined />}>
					Задачи
					<Link to="/tasks" />
				</Menu.Item>
			</Menu>
		</>
	)
}

export default connect(null, { logoutUser })(Navigation)
