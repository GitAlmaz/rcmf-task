import React, { ReactNode, useEffect } from 'react'
import { Layout } from 'antd'
import Navigation from '../components/Navigation'
import { loadUser } from '../store/auth/authActions'
import { useDispatch } from 'react-redux'

const { Content, Sider } = Layout

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	const dispath = useDispatch()
	useEffect(() => {
		dispath(loadUser())
	}, [])
	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					width={250}
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
						background: '#fff'
					}}
					collapsible
					defaultCollapsed={false}
				>
					<Navigation />
				</Sider>
				<Content style={{ padding: '48px', marginLeft: 250 }}>{children}</Content>
			</Layout>
		</>
	)
}

export default DashboardLayout
