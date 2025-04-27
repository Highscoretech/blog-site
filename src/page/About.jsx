import React from 'react';

export default function About() {
  return (
    <div className='pt-28 px-4 md:px-8 max-w-7xl mx-auto'>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          About Tech Blog
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Your trusted source for the latest technology news, reviews, and insights.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">Our Mission</h2>
          <p className="text-text-secondary">
            We strive to provide accurate, insightful, and engaging content about the latest 
            technological innovations. Our goal is to help our readers stay informed and make 
            better decisions in the fast-paced world of technology.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Delivering accurate and timely tech news
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Providing in-depth product reviews
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Sharing expert insights and analysis
            </li>
          </ul>
        </div>
        <div className="bg-background-dark/5 rounded-2xl p-8">
          <img 
            src="/assets/about-mission.jpg" 
            alt="Tech Blog Mission" 
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'John Doe',
              role: 'Editor in Chief',
              image: '/assets/team-1.jpg'
            },
            {
              name: 'Jane Smith',
              role: 'Tech Reviewer',
              image: '/assets/team-2.jpg'
            },
            {
              name: 'Mike Johnson',
              role: 'Content Writer',
              image: '/assets/team-3.jpg'
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-background-dark/5">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3 className="font-bold text-text-primary">{member.name}</h3>
              <p className="text-text-secondary">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-8 mb-16">
        {[
          { number: '1000+', label: 'Articles Published' },
          { number: '50K+', label: 'Monthly Readers' },
          { number: '100+', label: 'Product Reviews' },
          { number: '5+', label: 'Years Experience' }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-6 rounded-xl bg-background-dark/5"
          >
            <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-background-dark/5 rounded-2xl p-12 mb-16">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Want to Get in Touch?
        </h2>
        <p className="text-text-secondary mb-6">
          We'd love to hear from you! Whether you have a question about our content,
          want to collaborate, or just want to say hello.
        </p>
        <button 
          onClick={() => window.location.href = '/contact'}
          className="px-8 py-3 bg-primary text-white rounded-full font-medium
                   transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                   shadow-[0_4px_16px_rgba(10,33,192,0.25)] hover:shadow-[0_6px_20px_rgba(10,33,192,0.35)]"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
