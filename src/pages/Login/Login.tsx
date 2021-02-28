import React from 'react'
import { Card, Form, Input, Button, Space } from 'antd'
import LoginLogic from './LoginLogic'
const { Item } = Form
const { Password } = Input

const Login = () => {
	const {
		loading,
		hasAccount,
		form,
		submitHandler,
		finishFailHandler,
		hasAccountHandler
	} = LoginLogic()

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
