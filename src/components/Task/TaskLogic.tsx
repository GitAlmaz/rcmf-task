import { ChangeEvent, useState } from "react"
import { DynamicInputState } from "../../store/types"

import {TaskProps} from './Task'

const TaskLogic = ({ data, onTaskDelete, onTaskEdit }: TaskProps) => {
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

	const editableHandler = () => {
		setEdit(!edit)
	}

	const submitEdit = () => {
		setEdit(!edit)
		onTaskEdit(editData)
	}

	const deleteHandler = () => {
		onTaskDelete(data)
	}

	return {
		edit,
		editData,
		createDate,
		changeHandler,
		editableHandler,
		submitEdit,
		deleteHandler
	}
}

export { TaskLogic }