import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Empty, Button, Spin, PageHeader, Input, Select, Alert } from 'antd'
import { FileAddOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { createTest, loadTests } from '../store/tests/testsActions'
import { ICreateTest, ITest } from '../store/tests/testsReducer'
import CreateModal from '../components/CreateModal'
import { RootState } from '../store'
import TestCard from '../components/TestCard'

const Tasks = () => {
	const tests = useSelector((state: RootState) => state.tests.tests)
	const isAdmin = useSelector((state: RootState) => state.auth.user?.info.admin)
	const isLoading = useSelector((state: RootState) => state.tests.isLoading)
	const dispatch = useDispatch()
	const [modalVisible, setModalVisible] = useState(false)
	const [form] = Form.useForm()
	const { Option } = Select

	const submitHandler = async (values: ICreateTest) => {
		try {
			const data: ICreateTest = { ...values }
			dispatch(createTest(data))
		} catch (e) {}
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

	const handleToggleModal = () => {
		console.log(isAdmin)
		setModalVisible(!modalVisible)
		form.resetFields()
	}

	useEffect(() => {
		;(async () => await dispatch(loadTests()))()
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
			{isAdmin ? (
				<CreateModal
					isModalVisible={modalVisible}
					title='Создание теста'
					handleOk={handleOk}
					handleCancel={handleToggleModal}
					okText='Создать'
					cancelText='Отменить'
				>
					<Form name='createTest' form={form} size="small">
						<Form.Item name='title' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
							<Input placeholder='Заголовк теста' />
						</Form.Item>
						<Form.Item name='subject' rules={[{ required: true, message: 'Пожалуйста заполните данное поле.' }]}>
							<Input placeholder='Предмет' />
						</Form.Item>
						<Form.List
							name="questions"
							rules={[
								{
									validator: async (_, names) => {
										if (!names || names.length < 3) {
											return Promise.reject(new Error('Как минимум 3 вопроса'));
										}
									},
								},
							]}	
						>
							{(fields, {add, remove}, {errors}) => (
								<>
									{fields.map((field, index) => {
										const answers = ['a_1', 'a_2', 'a_3', 'a_4']
										return (
											<Form.Item key={field.key} style={{border: '1px solid #d9d9d9', borderRadius: 2, padding: 10}}>
												<Form.Item
													{...field}
													name={[field.name, 'q']}
													fieldKey={[field.fieldKey, 'q']}
													rules={[{ required: true, message: 'Укажите вопрос' }]}
												>
													<Input placeholder={`Вопрос ${index+1}`}/>
												</Form.Item>
												{answers.map((item, idx) => (
													<Form.Item
														key={'answer' + item}
														name={[field.name, item]}
														fieldKey={[field.fieldKey, item]}
														rules={[{ required: true, message: `Укажите ответ ${idx + 1}` }]}
														label={answers[idx]}
													>
														<Input />
													</Form.Item>
												))}
												<Form.Item
													name={[field.name, 'r_a']}
													fieldKey={[field.fieldKey, 'r_a']}
													rules={[{ required: true, message: 'Выберите правильный ответ' }]}
													label="Правильный ответ"
												>
													<Select>
														{answers.map((item, i) => (
															<Option key={item+i} value={item}>{item}</Option>
														))}
													</Select>
												</Form.Item>
												<Button
													type="dashed"
													onClick={() => remove(field.name)}
													icon={
														<MinusCircleOutlined />
													}
												>
													Удалить
												</Button>
											</Form.Item>
										)
									})}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											icon={<PlusOutlined />}
										>
											Добавить вопрос
										</Button>
									</Form.Item>
									{errors.length ? <Alert message={errors} type="error" /> : null}
								</>
							)}
						</Form.List>
					</Form>
				</CreateModal>
			) : null}

			{tests.length ? (
				<>
					<PageHeader
						onBack={() => window.history.back()}
						title='Тесты'
						style={{ padding: '16px 0' }}
						extra={isAdmin ? [
							<Button key='createTask' type='primary' onClick={handleToggleModal} icon={<FileAddOutlined />}>
								Создать тест
							</Button>
						] : null}
					></PageHeader>
					{tests.map((test) => {
						return (
							<TestCard key={test.id} data={test} />
						)
					})}
				</>
			) : (
				<Empty
					image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
					imageStyle={{
						height: 120
					}}
					description={<span>Список тестов пуст</span>}
				>
					{isAdmin ? (
						<Button type='primary' onClick={handleToggleModal}>
							Создать
						</Button>
					) : null}
				</Empty>
			)}
		</>
	)
}

export default Tasks
