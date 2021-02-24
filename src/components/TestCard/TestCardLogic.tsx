import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteTest } from '../../store/tests/testsActions'
import { RootState } from '../../store/types'
import { TestCardProps } from './TestCard'

const TestCardLogic = ({ data }: TestCardProps) => {
	const isAdmin = useSelector((state: RootState) => state.auth.user?.info.admin)
	const dispatch = useDispatch()
	const history = useHistory()

	const deleteHandler = () => {
		dispatch(deleteTest(data.id))
	}
	const startTestHandler = () => {
		history.push(`/tests/${data.id}`)
	}

	return {
		isAdmin,
		deleteHandler,
		startTestHandler
	}
}

export { TestCardLogic }
