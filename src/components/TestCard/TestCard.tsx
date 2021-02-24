import React from 'react'
import { Card, Typography, Button, Popconfirm } from 'antd'
import { ITest } from '../../store/types/tests'
import { DeleteTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import { deleteTest } from '../../store/tests/testsActions'
import { Link, useHistory } from 'react-router-dom'
import { TestCardLogic } from './TestCardLogic'

export interface TestCardProps {
	data: ITest
}

const TestCard = ({ data }: TestCardProps) => {
	const {
		isAdmin,
		deleteHandler,
		startTestHandler
	} = TestCardLogic({data})

	return (
		<Card 
			title={data.title}
			extra={
				isAdmin ? (
				<Popconfirm
					title='Удалить этот тест?'
					onConfirm={deleteHandler}
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
			{/* <Link to={{pathname: `/tests/${data.id}`}}> */}
				<Button type="primary" onClick={startTestHandler}>
					Пройти
				</Button>
			{/* </Link> */}
		</Card>
	)
}
export default TestCard
