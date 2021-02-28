import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "antd"
import { finishTest, getTest } from "../../store/tests/testsActions"
import { RootState } from "../../store/types"
import { RouteParams } from "../../store/types/tests"


const TestingLogic = () => {
	const { id } = useParams<RouteParams>()
	const { isLoading, test } = useSelector((state: RootState) => state.tests)
	const history = useHistory()
	const dispatch = useDispatch()
	const [form] = Form.useForm()

	const finishHandler = (values: object) => {
		dispatch(finishTest(values))
		history.push('/tests')
	}

	const fetchTest = () => {
		dispatch(getTest(id))
	}

	return {
		isLoading,
		test,
		form,
		finishHandler,
		fetchTest
	}
}

export default TestingLogic