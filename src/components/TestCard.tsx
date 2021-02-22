import React from 'react'
import { Card, Typography, Button, Popconfirm } from 'antd'
import { ITest } from '../store/types/tests'
import { DeleteTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/types'
import { deleteTest } from '../store/tests/testsActions'
import { Link, useHistory } from 'react-router-dom'
interface TestCardProps {
	data: ITest
}

const TestCard = ({ data }: TestCardProps) => {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.info.admin)
	const dispatch = useDispatch()
	const history = useHistory()

	const deleteHandler = (id: string) => {
		dispatch(deleteTest(id))
	}
	const startTestHandler = (id: string) => {
		history.push(`/tests/${id}`)
	}

	return (
		<Card 
			title={data.title}
			extra={
				isAdmin ? (
				<Popconfirm
					title='Удалить этот тест?'
					onConfirm={() => deleteHandler(data.id)}
					okText='Да'
					cancelText='Нет'
					placement='bottomRight'
					okButtonProps={{danger: true}}
				>
						<Button type="link" size="small">
							<DeleteTwoTone twoToneColor='#ff4d4f' />
						</Button>
				</Popconfirm>
				) : null
			}
			size="small"
			style={{width: 300}}
		>
			<Typography.Paragraph
				ellipsis={{ rows: 3, expandable: true, symbol: 'еще' }}
			>
				Предмет: {data.subject}
			</Typography.Paragraph>
			<Typography.Paragraph>
				Вопросов: {data.questions.length}
			</Typography.Paragraph>
			<Link to={{pathname: `/tests/${data.id}`}}>
				<Button type="primary">
					Пройти
				</Button>
			</Link>
		</Card>
	)
}
export default TestCard
