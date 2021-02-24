import React, { ChangeEvent, memo, useState } from 'react'
import { Card, Popconfirm, Input, Switch, Button, Typography } from 'antd'
import {
	DeleteTwoTone,
	EditOutlined,
	CheckCircleTwoTone,
	ClockCircleTwoTone
} from '@ant-design/icons'
import { ITask, IEditTask } from '../../store/types/tasks'
import { DynamicInputState } from '../../store/types'
import { TaskLogic } from './TaskLogic'

export type TaskProps = {
	data: ITask
	onTaskDelete(data: ITask): void
	onTaskEdit(data: DynamicInputState | IEditTask): void
}

const Task = ({ data, onTaskDelete, onTaskEdit }: TaskProps) => {
	const {
		edit,
		createDate,
		changeHandler,
		editableHandler,
		submitEdit,
		deleteHandler
	} = TaskLogic({ data, onTaskDelete, onTaskEdit })

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
					<a onClick={editableHandler} style={{ marginRight: 10 }}>
						<EditOutlined />
					</a>
					<Popconfirm
						title='Удалить эту задачу?'
						onConfirm={deleteHandler}
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
					<Button
						htmlType='submit'
						size='small'
						type='primary'
						onClick={submitEdit}
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
