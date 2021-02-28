import React, { useEffect } from 'react'
import { Empty, Button, Spin, Row, Col, PageHeader, Typography } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import CreateTaskModal from '../../components/CreateTaskModal'
import Task from '../../components/Task/Task'
import TasksLogic from './TasksLogic'

const Tasks = () => {
	const {
		tasks,
		isLoading,
		modalVisibility,
		form,
		handleToggleModal,
		handleOk,
		onTaskDelete,
		onTaskEdit,
		fetchTasks
	} = TasksLogic()

	useEffect(() => {
		fetchTasks()
	}, [])

	return isLoading ? (
		<Spin
			size='large'
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		/>
	) : (
		<>
			<CreateTaskModal
				isModalVisible={modalVisibility}
				title='Описание задачи'
				handleOk={handleOk}
				handleCancel={handleToggleModal}
				okText='Создать'
				cancelText='Отменить'
				form={form}
			/>
			{tasks.completed.length || tasks.unfulfilled.length ? (
				<>
					<PageHeader
						onBack={() => window.history.back()}
						title='Задачи'
						style={{ padding: '16px 0' }}
						extra={[
							<Button
								key='createTask'
								type='primary'
								onClick={handleToggleModal}
								icon={<FileAddOutlined />}
							>
								Создать задачу
							</Button>
						]}
					></PageHeader>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col span={12}>
							<Typography.Paragraph>Ожидание:</Typography.Paragraph>
							{tasks.unfulfilled.map(task => (
								<Task
									data={task}
									onTaskDelete={onTaskDelete}
									onTaskEdit={onTaskEdit}
									key={task.id}
								/>
							))}
						</Col>
						<Col span={12}>
							<Typography.Paragraph>Готово:</Typography.Paragraph>
							{tasks.completed.map(task => (
								<Task
									data={task}
									onTaskDelete={onTaskDelete}
									onTaskEdit={onTaskEdit}
									key={task.id}
								/>
							))}
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
}

export default Tasks
