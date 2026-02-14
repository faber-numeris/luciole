import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Organizations from "./pages/Organizations.tsx";
import Settings from "./pages/Settings.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="organizations" element={<Organizations />} />
            <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App