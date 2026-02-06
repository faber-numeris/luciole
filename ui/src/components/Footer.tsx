export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Luciole</h3>
            <p className="footer-description">
              Empowering businesses with modern solutions for growth, efficiency, and success.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><a href="/features" className="footer-link">Features</a></li>
                <li><a href="/pricing" className="footer-link">Pricing</a></li>
                <li><a href="/integrations" className="footer-link">Integrations</a></li>
                <li><a href="/api" className="footer-link">API</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><a href="/about" className="footer-link">About</a></li>
                <li><a href="/careers" className="footer-link">Careers</a></li>
                <li><a href="/blog" className="footer-link">Blog</a></li>
                <li><a href="/press" className="footer-link">Press</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-list">
                <li><a href="/help" className="footer-link">Help Center</a></li>
                <li><a href="/contact" className="footer-link">Contact</a></li>
                <li><a href="/status" className="footer-link">Status</a></li>
                <li><a href="/docs" className="footer-link">Documentation</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-list">
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms of Service</a></li>
                <li><a href="/security" className="footer-link">Security</a></li>
                <li><a href="/compliance" className="footer-link">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 Luciole. All rights reserved.
            </p>
            <div className="footer-social">
              <a href="/twitter" className="social-link" aria-label="Twitter">𝕏</a>
              <a href="/linkedin" className="social-link" aria-label="LinkedIn">in</a>
              <a href="/github" className="social-link" aria-label="GitHub">⚡</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}