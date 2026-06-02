import React from 'react';

export const MentorshipView: React.FC = () => {
  return (
    <div className="mentorship-coming-soon view-transition">
      <div className="mcs-card">
        <div className="mcs-emoji">🚀</div>
        <h1 className="mcs-title">Coming Soon</h1>
        <p className="mcs-subtitle">
          Expert Mentorship Hub is under construction. We're hand-picking verified institutional
          traders to guide you through your journey.
        </p>
        <div className="mcs-features">
          <div className="mcs-feature-pill">📈 1-on-1 Coaching</div>
          <div className="mcs-feature-pill">🎯 Live Sessions</div>
          <div className="mcs-feature-pill">🏆 Verified Mentors</div>
          <div className="mcs-feature-pill">⚡ Real-time Feedback</div>
        </div>
        <div className="mcs-notify-row">
          <input
            type="email"
            className="mcs-email-input"
            placeholder="Enter your email for early access"
          />
          <button
            className="mcs-notify-btn"
            onClick={() => alert('You\'re on the list! We\'ll notify you when Mentorship goes live.')}
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};
