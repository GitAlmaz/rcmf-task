import React from 'react'
import { Card, Typography } from 'antd'
import { ITest } from '../store/tests/testsReducer'

interface TestCardProps {
	data: ITest
}

const TestCard = ({data}: TestCardProps) => {
	return (
		<Card
			title={data.title}
		>
			<Typography.Paragraph
				ellipsis={{ rows: 3, expandable: true, symbol: 'еще' }}
			>
				Предмет: {data.subject}
			</Typography.Paragraph>
			<Typography.Paragraph style={{ marginBottom: 0 }}>
				Вопросов: {data.questions.length}
			</Typography.Paragraph>
		</Card>
	)
}
export default TestCard
