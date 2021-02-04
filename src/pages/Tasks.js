import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Form, Empty, Button, Input, Switch, Spin, Row, Col } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { createTask, loadTasks } from '../store/tasks/tasksActions'
import CreateTaskModal from '../components/CreateTaskModal'
import Task from '../components/Task'

const Tasks = ({ createTask, loadTasks }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const tasks = useSelector(state => state.tasks.tasks)
	const isLoading = useSelector(state => state.tasks.isLoading)
	const [form] = Form.useForm()
	const submitHandler = async values => {
		try {
			console.log(values)
			await createTask(values)
			handleToggleModal()
		} catch (e) {}
	}
	const handleToggleModal = () => {
		setIsModalVisible(!isModalVisible)
		form.resetFields()
	}
	const handleOk = () => {
		form
			.validateFields()
			.then(values => {
				form.resetFields()
				submitHandler(values)
			})
			.catch(e => {
				console.log(e)
			})
	}

	useEffect(() => {
		loadTasks()
	}, [])

	return isLoading ? (
		<Spin size='large' />
	) : (
		<>
			<CreateTaskModal
				isModalVisible={isModalVisible}
				title='Описание задачи'
				handleOk={handleOk}
				handleCancel={handleToggleModal}
				okText='Создать'
				cancelText='Отменить'
			>
				<Form name='createTask' form={form}>
					<Form.Item name='title' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
						<Input placeholder='Заголовк задачи' />
					</Form.Item>
					<Form.Item name='description' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
						<Input placeholder='Описание задачи' />
					</Form.Item>
					<Form.Item name='status' label='Статус задачи' valuePropName='checked'>
						<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
					</Form.Item>
				</Form>
			</CreateTaskModal>
			{tasks.length ? (
				<>
					<Row gutter={15}>
						{tasks.map(task => (
							<Task data={task} key={task.id} />
						))}
					</Row>
					<Button type='primary' onClick={handleToggleModal}>
						Создать
					</Button>
				</>
			) : (
				<Empty
					image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
					imageStyle={{
						height: 120
					}}
					description={<span>Список задачь пуст</span>}
				>
					<Button type='primary' onClick={handleToggleModal}>
						Создать
					</Button>
				</Empty>
			)}
		</>
	)
}

export default connect(null, { createTask, loadTasks })(Tasks)
