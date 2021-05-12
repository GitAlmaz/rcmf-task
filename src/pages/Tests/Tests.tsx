import React, { useEffect } from 'react'
import {
	Form,
	Empty,
	Button,
	Spin,
	PageHeader,
	Input,
	InputNumber,
	Select,
	Alert,
	Space,
	Result
} from 'antd'
import {
	DownloadOutlined,
	FileAddOutlined,
	MinusCircleOutlined,
	PlusOutlined
} from '@ant-design/icons'
import CreateModal from '../../components/CreateModal'
import TestCard from '../../components/TestCard/TestCard'
import { useHistory } from 'react-router-dom'
import TestsLogic from './TestsLogic'

const Tests = () => {
	const history = useHistory()
	const {
		tests,
		isLoading,
		isAdmin,
		result,
		test,
		showResult,
		modalVisible,
		form,
		Option,
		handleOk,
		handleToggleModal,
		closeResultHandler,
		fetchTests
	} = TestsLogic()
	useEffect(() => {
		fetchTests()
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
					<Form name='createTest' form={form} size='small'>
						<Form.Item
							name='title'
							rules={[
								{ required: true, message: 'Пожалуйста заполните данное поле.' }
							]}
						>
							<Input placeholder='Заголовк теста' />
						</Form.Item>
						<Form.Item
							name='subject'
							rules={[
								{ required: true, message: 'Пожалуйста заполните данное поле.' }
							]}
						>
							<Input placeholder='Предмет' />
						</Form.Item>
						<Form.Item
							name='test_time'
							label="Время на тест (в секундах)"
							rules={[
								{ required: true, message: 'Пожалуйста заполните данное поле.' }
							]}
						>
							<InputNumber size="middle" min={60} />
						</Form.Item>
						<Form.List
							name='questions'
							rules={[
								{
									validator: async (_, names) => {
										if (!names || names.length < 3) {
											return Promise.reject(new Error('Как минимум 3 вопроса'))
										}
									}
								}
							]}
						>
							{(fields, { add, remove }, { errors }) => (
								<>
									{fields.map((field, index) => {
										const answers = ['a_1', 'a_2', 'a_3', 'a_4']
										return (
											<Form.Item
												key={field.key}
												style={{
													border: '1px solid #d9d9d9',
													borderRadius: 2,
													padding: 10
												}}
											>
												<Form.Item
													{...field}
													name={[field.name, 'q']}
													fieldKey={[field.fieldKey, 'q']}
													rules={[
														{ required: true, message: 'Укажите вопрос' }
													]}
												>
													<Input placeholder={`Вопрос ${index + 1}`} />
												</Form.Item>
												{answers.map((item, idx) => (
													<Form.Item
														key={'answer' + item}
														name={[field.name, item]}
														fieldKey={[field.fieldKey, item]}
														rules={[
															{
																required: true,
																message: `Укажите ответ ${idx + 1}`
															}
														]}
														label={answers[idx]}
													>
														<Input />
													</Form.Item>
												))}
												<Form.Item
													name={[field.name, 'r_a']}
													fieldKey={[field.fieldKey, 'r_a']}
													rules={[
														{
															required: true,
															message: 'Выберите правильный ответ'
														}
													]}
													label='Правильный ответ'
												>
													<Select>
														{answers.map((item, i) => (
															<Option key={item + i} value={item}>
																{item}
															</Option>
														))}
													</Select>
												</Form.Item>
												<Button
													type='dashed'
													onClick={() => remove(field.name)}
													icon={<MinusCircleOutlined />}
												>
													Удалить
												</Button>
											</Form.Item>
										)
									})}
									<Form.Item>
										<Button
											type='dashed'
											onClick={() => add()}
											icon={<PlusOutlined />}
										>
											Добавить вопрос
										</Button>
									</Form.Item>
									{errors.length ? (
										<Alert message={errors} type='error' />
									) : null}
								</>
							)}
						</Form.List>
					</Form>
				</CreateModal>
			) : null}
			{tests.length ? (
				<>
					{showResult ? (
						result! > 80 ? (
							<Result
								status='success'
								title={`Вы успешно прошли тест ${test.title}!`}
								subTitle={`Вы набрали ${result}% правильных ответов!`}
								extra={[
									<Button
										type='ghost'
										key='console'
										onClick={closeResultHandler}
									>
										Закрыть
									</Button>,
									<a
										href="../../assets/sertif.pdf"
										key='download'
										download
									>
										Скачать сертификат
									</a>
								]}
							/>
						) : (
							<Result
								status='error'
								title={`Вы не прошли тест ${test.title}!`}
								subTitle={`Вы набрали ${result}% правильных ответов!`}
								extra={[
									<Button
										type='ghost'
										key='console'
										onClick={closeResultHandler}
									>
										Закрыть
									</Button>
								]}
							/>
						)
					) : null}
					<PageHeader
						onBack={() => history.push('/')}
						title='Список тестов'
						style={{ padding: '16px 0' }}
						extra={
							isAdmin
								? [
										<Button
											key='createTask'
											type='primary'
											onClick={handleToggleModal}
											icon={<FileAddOutlined />}
										>
											Создать тест
										</Button>
								  ]
								: null
						}
					></PageHeader>
					<Space wrap align='start'>
						{tests.map(test => {
							return <TestCard key={test.id} data={test} />
						})}
					</Space>
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

export default Tests
