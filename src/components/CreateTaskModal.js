import React, { memo } from 'react'
import { Modal, Input, Switch, Form } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export default memo(
	({ title, isModalVisible, handleOk, handleCancel, okText, cancelText, form }) => (
		<Modal
			title={title}
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText={okText}
			cancelText={cancelText}
		>
			<Form name='createTask' form={form}>
				<Form.Item name='title' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
					<Input placeholder='Заголовк задачи' />
				</Form.Item>
				<Form.Item name='description' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
					<Input placeholder='Описание задачи' />
				</Form.Item>
				{/* <Form.Item name='status' label='Статус задачи' valuePropName='checked'>
					<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
				</Form.Item> */}
			</Form>
		</Modal>
	),
	(prev, next) => {
		if (prev.isModalVisible !== next.isModalVisible) {
			return false
		} else {
			return true
		}
	}
)
