import {BrowserRouter as Router} from 'react-router-dom'
import { ReapopProvider } from 'reapop'
import './index.css'
import { AppRoutes } from './routes'

function App() {
  return (
    <ReapopProvider>
      <Router>
        {/* TODO: Add ProtectedRoute wrapper for authenticated pages like /dashboard. */}
        <AppRoutes />
      </Router>
    </ReapopProvider>
  )
}

export default App