import React from 'react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export const TestimonialsSection: React.FC = () => {
  const column1: Testimonial[] = [
    {
      id: 1,
      text: "Instead of blindly trading every setup, I now understand my actual patterns and decision-making habits. That alone improved my consistency.",
      name: "Ryan Matthews",
      role: "Product Lead, Atlas Works",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 2,
      text: "Trevoros completely changed how I review my trades. The behavioral insights helped me identify repeated mistakes I wasn't even noticing before.",
      name: "Ethan Carter",
      role: "Founder, ClearPath Consulting",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 3,
      text: "The analytics are incredibly clean and easy to understand. I've become far more disciplined with entries and risk management.",
      name: "Michael Roberts",
      role: "CEO, Syncro Labs",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces"
    }
  ];

  const column2: Testimonial[] = [
    {
      id: 4,
      text: "What I like most about Trevoros is how practical the insights feel. It's like having a trading mentor built directly into the platform.",
      name: "Daniel Ortiz",
      role: "E-commerce Manager, PeakGear",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 5,
      text: "Trevoros makes trade reviews much more meaningful. The platform helped me spot emotional trading habits I kept repeating.",
      name: "Hannah Brooks",
      role: "People Ops, RemotelyRest",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 6,
      text: "This is one of the few trading tools that genuinely helps improve behavior over time. The pattern analysis is incredibly valuable.",
      name: "Emily Chen",
      role: "Growth Manager, Looppack",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces"
    }
  ];

  const column3: Testimonial[] = [
    {
      id: 7,
      text: "Trevoros makes trade reviews much more meaningful. The platform helped me spot emotional trading habits I kept repeating.",
      name: "Omar Khalid",
      role: "Founder, FlowBound",
      avatarUrl: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 8,
      text: "What stood out to me was the quality of the insights. It doesn't just show numbers — it helps you understand why your trades work or fail.",
      name: "Priy Nair",
      role: "Growth Manager, LoopLock",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: 9,
      text: "The dashboard is fast, minimal, and actually focused on improvement. I've started making more data-driven decisions instead of emotional ones.",
      name: "Lucas Martin",
      role: "Sales Lead, DigitsLine",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=faces"
    }
  ];

  // Repeat for a seamless loop track
  const col1Repeated = [...column1, ...column1, ...column1];
  const col2Repeated = [...column2, ...column2, ...column2];
  const col3Repeated = [...column3, ...column3, ...column3];

  return (
    <div className="testimonials-showcase-container">
      
      {/* Header Block */}
      <div className="testimonials-header">
        <div className="testimonials-badge">Testimonials</div>
        <h2 className="testimonials-title">
          Trusted by Traders Who Value Precision
        </h2>
        <p className="testimonials-subtitle">
          Hear From Traders Using Our Platform.
        </p>
      </div>

      {/* Testimonials Viewport */}
      <div className="testimonials-marquee-viewport">
        <div className="testimonials-marquee-grid">
          
          {/* Column 1: Moves UP */}
          <div className="testimonials-column col-up-1">
            <div className="testimonials-marquee-track">
              {col1Repeated.map((t, idx) => (
                <div key={`col1-${t.id}-${idx}`} className="testimonial-card">
                  <span className="testimonial-quote-mark">“</span>
                  <p className="testimonial-quote-text">{t.text}</p>
                  
                  {/* User Profile Footer */}
                  <div className="testimonial-user-row">
                    <img 
                      src={t.avatarUrl} 
                      alt={t.name} 
                      className="user-avatar-image" 
                      loading="lazy"
                    />
                    <div className="user-details">
                      <span className="user-name">{t.name}</span>
                      <span className="user-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Moves DOWN */}
          <div className="testimonials-column col-down-2">
            <div className="testimonials-marquee-track">
              {col2Repeated.map((t, idx) => (
                <div key={`col2-${t.id}-${idx}`} className="testimonial-card">
                  <span className="testimonial-quote-mark">“</span>
                  <p className="testimonial-quote-text">{t.text}</p>
                  
                  {/* User Profile Footer */}
                  <div className="testimonial-user-row">
                    <img 
                      src={t.avatarUrl} 
                      alt={t.name} 
                      className="user-avatar-image" 
                      loading="lazy"
                    />
                    <div className="user-details">
                      <span className="user-name">{t.name}</span>
                      <span className="user-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Moves UP */}
          <div className="testimonials-column col-up-3">
            <div className="testimonials-marquee-track">
              {col3Repeated.map((t, idx) => (
                <div key={`col3-${t.id}-${idx}`} className="testimonial-card">
                  <span className="testimonial-quote-mark">“</span>
                  <p className="testimonial-quote-text">{t.text}</p>
                  
                  {/* User Profile Footer */}
                  <div className="testimonial-user-row">
                    <img 
                      src={t.avatarUrl} 
                      alt={t.name} 
                      className="user-avatar-image" 
                      loading="lazy"
                    />
                    <div className="user-details">
                      <span className="user-name">{t.name}</span>
                      <span className="user-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
