import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      {/* TODO: Move routing configuration to a separate file (e.g., routes.tsx) for better maintainability. */}
      {/* TODO: Implement a Layout component (e.g., MainLayout) to wrap routes and avoid repetition of common UI elements. */}
      {/* TODO: Add ProtectedRoute wrapper for authenticated pages like /dashboard. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App