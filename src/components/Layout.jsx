import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">SPACEX</h1>
          </div>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Launches
            </Link>
            <Link 
              to="/visualizations" 
              className={`nav-link ${location.pathname === '/visualizations' ? 'active' : ''}`}
            >
              Analytics
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <span>© 2024 SpaceX. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout

