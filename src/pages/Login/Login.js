import React from 'react'
import { Card, Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { createUser } from "../../actions/authActions";

const { Item } = Form
const { Password } = Input

const Login = ({createUser}) => {
	const finishHandler = values => createUser(values)

	const finishFailHandler = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Card title='Авторизация' style={{ width: 350 }}>
			<Form name='auth' onFinish={finishHandler} onFinishFailed={finishFailHandler}>
				<Item name='email' rules={[{ required: true, message: 'Пожалуйста введите почту!' }]}>
					<Input placeholder='Email' />
				</Item>
				<Item name='password' rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}>
					<Password placeholder='Пароль' />
				</Item>
				<Button type='primary' htmlType='submit'>
					Войти
				</Button>
			</Form>
		</Card>
	)
}


export default connect(null, { createUser })(Login)
