import React from 'react';

interface CandleData {
  open: number;
  close: number;
  high: number;
  low: number;
  color: 'green' | 'red';
}

export const ChartMockup: React.FC = () => {
  // 14 standard candles forming a realistic uptrend consolidation pattern
  const candles: CandleData[] = [
    { open: 35, close: 50, high: 58, low: 28, color: 'green' },
    { open: 50, close: 42, high: 54, low: 38, color: 'red' },
    { open: 42, close: 60, high: 65, low: 38, color: 'green' },
    { open: 60, close: 78, high: 82, low: 55, color: 'green' },
    { open: 78, close: 68, high: 80, low: 62, color: 'red' },
    { open: 68, close: 62, high: 72, low: 58, color: 'red' },
    { open: 62, close: 80, high: 84, low: 52, color: 'green' },
    { open: 80, close: 74, high: 82, low: 72, color: 'red' },
    { open: 74, close: 95, high: 98, low: 68, color: 'green' },
    { open: 95, close: 88, high: 98, low: 84, color: 'red' },
    { open: 88, close: 110, high: 115, low: 82, color: 'green' },
    { open: 110, close: 122, high: 125, low: 104, color: 'green' },
    { open: 122, close: 108, high: 124, low: 102, color: 'red' },
    { open: 108, close: 118, high: 120, low: 105, color: 'green' },
  ];

  return (
    <div className="chart-container">
      {/* 1. Ticker Header Panel */}
      <div className="ticker-bar">
        <div className="ticker-item">
          <span style={{ fontWeight: 600, color: '#fff' }}>NIFTY</span>
          <span style={{ color: '#8f929d' }}>23,464.30</span>
          <span className="text-red">-351.55 (-1.48%)</span>
        </div>
        <div className="ticker-item">
          <span style={{ fontWeight: 600, color: '#fff' }}>SENSEX</span>
          <span style={{ color: '#8f929d' }}>74,813.77</span>
          <span className="text-red">-1,201.51 (-1.58%)</span>
        </div>
        <div className="ticker-item">
          <span style={{ fontWeight: 600, color: '#fff' }}>Crude Oil 18 May Fut</span>
          <span style={{ color: '#8f929d' }}>₹8,700.00</span>
          <span className="text-green">+324.00 (+3.86%)</span>
        </div>
        <div className="ticker-item">
          <span style={{ fontWeight: 600, color: '#fff' }}>Natural Gas 26 May Fut</span>
          <span style={{ color: '#8f929d' }}>₹280.00</span>
          <span className="text-green">+2.40 (+0.86%)</span>
        </div>
      </div>

      {/* 2. Sub-Header Toolbar */}
      <div className="sub-header-bar">
        <div className="sub-header-left">
          <div className="search-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontWeight: 600 }}>NIFTY 50</span>
          </div>
          <div style={{ width: '1px', height: '16px', background: '#222' }}></div>
          <span className="timeframe-pill active">1m</span>
          <span className="timeframe-pill">5m</span>
          <span className="timeframe-pill">15m</span>
          <span className="timeframe-pill">1h</span>
          <div style={{ width: '1px', height: '16px', background: '#222' }}></div>
          <span className="timeframe-pill" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            Indicators
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', color: '#8f929d' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      </div>

      {/* 3. Grid Workspace Layout */}
      <div className="chart-grid-layout">
        {/* Left Toolbar */}
        <div className="chart-left-tools">
          <div className="tool-icon">＋</div>
          <div className="tool-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div className="tool-icon">╱</div>
          <div className="tool-icon">≡</div>
          <div className="tool-icon">T</div>
          <div className="tool-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div className="tool-icon" style={{ marginBottom: '10px' }}>🔒</div>
        </div>

        {/* Main Chart Canvas Grid */}
        <div className="chart-main-area">
          <div className="chart-canvas-mockup">
            {/* SVG Trendline overlays */}
            <svg className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
              {/* Exponential Moving Average (EMA 9) - Blue Curve */}
              <path 
                d="M 20 280 Q 150 250 280 200 T 520 120 T 700 80" 
                fill="none" 
                stroke="rgba(33, 150, 243, 0.75)" 
                strokeWidth="2" 
                style={{ filter: 'drop-shadow(0 0 4px rgba(33, 150, 243, 0.4))' }}
              />
              {/* Moving Average (MA 20) - Orange Curve */}
              <path 
                d="M 20 295 Q 160 265 300 220 T 540 145 T 700 100" 
                fill="none" 
                stroke="rgba(255, 152, 0, 0.75)" 
                strokeWidth="2.5" 
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 152, 0, 0.4))' }}
              />
            </svg>

            {/* Candlesticks Layer */}
            <div className="candlestick-wrap">
              {candles.map((candle, idx) => {
                const step = 6.8; // percentage spacing
                const leftPos = 4 + idx * step;
                
                // Height scaling (multiplied for canvas vertical balance)
                const lowY = candle.low * 2.3;
                const highY = candle.high * 2.3;
                const openY = candle.open * 2.3;
                const closeY = candle.close * 2.3;
                
                const wickBottom = lowY;
                const wickHeight = highY - lowY;
                
                const bodyBottom = Math.min(openY, closeY);
                const bodyHeight = Math.abs(openY - closeY);
                
                const candleColor = candle.color === 'green' ? '#26a69a' : '#ef5350';

                return (
                  <div 
                    key={idx} 
                    className="candle" 
                    style={{ 
                      left: `${leftPos}%`, 
                      bottom: '0px', 
                      height: '100%', 
                      color: candleColor 
                    }}
                  >
                    {/* Price Wick (Thin Line) */}
                    <div 
                      className="candle-wick" 
                      style={{ 
                        bottom: `${wickBottom}px`, 
                        height: `${wickHeight}px` 
                      }}
                    />
                    {/* Candle Body */}
                    <div 
                      className="candle-body" 
                      style={{ 
                        bottom: `${bodyBottom}px`, 
                        height: `${bodyHeight}px`,
                        boxShadow: candle.color === 'green' 
                          ? '0 0 4px rgba(38, 166, 154, 0.4)' 
                          : '0 0 4px rgba(239, 83, 80, 0.4)'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Y-Axis Values */}
          <div className="chart-y-axis">
            <div>24,000.00</div>
            <div>23,990.00</div>
            <div>23,980.00</div>
            <div>23,970.00</div>
            <div>23,960.00</div>
            <div>23,950.00</div>
            <div>23,940.00</div>
          </div>
        </div>

        {/* Right Details/Options Chain Panel */}
        <div className="chart-right-order-panel">
          <div className="panel-title">
            <span>NIFTY</span>
            <span style={{ fontSize: '0.65rem', color: '#8f929d' }}>12 May 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div className="option-chain-box">
              <div className="option-row option-header">
                <span>Call LTP</span>
                <span>Strike</span>
                <span>Put LTP</span>
              </div>
              <div className="option-row">
                <span className="text-red">₹117.50</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>23,350</span>
                <span className="text-green">₹0.75</span>
              </div>
              <div className="option-row" style={{ background: 'rgba(255,255,255,0.02)', padding: '2px 0' }}>
                <span className="text-red">₹76.36</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>23,400</span>
                <span className="text-green">₹2.40</span>
              </div>
              <div className="option-row">
                <span className="text-red">₹42.10</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>23,450</span>
                <span className="text-green">₹5.80</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '0.2rem' }}>
              <button style={{ 
                flexGrow: 1, 
                background: '#26a69a', 
                border: 'none', 
                color: '#fff', 
                padding: '6px', 
                borderRadius: '4px', 
                fontWeight: 600, 
                fontSize: '0.7rem',
                cursor: 'pointer' 
              }}>
                BUY
              </button>
              <button style={{ 
                flexGrow: 1, 
                background: '#ef5350', 
                border: 'none', 
                color: '#fff', 
                padding: '6px', 
                borderRadius: '4px', 
                fontWeight: 600, 
                fontSize: '0.7rem',
                cursor: 'pointer' 
              }}>
                SELL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
