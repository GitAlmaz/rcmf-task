import React from 'react'
import { Card } from 'antd'

export default ({data}) => (
	<Card title={data.title} style={{ width: 300 }}>
		<p>
			Описание карточки: <br/>
			{ data.description }
		</p>
		<p>
			Статус карточки: <br/>
			{ data.status ? 'Выполнено' : 'Ожидание' }
		</p>
	</Card>
)