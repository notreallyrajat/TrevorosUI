import React, { useEffect, useRef } from 'react';
import { Starfield } from './Starfield';
import { ChartMockup } from './ChartMockup';
import { FeaturesSection } from './FeaturesSection';
import '../landing.css';

interface LandingViewProps {
  onLoginClick: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onLoginClick }) => {
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = chartWrapperRef.current;
      if (!wrapper) return;

      if (window.innerWidth <= 768) {
        wrapper.style.transform = 'none';
        wrapper.style.opacity = '1';
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Trigger threshold: begins when top enters viewport, completes when 15% from top
      const startTrigger = viewportHeight;
      const endTrigger = viewportHeight * 0.15;
      
      const totalDistance = startTrigger - endTrigger;
      const currentDistance = startTrigger - rect.top;

      // Clamp progress ratio between 0 and 1
      let progress = currentDistance / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Apply a smooth sine ease-out transition
      const easedProgress = Math.sin((progress * Math.PI) / 2);

      // Calculate transformations matching premium Framer Motion entrances
      const scale = 0.85 + easedProgress * 0.15;
      const translateY = 85 * (1 - easedProgress);
      const rotateX = 14 * (1 - easedProgress);
      const opacity = 0.35 + easedProgress * 0.65;

      // Push styles directly to the GPU layer
      wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`;
      wrapper.style.opacity = `${opacity}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial paint calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page-root">
      {/* Interactive Twinkling Starfield & Deformable Central Nebula Cloud */}
      <Starfield />

      {/* 1. Sleek Navigation Bar */}
      <header className="landing-navbar">
        <a href="/" className="landing-nav-brand">
          <span className="logo-icon" style={{ width: '32px', height: '32px', display: 'inline-block', marginRight: '6px' }}>
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif' }}>Trevoros</span>
        </a>

        <nav className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#why-trevoros" className="landing-nav-link">Why Trevoros</a>
          <a href="#faq" className="landing-nav-link">FAQ</a>
        </nav>

        <div>
          <button className="landing-nav-btn" onClick={onLoginClick}>Login/Sign up</button>
        </div>
      </header>

      {/* 2. Hero Content Container */}
      <main className="landing-hero-container">
        {/* Grey Badge Pill */}
        <div className="landing-badge">
          <span>Trevoros Fintech</span>
        </div>

        {/* Giant Mirror-Replica Headers */}
        <h1 className="landing-title">
          Where Discipline<br />Meets Opportunity
        </h1>
        
        <p className="landing-description">
          Evaluating trades through data, behaviour<br />and performance .
        </p>

        {/* 3. Animated Wrapper for 3D Scroll Trigger Entrance */}
        <div 
          ref={chartWrapperRef}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            transformOrigin: 'center bottom',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
            marginTop: 'auto',
          }}
        >
          <ChartMockup />
        </div>
      </main>

      {/* 4. Giant White Rounded Card Features Presentation Carousel & How It Works Bubble Web */}
      <FeaturesSection />
    </div>
  );
};
