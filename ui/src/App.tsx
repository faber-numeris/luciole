import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

// TODO: Decide between TanStack Query and Redux Toolkit Query. Using both adds unnecessary complexity and bundle size.
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* TODO: Move routing configuration to a separate file (e.g., routes.tsx) for better maintainability. */}
      {/* TODO: Implement a Layout component (e.g., MainLayout) to wrap routes and avoid repetition of common UI elements. */}
      {/* TODO: Add ProtectedRoute wrapper for authenticated pages like /dashboard. */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App