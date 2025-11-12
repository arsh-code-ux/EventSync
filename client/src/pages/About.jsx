import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredValue, setHoveredValue] = useState(null);

  const values = [
    { 
      icon: '💡', 
      title: 'Innovation', 
      description: 'Encouraging creative thinking and cutting-edge solutions',
      color: 'from-cyan-500 to-blue-500',
      features: ['Research Labs', 'Hackathons', 'Innovation Centers']
    },
    { 
      icon: '🤝', 
      title: 'Collaboration', 
      description: 'Building strong partnerships and teamwork',
      color: 'from-blue-500 to-purple-500',
      features: ['Team Projects', 'Industry Partnerships', 'Peer Learning']
    },
    { 
      icon: '🎯', 
      title: 'Excellence', 
      description: 'Striving for the highest standards in everything we do',
      color: 'from-purple-500 to-pink-500',
      features: ['Quality Education', 'Award Programs', 'Best Practices']
    },
    { 
      icon: '🌍', 
      title: 'Global Perspective', 
      description: 'Preparing students for an interconnected world',
      color: 'from-pink-500 to-red-500',
      features: ['International Programs', 'Cultural Exchange', 'Global Network']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science, Final Year',
      image: '👩‍💻',
      quote: 'The events and opportunities here have shaped me into a confident professional. The hackathons and tech talks opened doors I never imagined!',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Business Administration, Alumni',
      image: '👨‍💼',
      quote: 'The leadership skills I gained through organizing college events have been invaluable in my career. Forever grateful for this experience!',
      rating: 5
    },
    {
      name: 'Anjali Patel',
      role: 'Arts & Design, 3rd Year',
      image: '👩‍🎨',
      quote: 'This college celebrates creativity and diversity. The cultural fests and workshops have helped me discover my true passion and voice!',
      rating: 5
    }
  ];

  const achievements = [
    { year: '2024', title: 'Best Innovation Award', category: 'Technology' },
    { year: '2023', title: 'Excellence in Education', category: 'Academics' },
    { year: '2023', title: 'Top Placement Record', category: 'Career' },
    { year: '2022', title: 'Research Excellence', category: 'Science' }
  ];

  const facilities = [
    { icon: '🏛️', name: 'Modern Campus', description: 'State-of-the-art infrastructure' },
    { icon: '📚', name: 'Digital Library', description: '50,000+ books & journals' },
    { icon: '💻', name: 'Tech Labs', description: 'Advanced computer labs' },
    { icon: '🎭', name: 'Auditorium', description: '1000+ seating capacity' },
    { icon: '🏃', name: 'Sports Complex', description: 'Indoor & outdoor facilities' },
    { icon: '🍽️', name: 'Cafeteria', description: 'Multi-cuisine dining' }
  ];

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % facilities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 text-white py-32">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaC0ydjJoMnptMCAwaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-500/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-500/10 rounded-full animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="text-7xl mb-4 animate-bounce-slow">🎓</div>
            </div>
            <h1 className="text-7xl font-extrabold mb-6 animate-slide-down">
              Welcome to EventSync College
            </h1>
            <p className="text-2xl text-slate-200 max-w-3xl mx-auto mb-8 animate-slide-up">
              Where Innovation Meets Excellence
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 animate-fade-in">
              Empowering minds, building futures, and creating leaders who transform the world
            </p>
            <div className="flex justify-center gap-4 animate-fade-in">
              <Link to="/events">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105">
                  Explore Events
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Animated Achievements Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-teal-900 bg-clip-text text-transparent mb-4">
            Our Journey of Excellence
          </h2>
          <p className="text-gray-600 text-lg">Milestones that define our success</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-teal-500"></div>
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">{achievement.year}</div>
                  <div className="text-xl font-semibold text-gray-800 mb-2">{achievement.title}</div>
                  <div className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {achievement.category}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                {index + 1}
              </div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Facilities Grid */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-teal-900 bg-clip-text text-transparent mb-4">
              World-Class Facilities
            </h2>
            <p className="text-gray-600 text-lg">Everything you need to succeed</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 text-center transform transition-all duration-500 cursor-pointer ${
                  activeFeature === index
                    ? 'scale-110 shadow-2xl ring-4 ring-cyan-500'
                    : 'hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-6xl mb-4">{facility.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{facility.name}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tabbed Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {['overview', 'mission', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-6 px-6 text-center font-bold text-lg transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-12">
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Our Community</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Our college is a <span className="text-cyan-600 font-semibold">vibrant hub of learning and innovation</span>, where students from diverse backgrounds come together to pursue excellence. Founded with a vision to transform education, we've been at the forefront of academic achievement for over two decades.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We believe in <span className="text-cyan-600 font-semibold">holistic development</span> that goes beyond textbooks. Our state-of-the-art facilities, experienced faculty, and dynamic event culture create an environment where students thrive academically, socially, and professionally.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-cyan-600 mb-4">What Sets Us Apart</h3>
                    <ul className="space-y-3">
                      {['Industry-aligned curriculum', 'World-class infrastructure', '100+ annual events & workshops', 'Strong placement record', 'Global partnerships', 'Research opportunities'].map((item, i) => (
                        <li key={i} className="flex items-start group cursor-pointer">
                          <span className="text-cyan-500 mr-3 text-2xl group-hover:scale-125 transition-transform">✓</span>
                          <span className="text-gray-700 group-hover:text-cyan-600 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-10 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative z-10">
                      <div className="text-7xl mb-6 group-hover:rotate-12 transition-transform duration-300">🎯</div>
                      <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                      <p className="text-cyan-50 leading-relaxed text-lg">
                        To provide world-class education that empowers students to excel in their chosen fields, fostering critical thinking, innovation, and ethical leadership. We aim to create responsible global citizens who contribute positively to society and drive meaningful change.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-500 to-slate-700 rounded-3xl p-10 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative z-10">
                      <div className="text-7xl mb-6 group-hover:rotate-12 transition-transform duration-300">🔭</div>
                      <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                      <p className="text-teal-50 leading-relaxed text-lg">
                        To be a leading institution recognized globally for innovation, research excellence, and producing graduates who shape the future. We envision a world where our alumni are industry leaders, entrepreneurs, and change-makers driving progress across all sectors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Core Values That Drive Us</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{value.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600 mb-4">{value.description}</p>
                        <div className="space-y-2">
                          {value.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-500">
                              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Testimonials with Ratings */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-teal-900 bg-clip-text text-transparent">
            Student Voices
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Hear what our students have to say</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="text-6xl mr-4 group-hover:scale-110 transition-transform duration-300">{testimonial.image}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">{testimonial.name}</h4>
                      <p className="text-sm text-cyan-600 font-semibold">{testimonial.role}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-lg">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Animation */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-7xl mb-6 animate-bounce-slow">🚀</div>
          <h2 className="text-5xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-slate-200 mb-10 text-xl leading-relaxed">
            Discover why events are crucial for your college experience and personal growth. Start your journey of transformation today!
          </p>
          <Link to="/why-events">
            <button className="group bg-white text-slate-800 px-12 py-5 rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-xl transform hover:scale-110 flex items-center gap-3 mx-auto">
              <span>Learn More About Events</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
