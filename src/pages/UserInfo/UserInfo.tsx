import {
	Button,
	Card,
	Input,
	PageHeader,
	Skeleton,
	Space,
	Typography,
	Form
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from '../../store/types'
import { RouteParams } from '../../store/types/tests'
import { IUserInfo } from '../../store/types/users'
import { loadUserInfo, updateUserInfo } from '../../store/user/userAction'

const UserInfo: React.FC = () => {
	const { id } = useParams<RouteParams>()
	const { isLoading, info } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	const history = useHistory()
	const [form] = Form.useForm()
	const [edit, setEdit] = useState(false)

	const changeEditHandler = () => {
		setEdit(!edit)
	}
	useEffect(() => {
		dispatch(loadUserInfo())
	}, [])
	const finishChangeHandler = async (values: IUserInfo) => {
		await dispatch(updateUserInfo({ id, payload: values }))
		changeEditHandler()
	}

	return isLoading ? (
		<Skeleton active />
	) : (
		<>
			<PageHeader
				onBack={() => history.push('/')}
				title='Главная'
				style={{ padding: '16px 0' }}
			></PageHeader>
			<Card
				title='Личный кабинет'
				bordered={false}
				extra={
					<Button type='primary' onClick={changeEditHandler}>
						Редактировать
					</Button>
				}
			>
				{!edit ? (
					<Space direction='vertical' size='large'>
						<Typography>
							<strong>Имя:</strong> {info.name}
						</Typography>
						<Typography>
							<strong>Почта:</strong> {info.email}
						</Typography>
						<Typography>
							<strong>Пароль:</strong> {info.password}
						</Typography>
						{info.last_name && (
							<Typography>
								<strong>Фамилия:</strong> {info.last_name}
							</Typography>
						)}
						{info.group && (
							<Typography>
								<strong>Группа:</strong> {info.group}
							</Typography>
						)}
					</Space>
				) : (
					<Form
						name='userInfo'
						form={form}
						initialValues={{
							name: info.name,
							email: info.email,
							password: info.password,
							last_name: info.last_name || '',
							group: info.group || ''
						}}
						onFinish={finishChangeHandler}
					>
						<Form.Item
							name='name'
							label={<strong>Имя</strong>}
							rules={[
								{ required: true, message: 'Это поле не может быть пустым!' }
							]}
						>
							<Input placeholder={info.name} size='small' />
						</Form.Item>
						<Form.Item
							name='email'
							label={<strong>Почта</strong>}
							rules={[
								{ required: true, message: 'Это поле не может быть пустым!' }
							]}
						>
							<Input placeholder={info.email} size='small' />
						</Form.Item>
						<Form.Item
							name='password'
							label={<strong>Пароль</strong>}
							rules={[
								{ required: true, message: 'Это поле не может быть пустым!' }
							]}
						>
							<Input placeholder={info.password} size='small' />
						</Form.Item>
						<Form.Item name='last_name' label={<strong>Фамилия</strong>}>
							<Input placeholder='' size='small' />
						</Form.Item>
						<Form.Item name='group' label={<strong>Группа</strong>}>
							<Input placeholder='' size='small' />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Изменить
							</Button>
						</Form.Item>
					</Form>
				)}
			</Card>
		</>
	)
}

export default UserInfo
