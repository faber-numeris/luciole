import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <span className="logo-text">Luciole</span>
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <Link to="/features" className="mobile-nav-link">Features</Link>
          <Link to="/pricing" className="mobile-nav-link">Pricing</Link>
          <Link to="/about" className="mobile-nav-link">About</Link>
          <Link to="/login" className="mobile-nav-link">Sign In</Link>
          <Link to="/signup" className="mobile-nav-link btn btn-primary">Get Started</Link>
        </div>
      )}
    </nav>
  )
}