import { useState } from 'react'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: 'organizations',
      label: 'Organizations',
      icon: '🏢',
      description: 'Manage organizations'
    },
    {
      id: 'trackings',
      label: 'Trackings',
      icon: '📊',
      description: 'View tracking data'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      description: 'Application settings'
    }
  ]

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-logo">🔥</span>
          {!isCollapsed && <span className="sidebar-title">Luciole</span>}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={`toggle-icon ${isCollapsed ? 'toggle-icon-collapsed' : ''}`}>
            ☰
          </span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-menu-item ${activeView === item.id ? 'sidebar-menu-item-active' : ''}`}
                onClick={() => onViewChange(item.id)}
                title={isCollapsed ? item.description : undefined}
              >
                <span className="menu-item-icon">{item.icon}</span>
                {!isCollapsed && (
                  <div className="menu-item-content">
                    <span className="menu-item-label">{item.label}</span>
                    <span className="menu-item-description">{item.description}</span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">User</span>
              <span className="user-email">user@example.com</span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="user-avatar-collapsed">👤</div>
        )}
      </div>
    </aside>
  )
}