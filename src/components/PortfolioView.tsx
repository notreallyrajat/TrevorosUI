import React, { useState } from 'react';
import { 
  BarChart2, 
  BookOpen, 
  Building2, 
  Wallet, 
  Headphones, 
  Settings, 
  ChevronRight, 
  MapPin, 
  Trophy, 
  ArrowLeftRight,
  ChevronDown
} from 'lucide-react';

interface PortfolioData {
  totalInvestment: number;
  totalProfit: number;
  totalLoss: number;
  netPL: number;
  overallReturns: number;
}

interface PortfolioViewProps {
  portfolioData: PortfolioData;
  onNavigate?: (tabId: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ portfolioData, onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('Reports');
  const selectedYear = '2026';

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'Reports', label: 'Reports', icon: <BarChart2 size={18} /> },
    { id: 'Learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { id: 'Banks', label: 'Banks', icon: <Building2 size={18} /> },
    { id: 'Funds', label: 'Funds', icon: <Wallet size={18} /> },
    { id: 'Support', label: 'Customer support', icon: <Headphones size={18} /> },
    { id: 'Settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  // Best three wins data
  const bestWins = [
    {
      id: 1,
      rank: '1st',
      symbol: 'TATA',
      name: 'Tata Motors',
      price: 1176.20,
      change: 24.50,
      pct: 2.13,
      sparkline: [10, 12, 11, 14, 13, 16, 15, 18, 17, 19, 18, 20]
    },
    {
      id: 2,
      rank: '2nd',
      symbol: 'AXIS',
      name: 'Axis Bank',
      price: 1176.20,
      change: 24.50,
      pct: 2.13,
      sparkline: [12, 11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 18]
    },
    {
      id: 3,
      rank: '3rd',
      symbol: 'SBIN',
      name: 'State Bank of India',
      price: 1176.20,
      change: 24.50,
      pct: 2.13,
      sparkline: [11, 13, 12, 14, 13, 15, 14, 16, 15, 17, 16, 18]
    }
  ];

  // Transaction History data
  const transactions = [
    { id: 'TX-1049', asset: 'TATA MOTORS', logo: 'T', logoBg: 'var(--primary-light)', color: 'var(--primary)', date: '24 May 2026', type: 'BUY', qty: 10, price: 1176.20, total: 11762.00, status: 'Completed' },
    { id: 'TX-1048', asset: 'AXIS BANK', logo: 'A', logoBg: 'var(--orange-light)', color: 'var(--orange)', date: '22 May 2026', type: 'BUY', qty: 15, price: 1020.50, total: 15307.50, status: 'Completed' },
    { id: 'TX-1047', asset: 'SBI', logo: 'S', logoBg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', date: '18 May 2026', type: 'BUY', qty: 5, price: 790.00, total: 3950.00, status: 'Completed' },
    { id: 'TX-1046', asset: 'INFY', logo: 'I', logoBg: 'rgba(124, 58, 237, 0.1)', color: 'var(--purple)', date: '14 May 2026', type: 'SELL', qty: 12, price: 1193.70, total: 14324.40, status: 'Completed' },
    { id: 'TX-1045', asset: 'ONGC', logo: 'O', logoBg: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', date: '10 May 2026', type: 'BUY', qty: 50, price: 298.30, total: 14915.00, status: 'Completed' }
  ];

  // Generate GitHub-style heatmap values
  const generateHeatmap = () => {
    const weeks = 52;
    const days = 7;
    const data: number[][] = [];

    for (let w = 0; w < weeks; w++) {
      const weekData: number[] = [];
      for (let d = 0; d < days; d++) {
        let intensity = 0;
        // Seed clusters based on the reference image pattern (Dec, Mar, Apr, May are busy)
        if (w >= 48) { // May (current)
          intensity = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
        } else if (w >= 44 && w < 48) { // Apr
          intensity = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
        } else if (w >= 40 && w < 44) { // Mar
          intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
        } else if (w >= 30 && w < 34) { // Dec
          intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
        } else { // Other months
          intensity = Math.random() > 0.9 ? Math.floor(Math.random() * 2) + 1 : 0;
        }
        weekData.push(intensity);
      }
      data.push(weekData);
    }
    return data;
  };

  const heatmapData = generateHeatmap();

  // Month labels for contribution graph
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  // Color mapping for heatmap intensities (shades of blue matching reference)
  const getHeatmapColorClass = (intensity: number) => {
    switch (intensity) {
      case 0: return 'intensity-0';
      case 1: return 'intensity-1';
      case 2: return 'intensity-2';
      case 3: return 'intensity-3';
      case 4: return 'intensity-4';
      default: return 'intensity-0';
    }
  };

  return (
    <div className="portfolio-view-container">
      {/* SIDEBAR LEFT */}
      <aside className="portfolio-sidebar-left">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            M
          </div>
          <h2 className="profile-name">Manvendra singh rathore</h2>
          <div className="profile-location">
            <MapPin size={14} className="profile-location-icon" />
            <span>Jodhpur, Rajasthan</span>
          </div>
          <button className="edit-profile-btn" onClick={() => alert('Edit profile functionality triggered!')}>
            edit profile
          </button>
        </div>

        {/* Vertical Navigation Menu Card */}
        <div className="profile-nav-card">
          <nav className="profile-nav-menu">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`profile-nav-item ${activeSubTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSubTab(item.id);
                  if (onNavigate) {
                    onNavigate(item.id);
                  }
                }}
              >
                <span className="profile-nav-icon">{item.icon}</span>
                <span className="profile-nav-label">{item.label}</span>
                <ChevronRight size={16} className="profile-nav-arrow" />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* RIGHT CONTENT PANEL */}
      <section className="portfolio-content-right">
        {/* TOP ROW GRID */}
        <div className="portfolio-top-grid">
          {/* Total Invested Card */}
          <div className="portfolio-dashboard-card total-invested-card">
            <div className="invested-header-row">
              <span className="invested-title">Total invested</span>
              <span className="invested-amount">₹ {portfolioData.totalInvestment.toLocaleString('en-IN')}</span>
            </div>

            <div className="progress-bars-container">
              {/* Total Profit */}
              <div className="progress-row">
                <div className="progress-label-row">
                  <span className="progress-label">Total profit</span>
                  <span className="progress-value">₹ {portfolioData.totalProfit.toLocaleString('en-IN')}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill profit" 
                    style={{ width: `${(portfolioData.totalProfit / portfolioData.totalInvestment) * 100 * 2}%` }} // multiplier to look filled nicely
                  />
                </div>
              </div>

              {/* Total Loss */}
              <div className="progress-row">
                <div className="progress-label-row">
                  <span className="progress-label">Total loss</span>
                  <span className="progress-value">₹ {portfolioData.totalLoss.toLocaleString('en-IN')}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill loss" 
                    style={{ width: `${(portfolioData.totalLoss / portfolioData.totalInvestment) * 100 * 2}%` }}
                  />
                </div>
              </div>

              {/* Profit-Loss % */}
              <div className="progress-row">
                <div className="progress-label-row">
                  <span className="progress-label">Profit-loss %</span>
                  <span className="progress-value">₹ {portfolioData.netPL.toLocaleString('en-IN')}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill net-pl" 
                    style={{ width: `${(portfolioData.netPL / portfolioData.totalInvestment) * 100 * 2}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Best Three Wins Card */}
          <div className="portfolio-dashboard-card best-wins-card">
            <div className="wins-header-row">
              <span className="wins-title-container">
                <Trophy size={16} className="trophy-icon" />
                <span>Your best three wins</span>
              </span>
            </div>

            <div className="best-wins-list">
              {bestWins.map((win) => (
                <div key={win.id} className="win-list-item">
                  <div className="win-rank">{win.rank}</div>
                  
                  <div className="win-logo-wrapper">
                    <div className="win-logo" data-symbol={win.symbol}>
                      {win.symbol.substring(0, 2)}
                    </div>
                  </div>

                  <div className="win-sparkline">
                    <svg viewBox="0 0 100 30" className="win-sparkline-svg">
                      <path
                        d={`M 0 ${30 - win.sparkline[0]} ` + win.sparkline.map((val, idx) => `L ${(idx / (win.sparkline.length - 1)) * 100} ${30 - val}`).join(' ')}
                        fill="none"
                        stroke="var(--success)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="win-price-container">
                    <span className="win-price">₹ {win.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    <span className="win-change color-up">
                      {win.change.toFixed(2)} ({win.pct.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="wins-footer">
              <button className="see-all-link" onClick={() => alert('Viewing all wins...')}>
                See all <ChevronRight size={14} style={{ display: 'inline' }} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: HEATMAP CARD */}
        <div className="portfolio-dashboard-card heatmap-card">
          <div className="heatmap-header-row">
            <div className="heatmap-title-col">
              <span className="heatmap-count-label">115</span>
              <span className="heatmap-subtitle">Trades in the past one year</span>
            </div>
            
            <div className="heatmap-right-options">
              <span className="active-trades-indicator">
                Total active trades: <strong>16</strong>
              </span>
              <div className="year-dropdown-btn">
                <span>{selectedYear}</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="heatmap-grid-container">
            <div className="heatmap-grid-wrapper">
              <div className="heatmap-grid">
                {heatmapData.map((week, wIdx) => (
                  <div key={wIdx} className="heatmap-column-week">
                    {week.map((intensity, dIdx) => (
                      <div
                        key={dIdx}
                        className={`heatmap-day-square ${getHeatmapColorClass(intensity)}`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${intensity > 0 ? `${intensity} trades` : 'No trades'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="heatmap-month-labels">
              {months.map((m, idx) => (
                <span key={idx} className="month-label">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: TRANSACTIONS CARD */}
        <div className="portfolio-dashboard-card transactions-card">
          <div className="transactions-header-row">
            <span className="transactions-title-container">
              <ArrowLeftRight size={16} className="transactions-icon-left" />
              <span>Transactions</span>
            </span>
          </div>

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Amount</th>
                  <th style={{ textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="tx-asset-cell">
                        <div className="tx-logo-circle" style={{ backgroundColor: tx.logoBg, color: tx.color }}>
                          {tx.logo}
                        </div>
                        <span className="tx-asset-name">{tx.asset}</span>
                      </div>
                    </td>
                    <td>
                      <span className="tx-date-cell">{tx.date}</span>
                    </td>
                    <td>
                      <span className={`tx-type-badge ${tx.type.toLowerCase()}`}>{tx.type}</span>
                    </td>
                    <td>
                      <span className="tx-qty-cell">{tx.qty}</span>
                    </td>
                    <td>
                      <span className="tx-price-cell">₹ {tx.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td>
                      <span className="tx-total-cell">₹ {tx.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="tx-status-badge completed">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
