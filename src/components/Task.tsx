import React, { ChangeEvent, memo, useState } from 'react'
import { Card, Popconfirm, Input, Switch, Button, Typography } from 'antd'
import {
	DeleteTwoTone,
	EditOutlined,
	CheckCircleTwoTone,
	ClockCircleTwoTone
} from '@ant-design/icons'
import { ITask, IEditTask } from '../store/types/tasks'

type TaskProps = {
	data: ITask
	onTaskDelete(data: ITask): void
	onTaskEdit(data: DynamicInputState | IEditTask): void
}
type DynamicInputState = {
	[key: string]: string | boolean
}

const Task = ({ data, onTaskDelete, onTaskEdit }: TaskProps) => {
	const [edit, setEdit] = useState(false)
	const editData = {
		id: data.id,
		title: data.title,
		description: data.description,
		status: data.status
	} as DynamicInputState
	const createDate = `${new Date(data.create_date).getDate()}.${new Date(
		data.create_date
	).getMonth()}.${new Date(data.create_date).getFullYear()}`
	
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (typeof event === 'boolean') {
			editData.status = event
		} else {
			const { name, value } = event.target
			editData[name] = value
		}
	}

	return (
		<Card
			title={
				edit ? (
					<Input
						title='Заголовок'
						name='title'
						size='small'
						defaultValue={data.title}
						onChange={changeHandler}
						style={{ width: '90%' }}
					/>
				) : (
					data.title
				)
			}
			style={{ width: '100%' }}
			size='small'
			extra={
				<>
					<a onClick={() => setEdit(!edit)} style={{ marginRight: 10 }}>
						<EditOutlined />
					</a>
					<Popconfirm
						title='Удалить эту задачу?'
						onConfirm={() => onTaskDelete(data)}
						okText='Да'
						cancelText='Нет'
						placement='bottomRight'
					>
						<DeleteTwoTone twoToneColor='#ff4d4f' />
					</Popconfirm>
				</>
			}
		>
			{edit ? (
				<>
					<Input
						name='description'
						size='small'
						placeholder='Описание'
						type='textarea'
						defaultValue={data.description}
						style={{ marginBottom: 5 }}
						onChange={changeHandler}
					/>
					{/* <Typography.Paragraph>
						Статус:
						<Switch
							size='small'
							defaultChecked={data.status}
							style={{ marginLeft: 10 }}
							onChange={changeHandler}
						/>
					</Typography.Paragraph> */}
					<Button
						htmlType='submit'
						size='small'
						type="primary"
						onClick={() => {
							setEdit(!edit)
							onTaskEdit(editData)
						}}
					>
						Изменить
					</Button>
				</>
			) : (
				<>
					<Typography.Paragraph
						ellipsis={{ rows: 3, expandable: true, symbol: 'еще' }}
					>
						{data.description}
					</Typography.Paragraph>
					<Typography.Paragraph>
						Статус:
						{data.status ? (
							<CheckCircleTwoTone
								twoToneColor='#52c41a'
								style={{ marginLeft: 7 }}
							/>
						) : (
							<ClockCircleTwoTone
								twoToneColor='#f3800a'
								style={{ marginLeft: 7 }}
							/>
						)}
					</Typography.Paragraph>
					<Typography.Paragraph style={{ marginBottom: 0 }}>
						Создана:
						{createDate}
					</Typography.Paragraph>
				</>
			)}
		</Card>
	)
}
export default memo(Task, (prev, next) => {
	if (prev.data !== next.data) {
		return false
	} else {
		return true
	}
})
