import React, { useEffect } from 'react'
import { Button, PageHeader, Table, Skeleton, Space } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/types'
import { usersLoad } from '../store/users/usersActions'
import { IUserInfo } from '../store/types/users'

const Users: React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { users, isLoading } = useSelector((state: RootState) => state.users)

	const moreHandler = (data: IUserInfo, idx: number) =>
		history.push(`/users/${users[idx].id}`)

	useEffect(() => {
		dispatch(usersLoad())
	}, [])

	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			sorter: true,
			render: (name: any) => `${name}`
		},
		{
			title: 'Почта',
			dataIndex: 'email'
		},
		{
			title: 'Пароль',
			dataIndex: 'password'
		},
		{
			title: '',
			dataIndex: '',
			key: 'x',
			render: (data: any, _: any, index: number) => (
				<Space size='middle'>
					<Button type='link' onClick={() => moreHandler(data, index)}>
						Подробнее
					</Button>
					{/* <Button type='link' danger>
						Удалить
					</Button> */}
				</Space>
			),
			width: '20%'
		}
	]

	return (
		<>
			<PageHeader
				onBack={() => history.push('/')}
				title='Список пользователей'
				style={{ padding: '16px 0' }}
				// extra={[
				// 	<Button key='createTask' type='primary' icon={<UserAddOutlined />}>
				// 		Добавить пользователя
				// 	</Button>
				// ]}
			></PageHeader>
			<Table
				loading={isLoading}
				columns={columns}
				dataSource={users.map(user => user.info)}
				rowKey={record => record.email}
			/>
		</>
	)
}

export default Users
