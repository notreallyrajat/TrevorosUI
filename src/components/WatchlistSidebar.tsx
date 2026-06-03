import React, { useState, useEffect, useRef } from 'react';
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



const WatchlistRow: React.FC<{
  stock: StockItem;
  onClick: () => void;
}> = ({ stock, onClick }) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPriceRef = useRef(stock.price);

  useEffect(() => {
    if (stock.price !== prevPriceRef.current) {
      const dir = stock.price > prevPriceRef.current ? 'up' : 'down';
      setFlash(dir);
      prevPriceRef.current = stock.price;

      const timer = setTimeout(() => {
        setFlash(null);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [stock.price]);

  return (
    <div
      className={`wl-stock-row ${flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''}`}
      onClick={onClick}
    >
      {/* left: name + exchange type */}
      <div className="wl-stock-left">
        <span className="wl-stock-name">{stock.name}</span>
        <span className="wl-stock-type">{stock.type}</span>
      </div>
      {/* right: change | pct | price — three columns matching screenshot */}
      <div className="wl-stock-right">
        <span className={`wl-change ${stock.up ? 'color-up' : 'color-down'}`}>
          {stock.change.toFixed(2)}
        </span>
        <span className={`wl-pct ${stock.up ? 'color-up' : 'color-down'}`}>
          {stock.pct.toFixed(2)}%
        </span>
        <span className={`wl-price ${stock.up ? 'color-up' : 'color-down'}`}>
          {stock.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

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
            <WatchlistRow key={stock.id} stock={stock} onClick={() => onStockClick?.(stock)} />
          ))
        )}
      </div>
    </>
  );
};
