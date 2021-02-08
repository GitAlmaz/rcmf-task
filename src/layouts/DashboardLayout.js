import React, { useEffect } from 'react'
import { Layout, Button } from 'antd'
import Navigation from '../components/Navigation'
import { loadUser } from '../store/auth/authActions'
import { connect } from 'react-redux'

const { Content, Sider } = Layout

const DashboardLayout = ({ children, loadUser }) => {
	useEffect(() => {
		loadUser()
	}, [])
	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider width={250} collapsible defaultCollapsed={false}>
					<Navigation />
				</Sider>
				<Content style={{ padding: '48px' }}>{children}</Content>
			</Layout>
		</>
	)
}

export default connect(null, { loadUser })(DashboardLayout)
