import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Select } from "antd"
import { RootState } from "../../store/types"
import { useHistory } from "react-router-dom"
import { ICreateTest } from "../../store/types/tests"
import { createTest, loadTests, resetTest } from "../../store/tests/testsActions"


const TestsLogic = () => {
	const { tests, isLoading } = useSelector((state: RootState) => state.tests)
	const isAdmin = useSelector((state: RootState) => state.auth.user?.info.admin)
	const { result, test, showResult } = useSelector((state: RootState) => state.tests)
	const dispatch = useDispatch()
	const [modalVisible, setModalVisible] = useState(false)
	const [form] = Form.useForm()
	const { Option } = Select

	const submitHandler = async (values: ICreateTest) => {
		try {
			const data: ICreateTest = { ...values }
			dispatch(createTest(data))
		} catch (e) {}
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

	const handleToggleModal = () => {
		setModalVisible(!modalVisible)
		form.resetFields()
	}

	const closeResultHandler = () => {
		dispatch(resetTest())
	}

	const fetchTests = async () => {
		await dispatch(loadTests())
	}

	return {
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
	}
}

export default TestsLogic