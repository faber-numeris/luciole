export function Features() {
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Optimized performance that scales with your business needs, ensuring smooth operations even during peak loads.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance certifications to keep your data safe and meet regulatory requirements.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Real-time insights and customizable dashboards to make data-driven decisions with confidence.'
    },
    {
      icon: '🤝',
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock to help you succeed and resolve any issues quickly.'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Everything You Need to Succeed</h2>
          <p className="features-subtitle">
            Powerful features designed to help you grow faster, work smarter, and achieve more.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}