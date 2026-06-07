import React, { useEffect, useState } from 'react';

export const DashboardShowcase: React.FC = () => {
  const [curveOffset, setCurveOffset] = useState(0);

  // Slow organic animation for curve node drift
  useEffect(() => {
    const interval = setInterval(() => {
      setCurveOffset((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Calculate sliding coordinates for interactive loss node
  const nodeX = 145 + Math.sin(curveOffset * 0.06) * 60;
  const nodeY = 48 + Math.cos(curveOffset * 0.06) * 12;

  return (
    <div className="dashboard-showcase-container">
      
      {/* 1. Header Grid Block */}
      <div className="dashboard-header">
        <div className="dashboard-badge">Features</div>
        <h2 className="dashboard-title">
          Learn discipline with Mentor<br />AI and experienced traders
        </h2>
      </div>

      {/* 2. Sleek Showcase Grid */}
      <div className="dashboard-grid">
        
        {/* Card 1: Advanced Risk Management */}
        <div className="dashboard-card card-grey">
          <span className="card-top-title">Advanced risk management</span>
          
          {/* Animated 3D Glowing Shield Widget */}
          <div className="shield-container">
            <svg width="85" height="85" viewBox="0 0 100 100" className="shield-svg" style={{ filter: 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.25))' }}>
              <defs>
                <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <path 
                d="M50 15 C65 20, 80 15, 80 15 C80 15, 80 50, 50 85 C20 50, 20 15, 20 15 C20 15, 35 20, 50 15 Z" 
                fill="url(#shield-grad)"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              {/* Inner glowing lock icon */}
              <circle cx="50" cy="46" r="10" fill="none" stroke="#ffffff" strokeWidth="2.5" />
              <rect x="44" y="46" width="12" height="10" rx="2" fill="#ffffff" />
            </svg>
            <div className="shield-pulse-ring" />
          </div>

          {/* Core pill tags */}
          <div className="card-tags-row">
            <span className="card-tag">Process improvement</span>
            <span className="card-tag">Rule adherence</span>
            <span className="card-tag">Trading</span>
          </div>
        </div>

        {/* Card 2: User Behaviour Insights */}
        <div className="dashboard-card card-grey">
          <span className="card-top-title">User behaviour insights</span>
          
          {/* Interactive Line Graph Widget */}
          <div className="behaviour-graph-viewport">
            <svg viewBox="0 0 290 100" className="behaviour-graph-svg">
              <defs>
                <linearGradient id="graph-fill-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Smooth Spline Curve */}
              <path 
                d="M 10 70 Q 50 25, 90 60 T 170 35 T 250 80 T 290 40" 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <path 
                d="M 10 70 Q 50 25, 90 60 T 170 35 T 250 80 T 290 40 L 290 100 L 10 100 Z" 
                fill="url(#graph-fill-grad)" 
              />

              {/* Dynamic Sliding Marker Node */}
              <circle cx={nodeX} cy={nodeY} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 5px rgba(37,99,235,0.5))' }} />
              {/* Dotted indicator line */}
              <line x1={nodeX} y1={nodeY} x2={nodeX} y2="100" stroke="#e4e4e7" strokeDasharray="3,3" />
            </svg>
            
            {/* Sliding Tooltip Box */}
            <div 
              className="loss-tooltip"
              style={{
                left: `${(nodeX / 290) * 100}%`,
                top: `${(nodeY / 100) * 100 - 32}%`
              }}
            >
              Loss -$245
            </div>
          </div>
        </div>

        {/* Card 3: AI-Powered Insights (Stark Pitch-Black Premium Terminal) */}
        <div className="dashboard-card card-black">
          <span className="card-top-title text-white">AI-powered insights</span>
          
          {/* Animated Glowing AI Neural Network Widget */}
          <div className="ai-insight-box">
            <div className="ai-animation-container">
              {/* Outer pulsing dashed ring */}
              <div className="ai-pulse-ring-outer" />
              {/* Middle pulsing solid ring */}
              <div className="ai-pulse-ring-middle" />
              {/* SVG Holographic grid/nodes */}
              <svg width="100" height="100" viewBox="0 0 100 100" className="ai-network-svg" style={{ position: 'absolute', zIndex: 2 }}>
                <defs>
                  <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Background glow */}
                <circle cx="50" cy="50" r="40" fill="url(#ai-glow)" />
                {/* Constellation lines */}
                <line x1="25" y1="35" x2="50" y2="20" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="50" y1="20" x2="75" y2="35" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="75" y1="35" x2="75" y2="65" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="75" y1="65" x2="50" y2="80" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="50" y1="80" x2="25" y2="65" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="25" y1="65" x2="25" y2="35" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="25" y1="35" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" />
                <line x1="75" y1="35" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" />
                <line x1="50" y1="80" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" />
                {/* Central brain node */}
                <circle cx="50" cy="50" r="8" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 8px #3b82f6)' }}>
                  <animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Surrounding nodes */}
                <circle cx="25" cy="35" r="4" fill="#60a5fa" />
                <circle cx="50" cy="20" r="4" fill="#60a5fa" />
                <circle cx="75" cy="35" r="4" fill="#60a5fa" />
                <circle cx="75" cy="65" r="4" fill="#60a5fa" />
                <circle cx="50" cy="80" r="4" fill="#60a5fa" />
                <circle cx="25" cy="65" r="4" fill="#60a5fa" />
              </svg>
            </div>
          </div>

          <p className="ai-subtext">
            Real-time market data<br />and predictive analysis.
          </p>
        </div>

        {/* Card 4: Portfolio Tracking (Spans 2 columns horizontally) */}
        <div className="dashboard-card card-grey col-span-2">
          
          <div className="portfolio-flex-container">
            {/* Left Column: Context Text & Doughnut Indicator */}
            <div className="portfolio-info-panel">
              <span className="card-top-title text-left">Portfolio tracking</span>
              <p className="portfolio-subdesc">
                See your entire financial picture in one place with performance attribution and gain/loss analysis.
              </p>

              {/* Doughnut Chart */}
              <div className="doughnut-chart-box">
                <svg width="70" height="70" viewBox="0 0 36 36" className="doughnut-svg">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f4f4f5" strokeWidth="3.2" />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.91" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="3.2" 
                    strokeDasharray="92 8" 
                    strokeDashoffset="25"
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="doughnut-text-center">92%</div>
              </div>
            </div>

            {/* Right Column: Rotated Floating Financial Badges */}
            <div className="portfolio-visuals-panel">
              {/* Stocks Card */}
              <div className="portfolio-floating-node stocks-node">
                <div className="node-icon-circle green-bg">📈</div>
                <div className="node-info">
                  <span className="node-label">Stocks</span>
                  <span className="node-value">$78,258 <span className="node-pct green-text">+8.2%</span></span>
                </div>
              </div>

              {/* Crypto Card */}
              <div className="portfolio-floating-node crypto-node">
                <div className="node-icon-circle blue-bg">🌐</div>
                <div className="node-info">
                  <span className="node-label">Crypto</span>
                  <span className="node-value">$24,125 <span className="node-pct blue-text">+5.2%</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Card 5: Smart Alerts */}
        <div className="dashboard-card card-grey">
          <span className="card-top-title">Smart alerts</span>
          
          {/* Notification popups with floating money bills */}
          <div className="alerts-container">
            
            {/* Pop-up Alert Badge */}
            <div className="smart-alert-popup">
              <div className="alert-avatar-circle">🤖</div>
              <div className="alert-content">
                <span className="alert-label">Portfolio blocklist alert</span>
                <span className="alert-detail">Increased to 42%</span>
              </div>
            </div>

            {/* Drifting Dollar Bills Graphic */}
            <div className="drifting-cash-group">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="cash-bill cash-1">
                <rect width="28" height="18" rx="2" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="14" cy="9" r="4" stroke="#22c55e" strokeWidth="1.5" />
              </svg>
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="cash-bill cash-2">
                <rect width="24" height="16" rx="2" fill="#22c55e" fillOpacity="0.20" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="12" cy="8" r="3.5" stroke="#22c55e" strokeWidth="1.5" />
              </svg>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
