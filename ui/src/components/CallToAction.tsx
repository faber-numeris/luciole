import { Link } from 'react-router-dom'

export function CallToAction() {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Business?</h2>
          <p className="cta-subtitle">
            Join thousands of companies already using our platform to accelerate growth and streamline operations.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-white btn-large">
              Start Your Free Trial
            </Link>
            <p className="cta-note">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </div>
    </section>
  )
}