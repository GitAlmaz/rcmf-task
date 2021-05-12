import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
	UserOutlined,
	BookOutlined,
	LogoutOutlined,
	RadarChartOutlined,
	LoadingOutlined,
	FormOutlined,
	TeamOutlined
} from '@ant-design/icons'
import { RootState } from '../store/types'
import { logoutUser } from '../store/auth/authActions'
import Logo from '../assets/img/logo.svg'
import './styles/_logo.scss'

const { SubMenu } = Menu

const Navigation = () => {
	const { user, uid } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()
	const logOutHandler = () => {
		dispatch(logoutUser())
	}
	return (
		<>
			<NavLink to='/'>
				<div className='logo'>
					<img src={Logo} alt='Logo atom' />
				</div>
			</NavLink>
			<Menu mode='vertical' defaultSelectedKeys={['tests']}>
				<SubMenu
					key='user'
					title={user ? user.info.name : <LoadingOutlined />}
					icon={<UserOutlined />}
				>
					<Menu.Item key='user_info' icon={<RadarChartOutlined />}>
						Информация
						<Link to={`/account/${uid}`} />
					</Menu.Item>
					<Menu.Item
						key='user_logout'
						icon={<LogoutOutlined />}
						onClick={logOutHandler}
					>
						Выйти
						<Link to='/' />
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='bigdata' icon={<BookOutlined />}>
					Учебник BigData
					<Link to='/bigdata' />
				</Menu.Item>
				<Menu.Item key='tests' icon={<FormOutlined />}>
					Тестирование
					<Link to='/tests' />
				</Menu.Item>
				{user?.info.admin && (
					<Menu.Item key='users' icon={<TeamOutlined />}>
						Пользователи
						<Link to='/users' />
					</Menu.Item>
				)}
			</Menu>
		</>
	)
}

export default Navigation
