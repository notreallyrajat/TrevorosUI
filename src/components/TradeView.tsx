import React, { useState } from 'react';
import { WatchlistSidebar } from './WatchlistSidebar';

interface StockItem {
  id: string;
  name: string;
  type: string;
  price: number;
  change: number;
  pct: number;
  up: boolean;
}

interface CenterStock {
  name: string;
  price: string;
  change: string;
  up: boolean;
  lowToday: string;
  highToday: string;
  dotToday: string;
  low52: string;
  high52: string;
  dot52: string;
  candlesticks: [number, number, number, number, number, boolean][];
}

const centerListItems: CenterStock[] = [
  {
    name: 'Aequs',
    price: '₹ 151.22',
    change: '+18.81 (13.44%)',
    up: true,
    lowToday: '145.45',
    highToday: '185.23',
    dotToday: '20%',
    low52: '135.45',
    high52: '210.23',
    dot52: '12%',
    candlesticks: [
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
    ]
  },
  {
    name: 'Suzlon Energy',
    price: '₹ 158.34',
    change: '+3.82 (2.47%)',
    up: true,
    lowToday: '150.10',
    highToday: '162.90',
    dotToday: '65%',
    low52: '110.00',
    high52: '180.50',
    dot52: '68%',
    candlesticks: [
      [20, 120, 80, 100, 90, true],
      [50, 110, 70, 85, 100, false],
      [80, 130, 60, 75, 115, true],
      [110, 140, 90, 120, 100, false],
      [140, 110, 50, 65, 95, true],
      [170, 125, 75, 90, 110, false],
      [200, 130, 60, 70, 120, true],
      [230, 115, 45, 60, 90, true],
      [260, 140, 80, 110, 95, false],
      [290, 120, 50, 75, 105, true],
      [320, 135, 70, 90, 120, false],
      [350, 110, 40, 55, 95, true],
      [380, 125, 65, 80, 110, false]
    ]
  },
  {
    name: 'IEL',
    price: '₹ 240.50',
    change: '+12.10 (5.31%)',
    up: true,
    lowToday: '228.00',
    highToday: '245.50',
    dotToday: '75%',
    low52: '180.00',
    high52: '260.00',
    dot52: '75%',
    candlesticks: [
      [20, 100, 50, 80, 70, true],
      [50, 120, 60, 75, 105, false],
      [80, 110, 40, 65, 90, true],
      [110, 130, 80, 115, 95, false],
      [140, 115, 55, 70, 100, true],
      [170, 105, 45, 60, 85, true],
      [200, 125, 75, 105, 90, false],
      [230, 110, 50, 70, 95, true],
      [260, 135, 75, 115, 90, false],
      [290, 115, 45, 65, 100, true],
      [320, 100, 30, 50, 80, true],
      [350, 120, 65, 95, 80, false],
      [380, 140, 70, 90, 130, false]
    ]
  }
];

export interface NewPosition {
  symbol: string;
  name: string;
  avgPrice: number;
  currentPrice: number;
  qty: number;
  type: 'BUY' | 'SELL';
}

interface TradeViewProps {
  watchlist: StockItem[];
  onAddWatchlist?: () => void;
  onOrderPlaced?: (position: NewPosition) => void;
}

export const TradeView: React.FC<TradeViewProps> = ({ watchlist, onAddWatchlist, onOrderPlaced }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'All'>('1D');
  const [selectedStock, setSelectedStock] = useState<CenterStock>(centerListItems[0]);
  const [selectedListTab] = useState<'List 1'>('List 1');
  const [orderQty, setOrderQty] = useState(1);
  const [orderToast, setOrderToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setOrderToast(msg);
    setTimeout(() => setOrderToast(null), 4000);
  };

  const handleOrder = (side: 'BUY' | 'SELL') => {
    const priceStr = selectedStock.price.replace('₹', '').replace(/,/g, '').trim();
    const price = parseFloat(priceStr);
    if (isNaN(price) || orderQty < 1) return;

    const position: NewPosition = {
      symbol: selectedStock.name.toUpperCase().replace(/\s+/g, ''),
      name: selectedStock.name,
      avgPrice: price,
      currentPrice: price,
      qty: orderQty,
      type: side,
    };

    if (onOrderPlaced) onOrderPlaced(position);
    showToast(`${side} order for ${orderQty} × ${selectedStock.name} @ ${selectedStock.price} placed! Check Positions tab.`);
  };

  return (
    <div className="trade-view-three-col-container">
      {/* LEFT COLUMN: WATCHLIST & INDICES */}
      <aside className="trade-sidebar-left">
        <WatchlistSidebar watchlist={watchlist} onAddWatchlist={onAddWatchlist} />
      </aside>

      {/* CENTER COLUMN: LIST VIEW */}
      <section className="trade-center-list-panel">
        <div className="center-panel-header">
          <div className="center-tab-nav">
            <button
              className={`center-tab-btn ${selectedListTab === 'List 1' ? 'active' : ''}`}
            >
              List 1
            </button>
            <button className="center-tab-btn" onClick={() => alert('Feature only available in Premium subscription.')}>
              + Add new
            </button>
          </div>
        </div>

        <div className="center-panel-list">
          {centerListItems.map((item) => {
            const isSelected = selectedStock.name === item.name;
            return (
              <div
                key={item.name}
                className={`center-list-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedStock(item)}
              >
                <div className="stock-info">
                  <span className="stock-symbol">{item.name}</span>
                  <span className="stock-name">Equity Shares</span>
                </div>
                <div className="stock-prices">
                  <span className="stock-price">{item.price}</span>
                  <span className={`stock-change ${item.up ? 'up' : 'down'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RIGHT COLUMN: STOCK DETAILS CHART & BUY/SELL */}
      <aside className="trade-right-details-panel">
        {/* Order Toast */}
        {orderToast && (
          <div className="order-toast-banner">
            {orderToast}
          </div>
        )}

        {/* Stock Details Header */}
        <header className="details-header">
          <h2 className="stock-main-title">{selectedStock.name}</h2>
          <div className="stock-price-row">
            <span className="main-price-val">{selectedStock.price}</span>
            <span className={`main-change-lbl ${selectedStock.up ? 'color-up' : 'color-down'}`}>
              {selectedStock.change} 1D
            </span>
          </div>
        </header>

        {/* Candlestick SVG Chart */}
        <div className="details-chart-wrapper">
          <svg viewBox="0 0 400 200" className="svg-candlestick-chart">
            {/* Grid Lines */}
            <line x1="0" y1="40" x2="400" y2="40" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="90" x2="400" y2="90" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
            <line x1="0" y1="140" x2="400" y2="140" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />

            {/* Candlesticks */}
            {selectedStock.candlesticks.map(([x, wickMin, wickMax, bodyMin, bodyMax, isGreen], idx) => {
              const color = isGreen ? '#10b981' : '#ef4444';
              return (
                <g key={idx}>
                  <line x1={x} y1={wickMin} x2={x} y2={wickMax} stroke={color} strokeWidth="1.5" />
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
              <span className="val-bold">{selectedStock.lowToday}</span>
              <span className="val-bold">{selectedStock.highToday}</span>
            </div>
            <div className="range-bar-wrapper">
              <div className="range-bar-bg" />
              <div className="range-bar-dot" style={{ left: selectedStock.dotToday }} />
            </div>
          </div>

          {/* 52 Week Low / High Slider */}
          <div className="range-slider-group" style={{ marginTop: '16px' }}>
            <div className="range-labels">
              <span className="lbl-muted">52 Week Low</span>
              <span className="lbl-muted">52 Week High</span>
            </div>
            <div className="range-values">
              <span className="val-bold">{selectedStock.low52}</span>
              <span className="val-bold">{selectedStock.high52}</span>
            </div>
            <div className="range-bar-wrapper">
              <div className="range-bar-bg" />
              <div className="range-bar-dot" style={{ left: selectedStock.dot52 }} />
            </div>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="order-qty-row">
          <label className="order-qty-label" htmlFor="trade-qty">Quantity</label>
          <input
            id="trade-qty"
            type="number"
            min={1}
            value={orderQty}
            onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="order-qty-input"
          />
        </div>

        {/* Buy/Sell Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button className="action-trigger-btn sell" onClick={() => handleOrder('SELL')}>
            Sell
          </button>
          <button className="action-trigger-btn buy" onClick={() => handleOrder('BUY')}>
            Buy
          </button>
        </div>
      </aside>
    </div>
  );
};
