import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes/routes'

const App = () => {
	const isAuth = () => {
    const token = localStorage.getItem('token')
		return token ? true : false
	}
	const routes = useRoutes(isAuth())
	return <Router>{routes}</Router>
}

export default App
