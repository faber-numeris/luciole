import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Business with Modern Solutions
          </h1>
          <p className="hero-subtitle">
            Streamline operations, boost productivity, and scale effortlessly with our comprehensive platform designed for modern enterprises.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Free Trial
            </Link>
            <Link to="/demo" className="btn btn-outline btn-large">
              Request Demo
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-graphic"></div>
        </div>
      </div>
    </section>
  )
}