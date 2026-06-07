import React, { useEffect, useRef } from 'react';

interface BubbleItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const HowItWorksSection: React.FC = () => {
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const updateEye = (eyeEl: HTMLDivElement | null, pupilEl: HTMLDivElement | null) => {
        if (!eyeEl || !pupilEl) return;
        const rect = eyeEl.getBoundingClientRect();
        
        // Center coordinate of the eye frame
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        
        // Pupil bounds control inside the white eye capsule
        const maxOffset = 7; 
        const distance = Math.min(maxOffset, Math.hypot(dx, dy) / 20);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupilEl.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      };

      updateEye(leftEyeRef.current, leftPupilRef.current);
      updateEye(rightEyeRef.current, rightPupilRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const leftBubbles: BubbleItem[] = [
    {
      id: 0,
      title: 'Register & Enroll',
      desc: 'Start your journey with a paid evaluation program.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 1,
      title: 'Knowledge Check',
      desc: 'Clear a basic MCQ test to ensure foundational understanding.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Behavior Analytics',
      desc: 'Data-driven insights into your trading patterns.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  const rightBubbles: BubbleItem[] = [
    {
      id: 3,
      title: 'Trading Evaluation',
      desc: 'Trade with virtual capital under strict rules.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="21" x2="9" y2="9" />
          <line x1="15" y1="21" x2="15" y2="3" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Mentorship Program',
      desc: 'Guidance from experienced traders.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'AI Coach',
      desc: '24/7 personalized coaching that analyzes your activity and provides feedback.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="10" y1="15" x2="10" y2="9" />
          <line x1="14" y1="15" x2="14" y2="9" />
        </svg>
      ),
    },
  ];

  return (
    <section className="how-it-works-section">
      {/* Outer White Card Container (Wider 96% and sharp 12px corners) */}
      <div className="how-it-works-wrapper">
        
        {/* Section Header */}
        <h2 className="how-it-works-title">How it works</h2>
        <p className="how-it-works-desc">
          structured, performance-driven path from evaluation to funded capital.
        </p>

        {/* Floating Bubble Web Cloud */}
        <div className="bubble-web-container">
          
          {/* Left Column of Floating Capsules (Staggered offsets) */}
          <div className="bubble-column left">
            {leftBubbles.map((bubble, i) => (
              <div 
                key={bubble.id} 
                className="static-bubble"
                style={{ 
                  transform: `translateX(${i === 1 ? '-25px' : '0px'})`,
                  animationDelay: `${i * 0.15}s`
                }}
              >
                <div className="bubble-icon-box">
                  {bubble.icon}
                </div>
                <div className="bubble-content">
                  <h3 className="bubble-title">{bubble.title}</h3>
                  <p className="bubble-desc">{bubble.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Interactive Owl Doodle Capsule */}
          <div className="owl-center-container">
            {/* Triangular Owl Ears */}
            <div className="owl-ear left" />
            <div className="owl-ear right" />
            
            {/* Owl Face Shell */}
            <div className="owl-face">
              
              {/* Giant Looking-Around Doodle Eyes */}
              <div className="owl-eyes-row">
                {/* Left Eye */}
                <div ref={leftEyeRef} className="owl-eye-frame">
                  <div ref={leftPupilRef} className="owl-pupil" />
                </div>
                
                {/* Right Eye */}
                <div ref={rightEyeRef} className="owl-eye-frame">
                  <div ref={rightPupilRef} className="owl-pupil" />
                </div>
              </div>

              {/* Triangle Golden Beak */}
              <div className="owl-beak" />

              {/* Doodle Owl Brow line */}
              <div className="owl-brow" />
            </div>
          </div>

          {/* Right Column of Floating Capsules (Staggered offsets) */}
          <div className="bubble-column right">
            {rightBubbles.map((bubble, i) => (
              <div 
                key={bubble.id} 
                className="static-bubble"
                style={{ 
                  transform: `translateX(${i === 1 ? '25px' : '0px'})`,
                  animationDelay: `${(i + 3) * 0.15}s`
                }}
              >
                <div className="bubble-icon-box">
                  {bubble.icon}
                </div>
                <div className="bubble-content">
                  <h3 className="bubble-title">{bubble.title}</h3>
                  <p className="bubble-desc">{bubble.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
