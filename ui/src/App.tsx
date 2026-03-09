import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import {AppRoutes} from './routes'

function App() {
    return (
        <Router>
            {/* TODO: Add ProtectedRoute wrapper for authenticated pages like /dashboard. */}
            <AppRoutes/>
        </Router>
    )
}

export default App