import React, { useState } from "react"
import { useHistory, Redirect } from "react-router-dom"
import { Card, Form, Input, Button, Space } from "antd"
import { connect, useSelector } from "react-redux"
import { createUser, loginUser } from "../../actions/authActions"

const { Item } = Form
const { Password } = Input

const Login = ({ createUser, loginUser }) => {
  const history = useHistory()
  const [hasAccount, setHasAccount] = useState(false)
  const [form] = Form.useForm()
  const loading = useSelector(state => state.auth.isLoading)

  const submitHandler = async values => {
    try {
      await loginUser(values)
      console.log("created must redirect to home")
      history.push("/")
    } catch (e) {}
  }

  const finishFailHandler = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  const hasAccountHandler = () => {
    form.resetFields()
    setHasAccount(!hasAccount)
  }

  return (
    <Card
      title={hasAccount ? "Авторизация" : "Регистрация"}
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
            rules={[{ required: true, message: "Пожалуйста введите имя!" }]}
          >
            <Input placeholder='Имя' />
          </Item>
        )}
        <Item
          name='email'
          rules={[{ required: true, message: "Пожалуйста введите почту!" }]}
        >
          <Input placeholder='Email' />
        </Item>
        <Item
          name='password'
          rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
        >
          <Password placeholder='Пароль' />
        </Item>
        <Space size='small'>
          <Button type='primary' htmlType='submit' loading={loading}>
            {hasAccount ? "Войти" : "Зарегестрироваться"}
          </Button>
          <Button onClick={hasAccountHandler}>
            {hasAccount ? "Создать аккаунт" : "Есть аккаунт ?"}
          </Button>
        </Space>
      </Form>
    </Card>
  )
}

export default connect(null, { createUser, loginUser })(Login)
