import React, { useState } from 'react';
import { Star, Video, Award, Clock } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  specialty: string;
  rating: number;
  sessions: number;
  experience: string;
  availability: string;
  price: string;
}

export const MentorshipView: React.FC = () => {
  const [mentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Rajiv Malhotra',
      avatar: 'RM',
      avatarBg: 'var(--primary-light)',
      specialty: 'Price Action & Swing Trading',
      rating: 4.9,
      sessions: 142,
      experience: '8+ Years',
      availability: 'Today (4:00 PM - 6:00 PM)',
      price: '₹ 1,500/hr'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: 'PS',
      avatarBg: 'var(--orange-light)',
      specialty: 'Derivatives & Option Selling',
      rating: 4.8,
      sessions: 96,
      experience: '6 Years',
      availability: 'Tomorrow (10:00 AM - 12:00 PM)',
      price: '₹ 2,000/hr'
    },
    {
      id: '3',
      name: 'Harsh Vardhan',
      avatar: 'HV',
      avatarBg: 'rgba(16, 185, 129, 0.1)',
      specialty: 'Scalping & Volume Profile',
      rating: 4.9,
      sessions: 210,
      experience: '10 Years',
      availability: 'Wed, Jun 3 (2:00 PM - 5:00 PM)',
      price: '₹ 2,500/hr'
    }
  ]);

  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBook = (name: string) => {
    setBookingSuccess(`Successfully booked a 1-on-1 coaching session with ${name}! A link and details have been sent to your email.`);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 5000);
  };

  return (
    <div className="mentorship-view-container">
      {/* HEADER ROW */}
      <header className="mentorship-header">
        <h2>Expert Mentorship Hub</h2>
        <p>Book 1-on-1 slots with verified institutional traders to master technical analysis and risk management.</p>
      </header>

      {/* BOOKING NOTIFICATION */}
      {bookingSuccess && (
        <div className="booking-toast-notification">
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* MENTORS GRID */}
      <div className="mentors-grid">
        {mentors.map((m) => (
          <div key={m.id} className="mentor-card">
            <div className="mentor-card-top">
              <div className="mentor-avatar" style={{ backgroundColor: m.avatarBg }}>
                {m.avatar}
              </div>
              <div className="mentor-profile-meta">
                <h3>{m.name}</h3>
                <span className="mentor-badge-specialty">{m.specialty}</span>
              </div>
            </div>

            <div className="mentor-details-stats">
              <div className="mentor-stat-row">
                <Star size={14} className="star-icon-rating" />
                <span>
                  <strong>{m.rating.toFixed(1)}</strong> ({m.sessions} Sessions completed)
                </span>
              </div>

              <div className="mentor-stat-row">
                <Award size={14} className="award-icon-experience" />
                <span>Experience: <strong>{m.experience}</strong></span>
              </div>

              <div className="mentor-stat-row">
                <Clock size={14} className="clock-icon-avail" />
                <span>Next slot: <strong style={{ color: 'var(--primary)' }}>{m.availability}</strong></span>
              </div>
            </div>

            <div className="mentor-booking-footer">
              <div className="mentor-price-tag">
                <span>Rate</span>
                <strong>{m.price}</strong>
              </div>
              <button className="mentor-book-btn" onClick={() => handleBook(m.name)}>
                <Video size={14} />
                <span>Book Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
