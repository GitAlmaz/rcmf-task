import React, { useState, useEffect, memo } from 'react'
import { connect, useSelector } from 'react-redux'
import { Form, Empty, Button, Spin, Row, Col, Space, PageHeader, Typography } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { createTask, deleteTask, editTask, loadTasks } from '../store/tasks/tasksActions'
import CreateTaskModal from '../components/CreateTaskModal'
import Task from '../components/Task'

const Tasks = memo(
	({ createTask, deleteTask, editTask, loadTasks }) => {
		const tasks = useSelector(state => state.tasks.tasks)
		const isLoading = useSelector(state => state.tasks.isLoading)
		const [isModalVisible, setIsModalVisible] = useState(false)
		const [form] = Form.useForm()

		const submitHandler = async values => {
			try {
				const data = { ...values, create_date: Date.now() }
				await createTask(data)
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
					handleToggleModal()
					submitHandler(values)
				})
				.catch(e => {
					console.log(e)
				})
		}
		const onTaskDelete = ({ id }) => deleteTask(id)
		const onTaskEdit = value => editTask(value)

		useEffect(async () => {
			await loadTasks()
		}, [])

		return isLoading ? (
			<Spin
				size='large'
				style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			/>
		) : (
			<>
				<CreateTaskModal
					isModalVisible={isModalVisible}
					title='Описание задачи'
					handleOk={handleOk}
					handleCancel={handleToggleModal}
					okText='Создать'
					cancelText='Отменить'
					form={form}
				/>
				{tasks.completed || tasks.unfulfilled ? (
					<>
						<PageHeader
							onBack={() => window.history.back()}
							title='Задачи'
							extra={[
								<Button key='createTask' type='primary' onClick={handleToggleModal} icon={<FileAddOutlined />}>
									Создать задачу
								</Button>
							]}
						></PageHeader>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col span={6}>
								<Typography.Paragraph>Ожидание:</Typography.Paragraph>
								{tasks.unfulfilled.map(task => (
									<Task data={task} onTaskDelete={onTaskDelete} onTaskEdit={onTaskEdit} key={task.id} />
								))}
							</Col>
							<Col span={6}>
								<Typography.Paragraph>Исполнение:</Typography.Paragraph>
							</Col>
							<Col span={6}>
								<Typography.Paragraph>Проверка:</Typography.Paragraph>
								{tasks.completed.map(task => (
									<Task data={task} onTaskDelete={onTaskDelete} onTaskEdit={onTaskEdit} key={task.id} />
								))}
							</Col>
							<Col span={6}>
								<Typography.Paragraph>Готово:</Typography.Paragraph>
							</Col>
						</Row>
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
	},
	(prev, next) => {
		if (prev.syncTasks !== next.syncTasks) {
			return false
		} else {
			return true
		}
	}
)

export default connect(null, { createTask, deleteTask, editTask, loadTasks })(Tasks)
