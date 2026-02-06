import { useState } from 'react'
import { Sidebar } from './Sidebar'

export function Dashboard() {
  const [activeView, setActiveView] = useState('organizations')

  const renderContent = () => {
    switch (activeView) {
      case 'organizations':
        return (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Organizations</h1>
            <p className="dashboard-subtitle">Manage your organizations and team members</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Organization Overview</h3>
                <p>View and manage all your organizations in one place.</p>
              </div>
              <div className="content-card">
                <h3>Team Members</h3>
                <p>Invite and manage team members across organizations.</p>
              </div>
              <div className="content-card">
                <h3>Permissions</h3>
                <p>Configure access controls and user permissions.</p>
              </div>
            </div>
          </div>
        )
      case 'trackings':
        return (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Trackings</h1>
            <p className="dashboard-subtitle">Monitor and analyze your tracking data</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Real-time Analytics</h3>
                <p>View live tracking data and performance metrics.</p>
              </div>
              <div className="content-card">
                <h3>Historical Reports</h3>
                <p>Access detailed historical tracking reports.</p>
              </div>
              <div className="content-card">
                <h3>Custom Alerts</h3>
                <p>Set up custom alerts for tracking events.</p>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Settings</h1>
            <p className="dashboard-subtitle">Configure your application preferences</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Profile Settings</h3>
                <p>Manage your profile information and preferences.</p>
              </div>
              <div className="content-card">
                <h3>API Configuration</h3>
                <p>Configure API keys and integration settings.</p>
              </div>
              <div className="content-card">
                <h3>Security</h3>
                <p>Manage security settings and authentication.</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  )
}