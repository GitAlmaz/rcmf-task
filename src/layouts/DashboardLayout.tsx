import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from 'antd'
import Navigation from '../components/Navigation'
import { loadUser } from '../store/auth/authActions'
import { useDispatch } from 'react-redux'

const { Content, Sider } = Layout

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	const dispath = useDispatch()
	const [collapsed, setCollapsed] = useState(false)
	useEffect(() => {
		dispath(loadUser())
	}, [])
	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					width={250}
					theme="light"
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
						background: '#fff'
					}}
					collapsible
					defaultCollapsed={false}
					onCollapse={() => setCollapsed(!collapsed)}
				>
					<Navigation />
				</Sider>
				<Content style={{ padding: '48px', marginLeft: collapsed ? 80 : 250, transition: '0.2s' }}>{children}</Content>
			</Layout>
		</>
	)
}

export default DashboardLayout
