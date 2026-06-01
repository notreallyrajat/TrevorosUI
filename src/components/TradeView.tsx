import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  type: string;
  price: number;
  change: number;
  pct: number;
  up: boolean;
}

export const TradeView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListTab, setSelectedListTab] = useState<'List 1'>('List 1');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'All'>('1D');

  // Left sidebar watchlist
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

  // Center column list items
  const centerListItems = [
    { name: 'Suzlon Energy', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
    { name: 'IEL', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
    { name: 'Suzlon Energy', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true }
  ];

  // Filtered watchlist
  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="trade-view-three-col-container">
      {/* LEFT COLUMN: WATCHLIST & INDICES */}
      <aside className="trade-sidebar-left">
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

      {/* CENTER COLUMN: LIST VIEW */}
      <section className="trade-center-list-panel">
        <div className="list-tabs-header">
          <button 
            className={`list-tab-btn ${selectedListTab === 'List 1' ? 'active' : ''}`}
            onClick={() => setSelectedListTab('List 1')}
          >
            List 1
          </button>
          <button className="list-tab-add-btn">
            + Add new
          </button>
        </div>

        <div className="center-stocks-list">
          {centerListItems.map((item, idx) => (
            <div key={idx} className="center-stock-row">
              <div className="stock-info-col">
                <span className="stock-name-title">{item.name}</span>
              </div>
              <div className="stock-price-col">
                <span className="stock-price-val">{item.price}</span>
                <span className="stock-change-val color-up">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT COLUMN: STOCK DETAILS CHART & BUY/SELL */}
      <aside className="trade-right-details-panel">
        {/* Stock Details Header */}
        <header className="details-header">
          <h2 className="stock-main-title">Aequs</h2>
          <div className="stock-price-row">
            <span className="main-price-val">₹ 151.22</span>
            <span className="main-change-lbl color-up">+ 18.81 (13.44%) 1D</span>
          </div>
        </header>

        {/* Candlestick SVG Chart */}
        <div className="details-chart-wrapper">
          <svg viewBox="0 0 400 200" className="svg-candlestick-chart">
            {/* Grid Lines */}
            <line x1="0" y1="40" x2="400" y2="40" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="90" x2="400" y2="90" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="140" x2="400" y2="140" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />

            {/* Candlesticks (mock data matching image style) */}
            {/* format: [x, wickMin, wickMax, bodyMin, bodyMax, isGreen] */}
            {([
              [20, 140, 60, 110, 80, true],
              [50, 130, 70, 90, 120, false],
              [80, 110, 40, 60, 95, true],
              [110, 150, 80, 130, 95, false],
              [140, 120, 50, 70, 105, true],
              [170, 110, 40, 50, 90, true],
              [200, 140, 80, 115, 90, false],
              [230, 130, 50, 70, 110, true],
              [260, 120, 60, 100, 75, false],
              [290, 140, 50, 70, 120, true],
              [320, 110, 40, 55, 95, true],
              [350, 130, 70, 105, 80, false],
              [380, 150, 60, 85, 130, false]
            ] as [number, number, number, number, number, boolean][]).map(([x, wickMin, wickMax, bodyMin, bodyMax, isGreen], idx) => {
              const color = isGreen ? '#10b981' : '#ef4444';
              return (
                <g key={idx}>
                  {/* Wick */}
                  <line x1={x} y1={wickMin} x2={x} y2={wickMax} stroke={color} strokeWidth="1.5" />
                  {/* Body */}
                  <rect 
                    x={x - 4} 
                    y={Math.min(bodyMin, bodyMax)} 
                    width="8" 
                    height={Math.abs(bodyMax - bodyMin)} 
                    fill={color} 
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Timeframe Selector */}
        <div className="timeframe-selector-row">
          {(['1D', '1W', '1M', '3M', '6M', '1Y', 'All'] as const).map((tf) => (
            <button
              key={tf}
              className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* About Section */}
        <div className="about-section-container">
          <h4 className="about-title">About</h4>
          
          {/* Today's Low / High Slider */}
          <div className="range-slider-group">
            <div className="range-labels">
              <span className="lbl-muted">Today's Low</span>
              <span className="lbl-muted">Today's High</span>
            </div>
            <div className="range-values">
              <span className="val-bold">145.45</span>
              <span className="val-bold">185.23</span>
            </div>
            <div className="range-bar-wrapper">
              <div className="range-bar-bg" />
              {/* Range slider indicator position */}
              <div className="range-bar-dot" style={{ left: '20%' }} />
            </div>
          </div>

          {/* 52 Week Low / High Slider */}
          <div className="range-slider-group" style={{ marginTop: '16px' }}>
            <div className="range-labels">
              <span className="lbl-muted">52 Week Low</span>
              <span className="lbl-muted">52 Week High</span>
            </div>
            <div className="range-values">
              <span className="val-bold">135.45</span>
              <span className="val-bold">210.23</span>
            </div>
            <div className="range-bar-wrapper">
              <div className="range-bar-bg" />
              <div className="range-bar-dot" style={{ left: '12%' }} />
            </div>
          </div>
        </div>

        {/* Buy/Sell Action Buttons */}
        <div className="action-buttons-row">
          <button className="trade-action-btn sell-btn" onClick={() => alert('Sell order placed successfully!')}>
            Sell
          </button>
          <button className="trade-action-btn buy-btn" onClick={() => alert('Buy order placed successfully!')}>
            Buy
          </button>
        </div>
      </aside>
    </div>
  );
};
