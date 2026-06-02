import React from 'react';
import { Info } from 'lucide-react';
import { WatchlistSidebar } from './WatchlistSidebar';
import { StockChart } from './StockChart';

interface StockItem {
  id: string;
  name: string;
  type: string;
  price: number;
  change: number;
  pct: number;
  up: boolean;
}

interface DisciplineReportViewProps {
  watchlist: StockItem[];
  onAddWatchlist?: () => void;
  onStockClick?: (stock: StockItem) => void;
  theme?: 'light' | 'dark';
}

export const DisciplineReportView: React.FC<DisciplineReportViewProps> = ({
  watchlist, onAddWatchlist, onStockClick, theme = 'light',
}) => {
  return (
    <div className="discipline-report-container view-transition">
      <aside className="discipline-sidebar-left">
        <WatchlistSidebar watchlist={watchlist} onAddWatchlist={onAddWatchlist} onStockClick={onStockClick} />
      </aside>

      <main className="discipline-content-right">
        <header className="discipline-header">
          <h1 className="discipline-title">Trader Discipline Report</h1>
          <p className="discipline-subtitle">Behavioral Analysis & Risk Protocol Adherence</p>
        </header>

        <div className="discipline-grid">
          {/* LEFT COLUMN */}
          <div className="discipline-left-column">

            {/* NIFTY 50 Live Chart — replaces mock line chart */}
            <div className="discipline-card score-trend-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">NIFTY 50 — Live Chart</h3>
                  <p className="card-subtitle">NSE:NIFTY · Real-time</p>
                </div>
                <span className="avg-badge tv-live-badge">● Live</span>
              </div>
              <div className="dr-tv-chart-tall">
                <StockChart stockName="NIFTY 50" theme={theme} height={320} showVolume={true} />
              </div>
              <div className="discipline-notice-banner">
                <Info size={16} className="notice-icon" />
                <span className="notice-text">
                  Live NIFTY 50 data powered by TradingView. Use the toolbar to switch indicators, drawing tools and chart types.
                </span>
              </div>
            </div>

            {/* BANK NIFTY Mini Chart — replaces mock radar chart */}
            <div className="discipline-card stability-index-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">BANK NIFTY — Overview</h3>
                  <p className="card-subtitle">NSE:BANKNIFTY · Today</p>
                </div>
              </div>
              <div className="dr-tv-mini">
                <StockChart stockName="BANKNIFTY" theme={theme} height={240} showVolume={false} />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="discipline-right-column">

            {/* SENSEX Mini Chart — replaces mock bar chart */}
            <div className="discipline-card violation-distribution-card">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title">SENSEX — Overview</h3>
                  <p className="card-subtitle">BSE:SENSEX · Today</p>
                </div>
              </div>
              <div className="dr-tv-mini">
                <StockChart stockName="SENSEX" theme={theme} height={180} showVolume={false} />
              </div>
              <div className="violation-status-container">
                <div className="status-header">
                  <span className="status-dot success" />
                  <span className="status-badge-lbl">Markets Open</span>
                </div>
                <p className="status-description">
                  BSE SENSEX real-time data. All major indices are within normal deviation limits.
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
                  <div className="progress-bar-fill net-pl"
                    style={{ width: '40%', height: '8px', backgroundColor: '#3b82f6' }} />
                </div>
                <p className="participation-caption">
                  Requires 3 more active trading days to complete evaluation phase.
                </p>
              </div>

              {/* ONGC mini chart */}
              <div style={{ marginTop: '16px', borderRadius: '8px', overflow: 'hidden' }}>
                <StockChart stockName="ONGC" theme={theme} height={100} showVolume={false} />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
