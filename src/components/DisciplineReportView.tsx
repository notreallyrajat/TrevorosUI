import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  type: string;
  price: number;
  change: number;
  pct: number;
  up: boolean;
}

export const DisciplineReportView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Watchlist from reference image
  const watchlist: StockItem[] = [
    { id: '1', name: 'NIFTY 50', type: 'INDEX', price: 23659.00, change: 41.00, pct: 0.17, up: true },
    { id: '2', name: 'INFY', type: 'STOCK', price: 1193.70, change: -3.20, pct: -0.27, up: false },
    { id: '3', name: 'HDFC BANK', type: 'BSE', price: 759.50, change: -3.25, pct: -0.43, up: false },
    { id: '4', name: 'TCS', type: 'BSE', price: 2327.15, change: -0.40, pct: -0.02, up: false },
    { id: '5', name: 'ONGC', type: 'STOCK', price: 298.30, change: 1.80, pct: 0.61, up: true },
  ];

  // Top Indices
  const indices = [
    { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
    { name: 'NIFTY 50', price: '₹ 158.34', change: '-3.82 (2.47%)', up: false },
    { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
    { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true }
  ];

  // Filtered watchlist
  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="discipline-report-container">
      {/* LEFT SIDEBAR: WATCHLIST & INDICES */}
      <aside className="discipline-sidebar-left">
        {/* Watchlist Search */}
        <div className="search-box-container">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search watchlist items"
            />
            <span className="shortcut-badge">Ctrl+K</span>
          </div>
        </div>

        {/* Watchlist Section Header */}
        <div className="watchlist-header">
          <span className="watchlist-title">Watchlist 1</span>
          <button className="add-watchlist-btn">
            + Add new
          </button>
        </div>

        {/* Watchlist List */}
        <div className="watchlist-list">
          <div className="watchlist-group">
            <div className="group-header">
              <span className="group-name">Default</span>
              <span className="group-count">({filteredWatchlist.length})</span>
            </div>
            <div className="group-items">
              {filteredWatchlist.map((stock) => (
                <div key={stock.id} className="watchlist-item">
                  <div className="item-info">
                    <span className="item-symbol">{stock.name}</span>
                    <span className="item-exchange">{stock.type}</span>
                  </div>
                  <div className="item-price-col">
                    <span className="item-price">{stock.price.toFixed(2)}</span>
                    <span className={`item-change ${stock.up ? 'color-up' : 'color-down'}`}>
                      {stock.change >= 0 ? '' : ''}
                      {stock.change.toFixed(2)} ({stock.pct.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watchlist Footer Summary */}
        <div className="watchlist-footer-summary">
          <span className="summary-lbl">NIFTY 50</span>
          <span className="summary-val color-up">23659.00</span>
          <span className="summary-change color-up">41.00 (0.17%)</span>
          <span className="divider">|</span>
          <span className="summary-lbl">SENSEX</span>
          <span className="summary-val color-up">75318.39</span>
          <span className="summary-change color-up">117.54 (0.16%)</span>
        </div>

        {/* Top Indices Header */}
        <div className="watchlist-header" style={{ marginTop: '24px' }}>
          <span className="watchlist-title">Top indices</span>
        </div>

        {/* Top Indices Grid */}
        <div className="top-indices-grid">
          {indices.map((index, idx) => (
            <div key={idx} className="index-card">
              <div className="index-card-header">
                <span className="index-logo">N</span>
                <span className="index-name">{index.name}</span>
              </div>
              <div className="index-card-body">
                <div className="index-price">{index.price}</div>
                <div className={`index-change ${index.up ? 'up' : 'down'}`}>
                  {index.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT MAIN PANEL */}
      <main className="discipline-content-right">
        {/* Title Header */}
        <header className="discipline-header">
          <h1 className="discipline-title">Trader Discipline Report</h1>
          <p className="discipline-subtitle">Behavioral Analysis & Risk Protocol Adherence</p>
        </header>

        {/* Main Grid */}
        <div className="discipline-grid">
          {/* LEFT SECTION (line chart & radar chart) */}
          <div className="discipline-left-column">
            
            {/* Discipline Score Trend Card */}
            <div className="discipline-card score-trend-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">Discipline Score Trend</h3>
                  <p className="card-subtitle">Last 5 Trading Sessions</p>
                </div>
                <span className="avg-badge">+2.1% Avg</span>
              </div>

              <div className="line-chart-container">
                <svg viewBox="0 0 500 200" className="svg-line-chart">
                  {/* Grid Lines & Labels */}
                  <line x1="50" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                  <text x="25" y="24" className="chart-label">100</text>
                  
                  <line x1="50" y1="70" x2="480" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                  <text x="25" y="74" className="chart-label">95</text>
                  
                  <line x1="50" y1="120" x2="480" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                  <text x="25" y="124" className="chart-label">90</text>
                  
                  <line x1="50" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                  <text x="25" y="174" className="chart-label">85</text>

                  {/* Trend line */}
                  <path
                    d="M 80,65 L 172.5,120 L 265,35 L 357.5,65 L 450,50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  {/* Markers & Values */}
                  {/* Session 1: 95.5 */}
                  <circle cx="80" cy="65" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  {/* Session 2: 90 */}
                  <circle cx="172.5" cy="120" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  {/* Session 3: 98.5 */}
                  <circle cx="265" cy="35" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  {/* Session 4: 95.5 */}
                  <circle cx="357.5" cy="65" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                  {/* Session 5: 97 */}
                  <circle cx="450" cy="50" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />

                  {/* X Axis labels */}
                  <text x="80" y="195" textAnchor="middle" className="chart-axis-label">Session 1</text>
                  <text x="172.5" y="195" textAnchor="middle" className="chart-axis-label">Session 2</text>
                  <text x="265" y="195" textAnchor="middle" className="chart-axis-label">Session 3</text>
                  <text x="357.5" y="195" textAnchor="middle" className="chart-axis-label">Session 4</text>
                  <text x="450" y="195" textAnchor="middle" className="chart-axis-label">Session 5</text>
                </svg>
              </div>

              {/* Info Notice Banner */}
              <div className="discipline-notice-banner">
                <Info size={16} className="notice-icon" />
                <span className="notice-text">
                  Score variance remains within acceptable deviation limits. The dip in Session 2 correlates with higher market volatility, but risk controls remained intact. Recovery to 100 in Session 3 demonstrates strong adaptability.
                </span>
              </div>
            </div>

            {/* Behavioral Stability Index Card */}
            <div className="discipline-card stability-index-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">Behavioral Stability Index</h3>
                  <p className="card-subtitle">Current Trader | Platform Benchmark</p>
                </div>
              </div>

              <div className="radar-chart-container">
                <svg viewBox="0 0 400 320" className="svg-radar-chart">
                  {/* Radar grid pentagons */}
                  <polygon points="200,30 361.8,147.5 300,337.5 100,337.5 38.2,147.5" fill="none" stroke="var(--border-color)" strokeWidth="0.5" />
                  <polygon points="200,70 329.4,164 280,316 120,316 70.6,164" fill="none" stroke="var(--border-color)" strokeWidth="0.5" />
                  <polygon points="200,110 297.1,180.5 260,294.5 140,294.5 102.9,180.5" fill="none" stroke="var(--border-color)" strokeWidth="0.5" />
                  <polygon points="200,150 264.7,197 240,273 160,273 135.3,197" fill="none" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Web Axis Lines */}
                  <line x1="200" y1="180" x2="200" y2="30" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="200" y1="180" x2="361.8" y2="147.5" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="200" y1="180" x2="300" y2="337.5" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="200" y1="180" x2="100" y2="337.5" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="200" y1="180" x2="38.2" y2="147.5" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Trader stats polygon (shaded blue area) */}
                  {/* Vertices: Risk Control(85%), Emotional(75%), SL Discipline(92%), Overtrading Control(88%), Participation(80%) */}
                  <polygon
                    points="200,50 321.3,155.5 280,306 120,306 70.6,154"
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  {/* Benchmark polygon (grey outline) */}
                  <polygon
                    points="200,70 310,158.5 270,296 130,296 85,158"
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="1"
                    strokeDasharray="3"
                  />

                  {/* Vertex labels */}
                  <text x="200" y="20" textAnchor="middle" className="radar-label">Risk Control</text>
                  <text x="375" y="150" textAnchor="start" className="radar-label">Emotional</text>
                  <text x="315" y="352" textAnchor="start" className="radar-label">SL Discipline</text>
                  <text x="85" y="352" textAnchor="end" className="radar-label">Overtrading Control</text>
                  <text x="25" y="150" textAnchor="end" className="radar-label">Participation</text>
                </svg>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION (violation, participation) */}
          <div className="discipline-right-column">
            
            {/* Violation Distribution Card */}
            <div className="discipline-card violation-distribution-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">Violation Distribution</h3>
                </div>
              </div>

              <div className="bar-chart-container">
                <svg viewBox="0 0 300 150" className="svg-bar-chart">
                  {/* Grid background lines */}
                  <line x1="40" y1="20" x2="280" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="40" y1="60" x2="280" y2="60" stroke="var(--border-color)" strokeWidth="0.5" />
                  <line x1="40" y1="100" x2="280" y2="100" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Bars */}
                  {/* Low (Blue) */}
                  <rect x="60" y="50" width="35" height="70" rx="2" fill="#3b82f6" />
                  {/* Med (Yellow) */}
                  <rect x="120" y="90" width="35" height="30" rx="2" fill="#eab308" />
                  {/* High (0) */}
                  <rect x="180" y="118" width="35" height="2" rx="1" fill="var(--border-color)" />
                  {/* Critical (0) */}
                  <rect x="240" y="118" width="35" height="2" rx="1" fill="var(--border-color)" />

                  {/* X labels */}
                  <text x="77.5" y="136" textAnchor="middle" className="bar-label">Low</text>
                  <text x="137.5" y="136" textAnchor="middle" className="bar-label">Med</text>
                  <text x="197.5" y="136" textAnchor="middle" className="bar-label">High</text>
                  <text x="257.5" y="136" textAnchor="middle" className="bar-label">Critical</text>
                </svg>
              </div>

              {/* Status Section */}
              <div className="violation-status-container">
                <div className="status-header">
                  <span className="status-dot success" />
                  <span className="status-badge-lbl">Excellent Adherence</span>
                </div>
                <p className="status-description">
                  Zero critical violations recorded. Minor formatting errors in trade logging (Low) and one minor deviation in entry timing (Medium).
                </p>
              </div>
            </div>

            {/* Market Participation Card */}
            <div className="discipline-card participation-card">
              <div className="card-header-row">
                <h3 className="card-title">Market Participation</h3>
                <span className="pct-title-large">40%</span>
              </div>

              <div className="participation-metrics">
                <div className="mandatory-days-label">
                  <strong>2</strong> / 5 Mandatory Days
                </div>
                <div className="progress-bar-bg" style={{ margin: '12px 0 16px 0' }}>
                  <div className="progress-bar-fill net-pl" style={{ width: '40%', height: '8px', backgroundColor: '#3b82f6' }} />
                </div>
                <p className="participation-caption">
                  Requires 3 more active trading days to complete evaluation phase.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
