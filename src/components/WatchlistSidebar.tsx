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

interface WatchlistSidebarProps {
  watchlist: StockItem[];
  onAddWatchlist?: () => void;
  onStockClick?: (stock: StockItem) => void;
}

const indices = [
  { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
  { name: 'NIFTY 50', price: '₹ 158.34', change: '-3.82 (2.47%)', up: false },
  { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
  { name: 'NIFTY 50', price: '₹ 158.34', change: '+3.82 (2.47%)', up: true },
];

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({ watchlist, onAddWatchlist, onStockClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = watchlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ── Search ── */}
      <div className="wl-search-box">
        <div className="wl-search-inner">
          <Search size={14} className="wl-search-icon" />
          <input
            type="text"
            className="wl-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search watchlist"
          />
          <span className="wl-shortcut">Ctrl+K</span>
        </div>
      </div>

      {/* ── Watchlist header ── */}
      <div className="wl-section-header">
        <span className="wl-section-label">Watchlist 1</span>
        <button className="wl-add-btn" onClick={onAddWatchlist}>+ Add new</button>
      </div>

      {/* ── Group label ── */}
      <div className="wl-group-label">
        <span className="wl-group-name">Default ({filtered.length})</span>
      </div>

      {/* ── Stock rows ── */}
      <div className="wl-stock-list">
        {filtered.length === 0 ? (
          <div className="wl-empty">No items found</div>
        ) : (
          filtered.map((stock) => (
            <div key={stock.id} className="wl-stock-row" onClick={() => onStockClick?.(stock)}>
              {/* left: name + exchange type */}
              <div className="wl-stock-left">
                <span className="wl-stock-name">{stock.name}</span>
                <span className="wl-stock-type">{stock.type}</span>
              </div>
              {/* right: change | pct | price — three columns matching screenshot */}
              <div className="wl-stock-right">
                <span className={`wl-change ${stock.up ? 'color-up' : 'color-down'}`}>
                  {stock.change >= 0 ? '' : ''}{stock.change.toFixed(2)}
                </span>
                <span className={`wl-pct ${stock.up ? 'color-up' : 'color-down'}`}>
                  {stock.pct.toFixed(2)}%
                </span>
                <span className={`wl-price ${stock.up ? 'color-up' : 'color-down'}`}>
                  {stock.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer ticker ── */}
      <div className="wl-footer-ticker">
        <span className="wl-ticker-label">NIFTY 50</span>
        <span className="wl-ticker-val color-up">23659.00</span>
        <span className="wl-ticker-chg color-up">41.00 (0.17%)</span>
        <span className="wl-ticker-sep">|</span>
        <span className="wl-ticker-label">SENSEX</span>
        <span className="wl-ticker-val color-up">75318.39</span>
        <span className="wl-ticker-chg color-up">117.54 (0.16%)</span>
      </div>

      {/* ── Top Indices header ── */}
      <div className="wl-section-header" style={{ marginTop: '12px' }}>
        <span className="wl-section-label">Top indices</span>
      </div>

      {/* ── Index cards 2×2 grid ── */}
      <div className="wl-indices-grid">
        {indices.map((idx, i) => (
          <div key={i} className="wl-index-card">
            <div className="wl-index-card-top">
              <div className="wl-index-logo">N</div>
              <span className="wl-index-name">{idx.name}</span>
            </div>
            <div className="wl-index-price">{idx.price}</div>
            <span className={`wl-index-badge ${idx.up ? 'up' : 'down'}`}>
              {idx.change}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
