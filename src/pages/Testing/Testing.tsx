import React, { useEffect } from 'react'
import {
	Form,
	Button,
	PageHeader,
	Skeleton,
	Radio,
	Card,
	Typography
} from 'antd'
import { useHistory } from 'react-router-dom'
import TestingLogic from './TestingLogic'
const styles = {
	radio: {
		display: 'block',
		padding: '10px 0'
	},
	radioGroup: {
		marginLeft: 20
	}
}
const Testing = () => {
	const history = useHistory()
	const { isLoading, test, form, finishHandler, fetchTest } = TestingLogic()
	useEffect(() => {
		fetchTest()
	}, [])
	return isLoading ? (
		<Skeleton active />
	) : (
		<>
			<PageHeader
				onBack={() => history.push('/tests')}
				title='Прохождение теста'
				style={{ padding: '16px 0' }}
			></PageHeader>
			<Card>
				<Typography.Title level={3}>{test.title}</Typography.Title>
				<Form
					name='createTest'
					form={form}
					size='large'
					layout='vertical'
					onFinish={finishHandler}
				>
					{test.questions.map((quesiton, index) => (
						<Form.Item
							key={quesiton.q + index}
							name={index}
							rules={[{ required: true, message: 'Выберите ответ.' }]}
							label={quesiton.q}
						>
							<Radio.Group style={{ ...styles.radioGroup }}>
								<Radio style={{ ...styles.radio }} value={quesiton.a_1}>
									{quesiton.a_1}
								</Radio>
								<Radio style={{ ...styles.radio }} value={quesiton.a_2}>
									{quesiton.a_2}
								</Radio>
								<Radio style={{ ...styles.radio }} value={quesiton.a_3}>
									{quesiton.a_3}
								</Radio>
								<Radio style={{ ...styles.radio }} value={quesiton.a_4}>
									{quesiton.a_4}
								</Radio>
							</Radio.Group>
						</Form.Item>
					))}
					<Form.Item>
						<Button type='primary' htmlType='submit' loading={isLoading}>
							Завершить
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</>
	)
}

export default Testing
