import { BrowserRouter as Router } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { useRoutes } from './routes/routes'

const App = () => {
	const isAuth = !!useSelector(state => state.auth.token)
	const routes = useRoutes(isAuth)
	
	return <Router>{routes}</Router>
}

export default connect(null, null)(App)
