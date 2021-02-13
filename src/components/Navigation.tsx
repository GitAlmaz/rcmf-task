import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
	UserOutlined,
	BookOutlined,
	LogoutOutlined,
	RadarChartOutlined,
	LoadingOutlined
} from '@ant-design/icons'
import { RootState } from '../store'
import { logoutUser } from '../store/auth/authActions'
import Logo from '../assets/img/logo.svg'
import './styles/_logo.scss'

const { SubMenu } = Menu

const Navigation = () => {
	const { user } = useSelector((state: RootState) => state.auth)
	console.log('Navigation is render')
	return (
		<>
			<NavLink to='/'>
				<div className='logo'>
					<img src={Logo} alt='' />
				</div>
			</NavLink>
			<Menu theme='dark' mode='vertical' defaultSelectedKeys={['user_info']}>
				<SubMenu
					key='user'
					title={user ? user.info.name : <LoadingOutlined />}
					icon={<UserOutlined />}
				>
					<Menu.Item key='user_info' icon={<RadarChartOutlined />}>
						Информация
						<Link to='/user_information' />
					</Menu.Item>
					<Menu.Item
						key='user_logout'
						icon={<LogoutOutlined />}
						onClick={logoutUser}
					>
						Выйти
						<Link to='/' />
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='tasks' icon={<BookOutlined />}>
					Задачи
					<Link to='/tasks' />
				</Menu.Item>
			</Menu>
		</>
	)
}

export default Navigation
