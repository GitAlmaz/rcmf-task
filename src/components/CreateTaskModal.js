import React from 'react'
import { Modal } from 'antd'

export default ({ title, isModalVisible, handleOk, handleCancel, okText, cancelText, children }) => (
	<Modal
		title={title}
		visible={isModalVisible}
		onOk={handleOk}
		onCancel={handleCancel}
		okText={okText}
		cancelText={cancelText}
	>
		{children}
	</Modal>
)
