import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  type: string;
  price: number;
  change: number;
  pct: number;
  up: boolean;
}

export interface NewPosition {
  symbol: string;
  name: string;
  avgPrice: number;
  currentPrice: number;
  qty: number;
  type: 'BUY' | 'SELL';
}

interface StockChartDrawerProps {
  stock: StockItem;
  onClose: () => void;
  onOrderPlaced?: (pos: NewPosition) => void;
}

// ── Candlestick data ──────────────────────────────────────────
const CANDLES: [number, number, number, number, number, boolean][] = [
  [20, 140, 60, 110, 80, true],  [50, 130, 70, 90, 120, false],
  [80, 110, 40, 60, 95, true],   [110, 150, 80, 130, 95, false],
  [140, 120, 50, 70, 105, true], [170, 110, 40, 50, 90, true],
  [200, 140, 80, 115, 90, false],[230, 130, 50, 70, 110, true],
  [260, 120, 60, 100, 75, false],[290, 140, 50, 70, 120, true],
  [320, 110, 40, 55, 95, true],  [350, 130, 70, 105, 80, false],
  [380, 150, 60, 85, 130, false],
];

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '6M', '1Y', 'All'] as const;
type TF = typeof TIMEFRAMES[number];

// ── Options chain data ────────────────────────────────────────
interface OptionRow {
  strike: number;
  callOI: string;
  callOIPct: string;
  callOIUp: boolean;
  callLTP: string;
  callLTPPct: string;
  callLTPUp: boolean;
  putLTP: string;
  putLTPPct: string;
  putLTPUp: boolean;
  putOI: string;
  putOIPct: string;
  putOIUp: boolean;
  isATM?: boolean; // at-the-money row
}

const buildOptionsChain = (basePrice: number): OptionRow[] => {
  const atm = Math.round(basePrice / 100) * 100;
  const strikes = [-400, -300, -200, -100, 0, 100, 200, 300, 400].map((d) => atm + d);
  return strikes.map((strike) => {
    const diff = strike - atm;
    const isATM = diff === 0;
    return {
      strike,
      callOI:     isATM ? '28,515' : diff < 0 ? String(Math.floor(Math.random() * 2000 + 500)) : String(Math.floor(Math.random() * 3000 + 200)),
      callOIPct:  isATM ? '+13.87%' : diff < 0 ? `+${(Math.random()*300).toFixed(2)}%` : `+${(Math.random()*150).toFixed(2)}%`,
      callOIUp:   true,
      callLTP:    `₹${(Math.max(10, (atm - strike) * 0.9 + Math.random() * 50)).toFixed(2)}`,
      callLTPPct: `-${(Math.random() * 20 + 10).toFixed(2)}%`,
      callLTPUp:  false,
      putLTP:     `₹${(Math.max(10, (strike - atm) * 0.9 + Math.random() * 50 + 800)).toFixed(2)}`,
      putLTPPct:  `+${(Math.random() * 20 + 10).toFixed(2)}%`,
      putLTPUp:   true,
      putOI:      isATM ? '36,528' : String(Math.floor(Math.random() * 3000 + 500)),
      putOIPct:   `+${(Math.random() * 100 + 5).toFixed(2)}%`,
      putOIUp:    true,
      isATM,
    };
  });
};

// ── Main component ────────────────────────────────────────────
export const StockChartDrawer: React.FC<StockChartDrawerProps> = ({
  stock,
  onClose,
  onOrderPlaced,
}) => {
  const [tf, setTf] = useState<TF>('1D');
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'chart' | 'options'>('chart');
  const [expiry] = useState('30 Jun');

  const isUp = stock.up;
  const changeStr = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.pct.toFixed(2)}%)`;

  const low    = (stock.price * 0.96).toFixed(2);
  const high   = (stock.price * 1.04).toFixed(2);
  const low52  = (stock.price * 0.72).toFixed(2);
  const high52 = (stock.price * 1.40).toFixed(2);

  const optionsChain = buildOptionsChain(stock.price);
  const atmPrice = (Math.round(stock.price / 100) * 100).toFixed(2);
  const atmChange = stock.change.toFixed(2);
  const atmPct = Math.abs(stock.pct).toFixed(2);

  const handleOrder = (side: 'BUY' | 'SELL') => {
    if (qty < 1) return;
    const pos: NewPosition = {
      symbol: stock.name.toUpperCase().replace(/\s+/g, ''),
      name: stock.name,
      avgPrice: stock.price,
      currentPrice: stock.price,
      qty,
      type: side,
    };
    onOrderPlaced?.(pos);
    setToast(`${side} order for ${qty} × ${stock.name} @ ₹${stock.price.toFixed(2)} placed!`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="scd-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <aside className="scd-panel" role="dialog" aria-modal="true" aria-label={`${stock.name} chart`}>

        {/* ── Header ── */}
        <div className="scd-header">
          <div className="scd-title-block">
            <h2 className="scd-stock-name">{stock.name}</h2>
            <div className="scd-price-row">
              <span className="scd-price">₹ {stock.price.toFixed(2)}</span>
              <span className={`scd-change ${isUp ? 'color-up' : 'color-down'}`}>
                {changeStr} 1D
              </span>
            </div>
          </div>
          <button className="scd-close-btn" onClick={onClose} aria-label="Close chart">
            <X size={18} />
          </button>
        </div>

        {/* Toast */}
        {toast && <div className="scd-toast">{toast}</div>}

        {/* ── Panel toggle tabs ── */}
        <div className="scd-panel-tabs">
          <button
            className={`scd-panel-tab ${activePanel === 'chart' ? 'active' : ''}`}
            onClick={() => setActivePanel('chart')}
          >
            Chart
          </button>
          <button
            className={`scd-panel-tab ${activePanel === 'options' ? 'active' : ''}`}
            onClick={() => setActivePanel('options')}
          >
            Options
          </button>
        </div>

        {/* ── CHART PANEL ── */}
        {activePanel === 'chart' && (
          <>
            {/* Candlestick chart */}
            <div className="scd-chart-wrap">
              <svg viewBox="0 0 400 200" className="scd-svg" preserveAspectRatio="xMidYMid meet">
                <line x1="0" y1="40"  x2="400" y2="40"  stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                <line x1="0" y1="90"  x2="400" y2="90"  stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3" />
                {CANDLES.map(([x, wickMin, wickMax, bodyMin, bodyMax, green], i) => {
                  const c = green ? '#10b981' : '#ef4444';
                  return (
                    <g key={i}>
                      <line x1={x} y1={wickMin} x2={x} y2={wickMax} stroke={c} strokeWidth="1.5" />
                      <rect x={x - 5} y={Math.min(bodyMin, bodyMax)} width="10"
                        height={Math.max(2, Math.abs(bodyMax - bodyMin))} fill={c} rx="1" />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Timeframe */}
            <div className="scd-tf-row">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t}
                  className={`scd-tf-btn ${tf === t ? 'active' : ''}`}
                  onClick={() => setTf(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* About */}
            <div className="scd-about">
              <h4 className="scd-about-title">About</h4>
              <div className="scd-range-group">
                <div className="scd-range-labels"><span>Today's Low</span><span>Today's High</span></div>
                <div className="scd-range-values"><span>{low}</span><span>{high}</span></div>
                <div className="scd-range-bar">
                  <div className="scd-range-track" />
                  <div className="scd-range-dot" style={{ left: '20%' }} />
                </div>
              </div>
              <div className="scd-range-group" style={{ marginTop: '14px' }}>
                <div className="scd-range-labels"><span>52 Week Low</span><span>52 Week High</span></div>
                <div className="scd-range-values"><span>{low52}</span><span>{high52}</span></div>
                <div className="scd-range-bar">
                  <div className="scd-range-track" />
                  <div className="scd-range-dot" style={{ left: '35%' }} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── OPTIONS CHAIN PANEL ── */}
        {activePanel === 'options' && (
          <div className="oc-container">
            {/* Options header: symbol + expiry selectors */}
            <div className="oc-header-bar">
              <button className="oc-selector-btn">
                <span className="oc-selector-icon">🏦</span>
                <span className="oc-selector-label">{stock.name}</span>
                <ChevronDown size={13} />
              </button>
              <span className="oc-dot-sep">·</span>
              <button className="oc-selector-btn">
                <span className="oc-selector-label">{expiry}</span>
                <ChevronDown size={13} />
              </button>
            </div>

            {/* Column headers */}
            <div className="oc-col-header">
              <span className="oc-col-call">Call OI</span>
              <span className="oc-col-call">Call LTP</span>
              <span className="oc-col-strike">Strike</span>
              <span className="oc-col-put">Put LTP</span>
              <span className="oc-col-put">Put OI</span>
            </div>

            {/* Rows */}
            <div className="oc-rows-wrap">
              {optionsChain.map((row, i) => (
                <React.Fragment key={i}>
                  {/* ATM price banner */}
                  {row.isATM && (
                    <div className="oc-atm-banner">
                      <span className="oc-atm-price">{atmPrice}</span>
                      <span className="oc-atm-sep"> | </span>
                      <span className={`oc-atm-change ${isUp ? 'color-up' : 'color-down'}`}>
                        {isUp ? '' : '-'}{Math.abs(parseFloat(atmChange)).toFixed(2)} ({atmPct}%)
                      </span>
                    </div>
                  )}
                  <div className={`oc-row ${row.isATM ? 'oc-row-atm' : ''}`}>
                    {/* Call OI */}
                    <div className="oc-cell oc-cell-call">
                      <span className="oc-val">{row.callOI}</span>
                      <span className={`oc-pct ${row.callOIUp ? 'color-up' : 'color-down'}`}>{row.callOIPct}</span>
                    </div>
                    {/* Call LTP */}
                    <div className="oc-cell oc-cell-call">
                      <span className="oc-val">{row.callLTP}</span>
                      <span className={`oc-pct ${row.callLTPUp ? 'color-up' : 'color-down'}`}>{row.callLTPPct}</span>
                    </div>
                    {/* Strike */}
                    <div className="oc-cell oc-cell-strike">
                      <span className="oc-strike-val">{row.strike.toLocaleString('en-IN')}</span>
                      {row.isATM && <div className="oc-atm-bar" />}
                    </div>
                    {/* Put LTP */}
                    <div className="oc-cell oc-cell-put">
                      <span className="oc-val">{row.putLTP}</span>
                      <span className={`oc-pct ${row.putLTPUp ? 'color-up' : 'color-down'}`}>{row.putLTPPct}</span>
                    </div>
                    {/* Put OI */}
                    <div className="oc-cell oc-cell-put">
                      <span className="oc-val">{row.putOI}</span>
                      <span className={`oc-pct ${row.putOIUp ? 'color-up' : 'color-down'}`}>{row.putOIPct}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ── Order row (always visible) ── */}
        <div className="scd-order-row">
          <div className="scd-qty-wrap">
            <label className="scd-qty-label" htmlFor="scd-qty">QTY</label>
            <input
              id="scd-qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="scd-qty-input"
            />
          </div>
          <div className="scd-action-btns">
            <button className="scd-btn sell" onClick={() => handleOrder('SELL')}>Sell</button>
            <button className="scd-btn buy"  onClick={() => handleOrder('BUY')}>Buy</button>
          </div>
        </div>

      </aside>
    </>
  );
};
