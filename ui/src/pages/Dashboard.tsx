import {Link} from 'react-router-dom'

// TODO: Refactor common dashboard structure (sidebar/nav) into a SidebarLayout component.
// TODO: Replace hardcoded user profile and company info with data from Redux/API.
export default function Dashboard() {
  return (
    <main id="dashboard">
      <aside>
        <nav>
          <ul className="user-profile">
            <li>
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=orange&color=fff" alt="Avatar" className="avatar" />
              <div className="user-info">
                <strong>John Doe</strong>
                <small>Acme Corp</small>
              </div>
            </li>
          </ul>
          <ul className="navigation">
            <li><Link to="/dashboard">Overview</Link></li>
            <li><Link to="/organizations">Organizations</Link></li>
            <li><Link to="/tracked">Tracked Objects</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <hr />
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>
      </aside>
      <section>
        <article>
          <header>
            <hgroup>
              <h1>Overview</h1>
              <h2>Welcome back</h2>
            </hgroup>
          </header>
        </article>
      </section>
    </main>
  )
}
