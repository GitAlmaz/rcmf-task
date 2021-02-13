import React, { memo } from 'react'
import { Modal, Input, Form, FormInstance } from 'antd'

type ModalProps = {
	title: string
	isModalVisible: boolean
	handleOk(): void
	handleCancel(): void
	okText: string
	cancelText: string
	form: FormInstance
}

export default memo(
	({
		title,
		isModalVisible,
		handleOk,
		handleCancel,
		okText,
		cancelText,
		form
	}: ModalProps) => (
		<Modal
			title={title}
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText={okText}
			cancelText={cancelText}
		>
			<Form name='createTask' form={form}>
				<Form.Item
					name='title'
					rules={[
						{ required: true, message: 'Пожалуйста заполните данное поле.' }
					]}
				>
					<Input placeholder='Заголовк задачи' />
				</Form.Item>
				<Form.Item
					name='description'
					rules={[
						{ required: true, message: 'Пожалуйста заполните данное поле.' }
					]}
				>
					<Input placeholder='Описание задачи' />
				</Form.Item>
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
