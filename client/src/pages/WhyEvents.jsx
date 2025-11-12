import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WhyEvents = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedBenefit, setExpandedBenefit] = useState(null);

  const benefits = [
    {
      emoji: '🤝',
      category: 'social',
      title: 'Networking & Collaboration',
      shortDesc: 'Build lasting relationships with peers, mentors, and industry professionals.',
      fullDesc: 'Events create natural opportunities for teamwork and meaningful connections. From group projects to hackathons, you\'ll collaborate with diverse minds, expanding your professional network and gaining lifelong friendships.',
      stats: '85% of jobs are filled through networking',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      emoji: '💡',
      category: 'skills',
      title: 'Skill Development',
      shortDesc: 'Enhance leadership, communication, and problem-solving abilities.',
      fullDesc: 'Hands-on experience in organizing and participating builds real-world confidence. Whether you\'re leading a team, presenting ideas, or solving challenges under pressure, events provide practical skill-building opportunities.',
      stats: '92% employers value soft skills',
      color: 'from-purple-500 to-pink-500'
    },
    {
      emoji: '🌱',
      category: 'personal',
      title: 'Personal Growth',
      shortDesc: 'Step out of your comfort zone and discover new passions.',
      fullDesc: 'Events foster creativity, adaptability, and resilience in diverse environments. By trying new things, you uncover hidden talents, build self-confidence, and develop a growth mindset essential for success.',
      stats: '3x more confident participants',
      color: 'from-green-500 to-emerald-500'
    },
    {
      emoji: '📚',
      category: 'skills',
      title: 'Real-World Learning',
      shortDesc: 'Apply classroom knowledge in practical settings.',
      fullDesc: 'Workshops, seminars, and competitions provide valuable industry insights. Bridge the gap between theory and practice, understanding how concepts work in real scenarios and what employers actually look for.',
      stats: '78% better job readiness',
      color: 'from-orange-500 to-red-500'
    },
    {
      emoji: '🎯',
      category: 'social',
      title: 'Community Building',
      shortDesc: 'Foster a sense of belonging and campus spirit.',
      fullDesc: 'Cultural fests and sports competitions create memorable experiences and strong bonds. Shared experiences during events build a supportive community that lasts well beyond your college years.',
      stats: '4.2/5 student satisfaction',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      emoji: '🚀',
      category: 'career',
      title: 'Career Preparation',
      shortDesc: 'Gain competitive advantages for future careers.',
      fullDesc: 'Event participation demonstrates initiative, leadership, and well-roundedness to employers. Your involvement shows you\'re proactive, can handle responsibility, and possess skills beyond academic achievement.',
      stats: '2.5x better placement rate',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      emoji: '🎨',
      category: 'personal',
      title: 'Creative Expression',
      shortDesc: 'Showcase your talents and explore artistic sides.',
      fullDesc: 'Cultural and artistic events provide platforms to express yourself, whether through performance, design, writing, or other creative outlets. Discover and nurture your creative potential in supportive environments.',
      stats: '67% find new hobbies',
      color: 'from-pink-500 to-rose-500'
    },
    {
      emoji: '🏆',
      category: 'career',
      title: 'Recognition & Achievement',
      shortDesc: 'Build your portfolio with certificates and awards.',
      fullDesc: 'Competitions and achievement-based events add substantial weight to your resume. Win awards, earn certificates, and build a portfolio that makes you stand out in job applications and higher education pursuits.',
      stats: '45% more interview calls',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      emoji: '🌍',
      category: 'skills',
      title: 'Cultural Awareness',
      shortDesc: 'Experience diversity and develop global perspectives.',
      fullDesc: 'Events celebrating different cultures, backgrounds, and ideas broaden your worldview. Develop cultural sensitivity and global awareness crucial for working in diverse, international environments.',
      stats: '89% improved empathy',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const eventTypes = [
    { icon: '🎤', title: 'Tech Talks & Workshops', desc: 'Learn from industry experts' },
    { icon: '🏆', title: 'Competitions & Hackathons', desc: 'Test your skills' },
    { icon: '🎭', title: 'Cultural Festivals', desc: 'Celebrate diversity' },
    { icon: '⚡', title: 'Sports Events', desc: 'Build team spirit' },
    { icon: '💼', title: 'Career Fairs', desc: 'Meet recruiters' },
    { icon: '🎨', title: 'Art Exhibitions', desc: 'Showcase creativity' }
  ];

  const successStories = [
    {
      name: 'Arjun Mehta',
      achievement: 'Started his own tech company',
      story: 'Participated in 15+ hackathons during college. The networking and skills gained led to meeting his co-founder and securing initial funding.',
      image: '👨‍💻'
    },
    {
      name: 'Neha Singh',
      achievement: 'Became campus placement coordinator',
      story: 'Organized 20+ events, developing leadership skills that helped her land her dream job at a Fortune 500 company with 30% higher package.',
      image: '👩‍💼'
    },
    {
      name: 'Vikram Patel',
      achievement: 'Won national innovation award',
      story: 'His project presented at a college symposium caught the attention of judges, leading to mentorship and eventual national recognition.',
      image: '🏆'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Benefits', icon: '🌟' },
    { id: 'social', label: 'Social', icon: '🤝' },
    { id: 'skills', label: 'Skills', icon: '💡' },
    { id: 'personal', label: 'Personal', icon: '🌱' },
    { id: 'career', label: 'Career', icon: '🚀' }
  ];

  const filteredBenefits = activeCategory === 'all' 
    ? benefits 
    : benefits.filter(b => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaC0ydjJoMnptMCAwaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl font-extrabold mb-6">
              Why Events Matter?
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              College events aren't just fun—they're transformative experiences that shape your future, build your network, and unlock your potential
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-800 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Discover Benefits
              </button>
              <Link to="/events">
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105">
                  Explore Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Types Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Types of Events We Host
        </h2>
        <p className="text-center text-gray-600 mb-12">Diverse opportunities for every interest and passion</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {eventTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section with Filter */}
      <div id="benefits" className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-teal-900 bg-clip-text text-transparent">
            Key Benefits of Event Participation
          </h2>
          <p className="text-center text-gray-600 mb-8">Click on any benefit to learn more</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit, index) => (
              <div
                key={index}
                onClick={() => setExpandedBenefit(expandedBenefit === index ? null : index)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                <div className="p-6">
                  <div className="text-5xl mb-4">{benefit.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 mb-3">
                    {expandedBenefit === index ? benefit.fullDesc : benefit.shortDesc}
                  </p>
                  <div className={`bg-gradient-to-r ${benefit.color} text-white text-sm font-semibold px-4 py-2 rounded-full inline-block`}>
                    {benefit.stats}
                  </div>
                  <div className="mt-4 text-cyan-600 font-semibold text-sm">
                    {expandedBenefit === index ? '← Click to collapse' : 'Click to read more →'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-teal-900 bg-clip-text text-transparent">
          Success Stories
        </h2>
        <p className="text-center text-gray-600 mb-12">Real students, real achievements, real impact</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="text-6xl mr-4">{story.image}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                  <p className="text-sm text-cyan-600 font-semibold">{story.achievement}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{story.story}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quote Section */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-7xl mb-6">💬</div>
          <blockquote className="text-3xl font-bold mb-4 italic">
            "You can't connect the dots looking forward; you can only connect them looking backwards."
          </blockquote>
          <p className="text-xl text-slate-200 mb-2">— Steve Jobs</p>
          <p className="text-slate-300 mt-6 text-lg">
            Every event you attend, every person you meet, every skill you learn—they all become dots that connect to create your unique story.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0wIDMwdi0yaC0ydjJoMnptMCAwaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your College Experience?</h2>
            <p className="text-slate-200 mb-8 text-lg max-w-2xl mx-auto">
              Don't just attend college—experience it! Join events, build connections, and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <button className="bg-white text-slate-800 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Browse All Events
                </button>
              </Link>
              <Link to="/about">
                <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105">
                  Learn About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhyEvents;
