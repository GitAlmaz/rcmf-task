import React, { ReactNode } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const EmptyLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Layout>
			<Content
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{children}
			</Content>
		</Layout>
	)
}

export default EmptyLayout
