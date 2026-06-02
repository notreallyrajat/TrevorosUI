import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
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
  theme?: 'light' | 'dark';
}

// ── Options chain data ────────────────────────────────────────
interface OptionRow {
  strike: number;
  callOI: string; callOIPct: string; callOIUp: boolean;
  callLTP: string; callLTPPct: string;
  putLTP: string; putLTPPct: string; putLTPUp: boolean;
  putOI: string; putOIPct: string; putOIUp: boolean;
  isATM?: boolean;
}

const buildOptionsChain = (basePrice: number): OptionRow[] => {
  const atm = Math.round(basePrice / 100) * 100;
  return [-400, -300, -200, -100, 0, 100, 200, 300, 400].map((d) => {
    const strike = atm + d;
    const isATM  = d === 0;
    return {
      strike,
      callOI:     isATM ? '28,515' : String(Math.floor(Math.random() * 3000 + 200)),
      callOIPct:  `+${(Math.random() * 250 + 5).toFixed(2)}%`,  callOIUp: true,
      callLTP:    `₹${(Math.max(10, (atm - strike) * 0.9 + Math.random() * 50)).toFixed(2)}`,
      callLTPPct: `-${(Math.random() * 20 + 10).toFixed(2)}%`,
      putLTP:     `₹${(Math.max(10, (strike - atm) * 0.9 + Math.random() * 50 + 800)).toFixed(2)}`,
      putLTPPct:  `+${(Math.random() * 20 + 10).toFixed(2)}%`,  putLTPUp: true,
      putOI:      isATM ? '36,528' : String(Math.floor(Math.random() * 3000 + 500)),
      putOIPct:   `+${(Math.random() * 100 + 5).toFixed(2)}%`,  putOIUp: true,
      isATM,
    };
  });
};

// ── Component ─────────────────────────────────────────────────
export const StockChartDrawer: React.FC<StockChartDrawerProps> = ({
  stock, onClose, onOrderPlaced, theme = 'light',
}) => {
  const [qty, setQty]         = useState(1);
  const [toast, setToast]     = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'chart' | 'options'>('chart');

  const isUp      = stock.up;
  const changeStr = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.pct.toFixed(2)}%)`;
  const low       = (stock.price * 0.96).toFixed(2);
  const high      = (stock.price * 1.04).toFixed(2);
  const low52     = (stock.price * 0.72).toFixed(2);
  const high52    = (stock.price * 1.40).toFixed(2);

  const optionsChain = buildOptionsChain(stock.price);
  const atmPrice     = (Math.round(stock.price / 100) * 100).toFixed(2);
  const atmPct       = Math.abs(stock.pct).toFixed(2);

  const handleOrder = (side: 'BUY' | 'SELL') => {
    if (qty < 1) return;
    onOrderPlaced?.({
      symbol: stock.name.toUpperCase().replace(/\s+/g, ''),
      name: stock.name, avgPrice: stock.price, currentPrice: stock.price, qty, type: side,
    });
    setToast(`${side} order for ${qty} × ${stock.name} @ ₹${stock.price.toFixed(2)} placed!`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      <div className="scd-backdrop" onClick={onClose} aria-hidden="true" />

      <aside className="scd-panel" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="scd-header">
          <div className="scd-title-block">
            <h2 className="scd-stock-name">{stock.name}</h2>
            <div className="scd-price-row">
              <span className="scd-price">₹ {stock.price.toFixed(2)}</span>
              <span className={`scd-change ${isUp ? 'color-up' : 'color-down'}`}>{changeStr} 1D</span>
            </div>
          </div>
          <button className="scd-close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>

        {toast && <div className="scd-toast">{toast}</div>}

        {/* Tabs */}
        <div className="scd-panel-tabs">
          <button className={`scd-panel-tab ${activePanel === 'chart' ? 'active' : ''}`}
            onClick={() => setActivePanel('chart')}>Chart</button>
          <button className={`scd-panel-tab ${activePanel === 'options' ? 'active' : ''}`}
            onClick={() => setActivePanel('options')}>Options</button>
        </div>

        {/* ── CHART PANEL ── */}
        {activePanel === 'chart' && (
          <div className="scd-chart-panel">
            {/* Real candlestick chart — lightweight-charts + Yahoo Finance */}
            <div className="scd-lc-chart">
              <StockChart
                key={stock.id}
                stockName={stock.name}
                theme={theme}
                height={280}
                showVolume={true}
              />
            </div>

            {/* About range sliders */}
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
          </div>
        )}

        {/* ── OPTIONS PANEL ── */}
        {activePanel === 'options' && (
          <div className="oc-container">
            <div className="oc-header-bar">
              <button className="oc-selector-btn">
                <span className="oc-selector-icon">🏦</span>
                <span className="oc-selector-label">{stock.name}</span>
                <ChevronDown size={13} />
              </button>
              <span className="oc-dot-sep">·</span>
              <button className="oc-selector-btn">
                <span className="oc-selector-label">30 Jun</span>
                <ChevronDown size={13} />
              </button>
            </div>
            <div className="oc-col-header">
              <span className="oc-col-call">Call OI</span>
              <span className="oc-col-call">Call LTP</span>
              <span className="oc-col-strike">Strike</span>
              <span className="oc-col-put">Put LTP</span>
              <span className="oc-col-put">Put OI</span>
            </div>
            <div className="oc-rows-wrap">
              {optionsChain.map((row, i) => (
                <React.Fragment key={i}>
                  {row.isATM && (
                    <div className="oc-atm-banner">
                      <span className="oc-atm-price">{atmPrice}</span>
                      <span className="oc-atm-sep"> | </span>
                      <span className={`oc-atm-change ${isUp ? 'color-up' : 'color-down'}`}>
                        {isUp ? '+' : '-'}{Math.abs(stock.change).toFixed(2)} ({atmPct}%)
                      </span>
                    </div>
                  )}
                  <div className={`oc-row ${row.isATM ? 'oc-row-atm' : ''}`}>
                    <div className="oc-cell oc-cell-call">
                      <span className="oc-val">{row.callOI}</span>
                      <span className={`oc-pct ${row.callOIUp ? 'color-up' : 'color-down'}`}>{row.callOIPct}</span>
                    </div>
                    <div className="oc-cell oc-cell-call">
                      <span className="oc-val">{row.callLTP}</span>
                      <span className="oc-pct color-down">{row.callLTPPct}</span>
                    </div>
                    <div className="oc-cell oc-cell-strike">
                      <span className="oc-strike-val">{row.strike.toLocaleString('en-IN')}</span>
                      {row.isATM && <div className="oc-atm-bar" />}
                    </div>
                    <div className="oc-cell oc-cell-put">
                      <span className="oc-val">{row.putLTP}</span>
                      <span className={`oc-pct ${row.putLTPUp ? 'color-up' : 'color-down'}`}>{row.putLTPPct}</span>
                    </div>
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

        {/* Order row */}
        <div className="scd-order-row">
          <div className="scd-qty-wrap">
            <label className="scd-qty-label" htmlFor="scd-qty">QTY</label>
            <input id="scd-qty" type="number" min={1} value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="scd-qty-input" />
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
