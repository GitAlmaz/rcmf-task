import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form } from 'antd'
import { RootState } from '../../store/types'
import { TUser } from '../../store/types/auth'
import { createUser, loginUser } from '../../store/auth/authActions'

const LoginLogic = () => {
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

	return {
		loading,
		hasAccount,
		form,
		submitHandler,
		finishFailHandler,
		hasAccountHandler
	}
}

export default LoginLogic