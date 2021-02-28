import { Form } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTask, deleteTask, editTask, loadTasks } from "../../store/tasks/tasksActions"
import { RootState } from "../../store/types"
import { ICreateTask, IEditTask } from "../../store/types/tasks"


const TasksLogic = () => {
	const dispatch = useDispatch()
	const tasks = useSelector((state: RootState) => state.tasks.tasks)
	const isLoading = useSelector((state: RootState) => state.tasks.isLoading)
	const [modalVisibility, setModalVisibility] = useState<boolean>(false)
	const [form] = Form.useForm()
	
	const submitHandler = async (values: ICreateTask) => {
		try {
			const data: ICreateTask = { ...values, create_date: Date.now() }
			await dispatch(createTask(data))
		} catch (e) {}
	}
	const handleToggleModal = () => {
		setModalVisibility(!modalVisibility)
		form.resetFields()
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

	const onTaskDelete = ({ id }: { id: string }) => dispatch(deleteTask(id))
	const onTaskEdit = (value: IEditTask) => dispatch(editTask(value))
	const fetchTasks = async () => {
		await dispatch(loadTasks())
	}

	return {
		tasks,
		isLoading,
		modalVisibility,
		form,
		handleToggleModal,
		handleOk,
		onTaskDelete,
		onTaskEdit,
		fetchTasks
	}
}

export default TasksLogic