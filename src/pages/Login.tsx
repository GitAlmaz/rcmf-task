import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Form, Input, Button, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { createUser, loginUser } from '../store/auth/authActions'
import { RootState } from '../store/types'
import { TUser } from '../store/types/auth'
const { Item } = Form
const { Password } = Input

const Login = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [hasAccount, setHasAccount] = useState<boolean>(false)
	const [form] = Form.useForm()
	const loading = useSelector((state: RootState) => state.auth.isLoading)

	const submitHandler = async (values: TUser) => {
		try {
			hasAccount ? await dispatch(loginUser(values)) : await dispatch(createUser(values))
			history.push('/tests')
		} catch (e) {}
	}

	const finishFailHandler = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const hasAccountHandler = () => {
		form.resetFields()
		setHasAccount(!hasAccount)
	}

	return (
		<Card
			title={hasAccount ? 'Авторизация' : 'Регистрация'}
			style={{ width: 400 }}
		>
			<Form
				name='auth'
				form={form}
				onFinish={submitHandler}
				onFinishFailed={finishFailHandler}
			>
				{!hasAccount && (
					<Item
						name='name'
						rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
					>
						<Input placeholder='Имя' />
					</Item>
				)}
				<Item
					name='email'
					rules={[{ required: true, message: 'Пожалуйста введите почту!' }]}
				>
					<Input placeholder='Email' />
				</Item>
				<Item
					name='password'
					rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
				>
					<Password placeholder='Пароль' />
				</Item>
				<Space size='small'>
					<Button type='primary' htmlType='submit' loading={loading}>
						{hasAccount ? 'Войти' : 'Зарегестрироваться'}
					</Button>
					<Button onClick={hasAccountHandler}>
						{hasAccount ? 'Создать аккаунт' : 'Есть аккаунт ?'}
					</Button>
				</Space>
			</Form>
		</Card>
	)
}

export default Login
