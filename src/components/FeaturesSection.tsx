import React, { useState, useEffect, useRef } from 'react';
import { DashboardShowcase } from './DashboardShowcase';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqSection } from './FaqSection';
import { FooterSection } from './FooterSection';

interface FeatureItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface BubbleItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

type PeriodType = '1H' | '1D' | '1W' | '1M' | '1Y';

export const FeaturesSection: React.FC = () => {
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Owl Eye Tracking Refs
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Spotlight Mouse Coordinates State
  const spotlightContainerRef = useRef<HTMLDivElement>(null);
  const [spotlightMouse, setSpotlightMouse] = useState({ x: -1000, y: -1000 });

  // Exchange Interactive States
  const [payAmount, setPayAmount] = useState<string>('1000');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('1D');
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Morphing SVG Sparkline Path Definitions
  const sparklineData: Record<PeriodType, { line: string; fill: string }> = {
    '1H': {
      line: 'M 0 55 Q 30 20, 60 45 T 120 15 T 180 50 T 240 10 T 300 5',
      fill: 'M 0 55 Q 30 20, 60 45 T 120 15 T 180 50 T 240 10 T 300 5 L 300 80 L 0 80 Z'
    },
    '1D': {
      // Matches screenshot: Starts high, goes down, bounces, slopes down to low-right
      line: 'M 0 15 Q 40 45, 80 30 T 140 70 T 200 55 T 260 76 T 300 74',
      fill: 'M 0 15 Q 40 45, 80 30 T 140 70 T 200 55 T 260 76 T 300 74 L 300 80 L 0 80 Z'
    },
    '1W': {
      line: 'M 0 45 Q 30 65, 60 30 T 120 50 T 180 10 T 240 35 T 300 15',
      fill: 'M 0 45 Q 30 65, 60 30 T 120 50 T 180 10 T 240 35 T 300 15 L 300 80 L 0 80 Z'
    },
    '1M': {
      line: 'M 0 70 Q 40 35, 80 55 T 160 20 T 240 45 T 300 8',
      fill: 'M 0 70 Q 40 35, 80 55 T 160 20 T 240 45 T 300 8 L 300 80 L 0 80 Z'
    },
    '1Y': {
      line: 'M 0 10 Q 50 70, 100 40 T 200 75 T 300 20',
      fill: 'M 0 10 Q 50 70, 100 40 T 200 75 T 300 20 L 300 80 L 0 80 Z'
    }
  };

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

  const features: FeatureItem[] = [
    {
      id: 0,
      title: 'Risk Management',
      desc: 'Structured evaluation with controlled capital exposure to assess true risk awareness.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      ),
    },
    {
      id: 1,
      title: 'Emotional Control',
      desc: 'Behavior-based filtering to identify consistency under market pressure.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 5-2" />
          <path d="M12 22a7 7 0 0 1-5-2" />
          <path d="M12 18a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z" />
          <path d="M12 2v4" />
          <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Consistency Over Time',
      desc: 'Sustained performance metrics that reward long-term strategic execution.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Evaluation Framework',
      desc: 'Our evaluation framework is designed to measure structure, composure and performance consistency — not luck.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="16 14 12 10 8 14" />
          <polyline points="16 10 12 6 8 10" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Trading Discipline',
      desc: 'Performance tracking focused on rule adherence, not short-term gains.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

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

  const maxIndex = features.length - 3;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Spotlight Mouse Interactions
  const handleSpotlightMouseMove = (e: React.MouseEvent) => {
    const container = spotlightContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setSpotlightMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleSpotlightMouseLeave = () => {
    setSpotlightMouse({ x: -1000, y: -1000 });
  };

  // Exchange Refresh handler
  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 850);
  };

  // Swap Handler
  const handleSwap = () => {
    setIsSwapped((prev) => !prev);
  };

  // Conversion logic (1 ETH = 209832.21858 INR)
  const rate = 209832.21858;
  const inputVal = parseFloat(payAmount) || 0;
  
  const getConvertedValue = () => {
    if (!isSwapped) {
      // ETH to INR
      return (inputVal * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      // INR to ETH
      return (inputVal / rate).toLocaleString(undefined, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5
      });
    }
  };

  return (
    <section className="features-card-section">
      {/* Outer White Card Wrapper (Wider 96% and sharp 12px corners) */}
      <div className="features-card-wrapper">
        
        {/* Part 1: Features Carousel Panel (Cool-Grey Zinc Inner Box) */}
        <div className="features-inner-grey-box">
          <span className="features-subtitle">WHAT WE DO?</span>
          <h2 className="features-title">
            Earn Access to Capital<br />Through Discipline
          </h2>

          {/* Carousel Viewport */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div className="carousel-viewport">
              <div 
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 3 + 0.6)}%)`
                }}
              >
                {features.map((feat) => (
                  <div key={feat.id} className="feature-card">
                    <div className="feature-icon-box">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="feature-card-title">{feat.title}</h3>
                      <p className="feature-card-desc">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Controls Flanking Dots */}
          <div className="carousel-controls-bar">
            <button className="carousel-nav-btn" onClick={handlePrev} aria-label="Previous Feature">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <div className="carousel-dots">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`carousel-dot ${currentIndex === idx || (currentIndex === maxIndex && idx >= maxIndex) ? 'active' : ''}`}
                  onClick={() => {
                    if (idx <= maxIndex) {
                      setCurrentIndex(idx);
                    } else {
                      setCurrentIndex(maxIndex);
                    }
                  }}
                />
              ))}
            </div>

            <button className="carousel-nav-btn" onClick={handleNext} aria-label="Next Feature">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Part 2: How It Works Panel (Embedded seamlessly inside the white card) */}
        <div className="how-it-works-embedded-wrapper">
          <h2 className="how-it-works-title">How it works</h2>
          <p className="how-it-works-desc">
            structured, performance-driven path from evaluation to funded capital.
          </p>

          {/* Floating Bubble Web Cloud */}
          <div className="bubble-web-container">
            
            {/* Left Column of Floating Capsules */}
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
              <div className="owl-ear left" />
              <div className="owl-ear right" />
              
              <div className="owl-face">
                <div className="owl-eyes-row">
                  <div ref={leftEyeRef} className="owl-eye-frame">
                    <div ref={leftPupilRef} className="owl-pupil" />
                  </div>
                  <div ref={rightEyeRef} className="owl-eye-frame">
                    <div ref={rightPupilRef} className="owl-pupil" />
                  </div>
                </div>
                <div className="owl-beak" />
                <div className="owl-brow" />
              </div>
            </div>

            {/* Right Column of Floating Capsules */}
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

        {/* Part 3: Spotlight Interactive Text */}
        <div 
          ref={spotlightContainerRef}
          className="spotlight-container"
          onMouseMove={handleSpotlightMouseMove}
          onMouseLeave={handleSpotlightMouseLeave}
        >
          {/* Base Layer: Pitch Black Text */}
          <div className="spotlight-text-layer black-layer">
            <div className="line-1">Who this is for</div>
            <div className="line-2">Disciplined beginner traders</div>
          </div>

          {/* Overlay Layer: Vibrant Blue Spotlight Text */}
          <div 
            className="spotlight-text-layer blue-layer"
            style={{
              clipPath: `circle(85px at ${spotlightMouse.x}px ${spotlightMouse.y}px)`
            }}
          >
            <div className="line-1">Who this is for</div>
            <div className="line-2">Disciplined beginner traders</div>
          </div>
        </div>

        {/* Part 4: Dynamic Crypto Exchange Converter Section */}
        <div className="exchange-showcase-container">
          
          {/* Floating Green Tether Capsule */}
          <div className="floating-crypto-badge tether">
            <div className="crypto-badge-icon tether-icon-bg">
              {/* Tether Custom Crafted Leaf / T Symbol Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.75 14.5v-1h3v-2h-3v-3.5h2v-2h-2V6.5h-3.5v1.5H8v2h2.25v3.5H7.25v2h3v1h-3.5v2h3.5v1h2.5v-1h3.5v-2h-3.5z" />
              </svg>
            </div>
            <span className="crypto-badge-label">Tether <span className="crypto-badge-symbol">USDT</span></span>
          </div>

          {/* Core Interactive Exchange Terminal */}
          <div className="exchange-card">
            
            {/* Header: Title and interactive rotate-on-click refresh */}
            <div className="exchange-card-header">
              <span className="exchange-card-title">Exchange</span>
              <button 
                onClick={triggerRefresh}
                className={`exchange-refresh-btn ${isRefreshing ? 'spinning' : ''}`}
                aria-label="Refresh exchange rates"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>

            {/* Input Container: You Pay */}
            <div className="exchange-input-block">
              <div className="exchange-block-info">
                <span className="exchange-block-label">You pay</span>
                <input 
                  type="text"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="exchange-amount-input"
                  placeholder="0"
                />
              </div>

              {/* Currency Selector (ETH/INR depending on swap) */}
              <div className="exchange-currency-selector">
                {!isSwapped ? (
                  <>
                    <span className="currency-icon-symbol">Ξ</span>
                    <span className="currency-code">ETH</span>
                  </>
                ) : (
                  <>
                    <span className="currency-icon-symbol">🇮🇳</span>
                    <span className="currency-code">INR</span>
                  </>
                )}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-chevron">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Middle Floating Swap Trigger */}
            <div className="exchange-swap-row">
              <button 
                onClick={handleSwap}
                className="exchange-swap-btn"
                aria-label="Swap Currencies"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Up/Down double arrow swap vector */}
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>

            {/* Output Container: You Receive */}
            <div className="exchange-input-block receive-block">
              <div className="exchange-block-info">
                <span className="exchange-block-label">You receive</span>
                <div className="exchange-amount-output">
                  {getConvertedValue()}
                </div>
              </div>

              {/* Target Currency Selector (INR/ETH depending on swap) */}
              <div className="exchange-currency-selector">
                {!isSwapped ? (
                  <>
                    <span className="currency-icon-symbol">🇮🇳</span>
                    <span className="currency-code">INR</span>
                  </>
                ) : (
                  <>
                    <span className="currency-icon-symbol">Ξ</span>
                    <span className="currency-code">ETH</span>
                  </>
                )}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-chevron">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Bottom Section: Sparkline History Trend */}
            <div className="exchange-history-section">
              <div className="exchange-history-header">
                <span className="history-section-title">History</span>
                
                {/* Micro historical filter tabs */}
                <div className="history-tabs">
                  {(['1H', '1D', '1W', '1M', '1Y'] as PeriodType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePeriod(p)}
                      className={`history-tab ${activePeriod === p ? 'active' : ''}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Filled Area Sparkline */}
              <div className="exchange-sparkline-viewport">
                <svg viewBox="0 0 300 80" className="sparkline-chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="spark-area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Morphing Area Fill */}
                  <path 
                    d={sparklineData[activePeriod].fill} 
                    fill="url(#spark-area-gradient)"
                    className="sparkline-morphing-path"
                  />

                  {/* Morphing Trendline */}
                  <path 
                    d={sparklineData[activePeriod].line} 
                    fill="none" 
                    stroke="#2563eb" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="sparkline-morphing-path"
                  />
                </svg>
              </div>

            </div>

          </div>

          {/* Floating Gold Bitcoin Capsule */}
          <div className="floating-crypto-badge bitcoin">
            <div className="crypto-badge-icon bitcoin-icon-bg">
              {/* Bitcoin Custom Vector Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 12.18c-.28 1.48-1.42 2.1-3.3 2.22v1.6H10.7v-1.6c-.34 0-.68 0-1.02-.02v1.62H8.4v-1.62c-.75-.02-1.5-.05-2.25-.1v-1.43c.42.02.83.02 1.25 0 .28-.01.44-.15.48-.44v-5.2c-.04-.28-.2-.42-.48-.43-.42-.02-.83-.02-1.25 0V7.27c.75.05 1.5.08 2.25.1v-1.6H10.7v1.6c.34 0 .68 0 1.02.02v-1.6H13v1.6c1.65.1 2.65.7 2.85 1.9.2 1 .05 1.7-.58 2.18.72.33 1.24.96 1.03 2.23zm-3.8-4.7c0-.62-.5-.73-1.25-.75v1.5c.75-.02 1.25-.13 1.25-.75zm.25 3.53c0-.67-.5-.8-1.5-.82v1.65c1-.02 1.5-.15 1.5-.83z" />
              </svg>
            </div>
            <span className="crypto-badge-label">Bitcoin <span className="crypto-badge-symbol">BTC</span></span>
          </div>

        </div>

        {/* Part 5: Beautiful Modular Dashboard Showcase Grid */}
        <DashboardShowcase />

        {/* Part 6: Beautiful Infinite Testimonials Wall */}
        <TestimonialsSection />

        {/* Part 7: Beautiful Interactive Accordion FAQs */}
        <FaqSection />

        {/* Part 8: Beautiful Minimalist Platform Footer */}
        <FooterSection />

      </div>
    </section>
  );
};
