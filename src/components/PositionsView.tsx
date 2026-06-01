import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Layers } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  name: string;
  avgPrice: number;
  currentPrice: number;
  qty: number;
  type: 'BUY' | 'SELL';
}

interface PositionsViewProps {
  positions: Position[];
  onPositionsChange: (positions: Position[]) => void;
}

export const PositionsView: React.FC<PositionsViewProps> = ({ positions, onPositionsChange }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const handleSquareOff = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;
    const pnl = (pos.currentPrice - pos.avgPrice) * pos.qty;
    const pnlText = pnl >= 0 ? `+₹${pnl.toFixed(2)}` : `-₹${Math.abs(pnl).toFixed(2)}`;
    onPositionsChange(positions.filter((p) => p.id !== id));
    setLogs((prev) => [
      `Squared off ${pos.qty} shares of ${pos.symbol} at ₹${pos.currentPrice.toFixed(2)}. P&L realized: ${pnlText}`,
      ...prev
    ]);
  };

  const handleRefresh = () => {
    onPositionsChange(
      positions.map((p) => {
        const delta = (Math.random() - 0.48) * 4;
        return { ...p, currentPrice: Number(Math.max(1, p.currentPrice + delta).toFixed(2)) };
      })
    );
    setLogs((prev) => [`Refreshed live market feeds`, ...prev]);
  };

  const totalInvested = positions.reduce((acc, p) => acc + p.avgPrice * p.qty, 0);
  const currentValue = positions.reduce((acc, p) => acc + p.currentPrice * p.qty, 0);
  const totalPnL = currentValue - totalInvested;
  const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <div className="positions-view-container">
      {/* HEADER METRICS */}
      <header className="positions-metrics-header">
        <div className="pos-metric-card">
          <span className="pos-label">Total Invested Value</span>
          <span className="pos-val">₹ {totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="pos-metric-card">
          <span className="pos-label">Current Market Value</span>
          <span className="pos-val">₹ {currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="pos-metric-card">
          <span className="pos-label">Total Floating P&L</span>
          <span className={`pos-val ${totalPnL >= 0 ? 'color-up' : 'color-down'}`}>
            {totalPnL >= 0
              ? <TrendingUp size={16} style={{ display: 'inline', marginRight: '4px' }} />
              : <TrendingDown size={16} style={{ display: 'inline', marginRight: '4px' }} />}
            ₹ {totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({totalPnLPct.toFixed(2)}%)
          </span>
        </div>
      </header>

      {/* POSITIONS TABLE */}
      <main className="positions-main-content">
        <div className="pos-table-card">
          <div className="pos-title-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} className="pos-icon-layers" />
              <h3>Open Positions ({positions.length})</h3>
            </div>
            <button className="pos-refresh-btn" onClick={handleRefresh}>
              <RefreshCw size={14} />
              <span>Refresh feeds</span>
            </button>
          </div>

          {positions.length === 0 ? (
            <div className="pos-empty-state">
              <p>No active positions. Use the Trade tab to buy assets.</p>
            </div>
          ) : (
            <div className="pos-table-wrapper">
              <table className="pos-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Invested Amt</th>
                    <th>Market Value</th>
                    <th>Unrealized P&L</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((p) => {
                    const invested = p.avgPrice * p.qty;
                    const value = p.currentPrice * p.qty;
                    const pnl = value - invested;
                    const pnlPct = (pnl / invested) * 100;
                    return (
                      <tr key={p.id}>
                        <td>
                          <div className="pos-asset-cell">
                            <strong>{p.symbol}</strong>
                            <span>{p.name}</span>
                          </div>
                        </td>
                        <td><span className={`pos-type-badge ${p.type.toLowerCase()}`}>{p.type}</span></td>
                        <td>{p.qty}</td>
                        <td>₹ {p.avgPrice.toFixed(2)}</td>
                        <td>₹ {p.currentPrice.toFixed(2)}</td>
                        <td>₹ {invested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td>₹ {value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td>
                          <span className={`pos-pnl-cell ${pnl >= 0 ? 'color-up' : 'color-down'}`}>
                            {pnl >= 0 ? '+' : ''}₹ {pnl.toFixed(2)} ({pnlPct.toFixed(2)}%)
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="pos-square-btn" onClick={() => handleSquareOff(p.id)}>
                            Square Off
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ACTIVITY LOG */}
        {logs.length > 0 && (
          <div className="pos-logs-card">
            <h4>Trade Activity Log</h4>
            <div className="pos-logs-list">
              {logs.map((n, idx) => (
                <div key={idx} className="pos-log-item">{n}</div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
