import React from 'react';

export default function EventsInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-teal-700 mb-6 text-center">Why We Organize Events</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">Events at XYZ Institute of Technology are designed to inspire, educate, and empower our students. From technical workshops to cultural festivals, every event is an opportunity for growth and discovery.</p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li><span className="font-semibold">Skill Development:</span> Events help students acquire new skills, from coding to public speaking.</li>
          <li><span className="font-semibold">Networking:</span> Meet industry experts, alumni, and peers to build valuable connections.</li>
          <li><span className="font-semibold">Innovation & Creativity:</span> Hackathons, competitions, and exhibitions foster creative thinking and problem-solving.</li>
          <li><span className="font-semibold">Confidence Building:</span> Presenting, performing, and collaborating in events boosts self-confidence.</li>
          <li><span className="font-semibold">Career Opportunities:</span> Many events offer internships, placements, and mentorship from top professionals.</li>
        </ul>
        <div className="text-center">
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Event" className="rounded-xl shadow-lg mx-auto mb-6" style={{maxHeight: '300px'}} />
        </div>
        <p className="text-lg text-gray-700 text-center">Participating in events is a key part of student life at XYZ Institute, helping you grow academically, professionally, and personally.</p>
      </div>
    </div>
  );
}
