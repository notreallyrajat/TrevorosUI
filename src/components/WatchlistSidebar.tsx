import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, X } from 'lucide-react';

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
  onAddStockDirect?: (stock: Omit<StockItem, 'id'>) => void;
}

const MOCK_NSE_BSE_STOCKS = [
  { name: 'Reliance Industries', type: 'NSE', price: 2910.45, change: 12.30, pct: 0.42, up: true },
  { name: 'Reliance Industries', type: 'BSE', price: 2909.80, change: 11.50, pct: 0.39, up: true },
  { name: 'Tata Motors', type: 'NSE', price: 955.20, change: 24.50, pct: 2.13, up: true },
  { name: 'Tata Motors', type: 'BSE', price: 954.90, change: 24.10, pct: 2.10, up: true },
  { name: 'Infosys', type: 'NSE', price: 1530.80, change: 11.20, pct: 0.74, up: true },
  { name: 'Infosys', type: 'BSE', price: 1530.10, change: 10.50, pct: 0.69, up: true },
  { name: 'HDFC Bank', type: 'NSE', price: 1675.20, change: 4.80, pct: 0.29, up: true },
  { name: 'HDFC Bank', type: 'BSE', price: 1674.50, change: 4.10, pct: 0.25, up: true },
  { name: 'State Bank of India', type: 'NSE', price: 835.40, change: -12.35, pct: -1.46, up: false },
  { name: 'State Bank of India', type: 'BSE', price: 834.90, change: -12.80, pct: -1.51, up: false },
  { name: 'TCS', type: 'NSE', price: 3820.15, change: -24.50, pct: -0.64, up: false },
  { name: 'TCS', type: 'BSE', price: 3819.00, change: -25.20, pct: -0.66, up: false },
  { name: 'ITC', type: 'NSE', price: 425.30, change: 3.15, pct: 0.75, up: true },
  { name: 'ITC', type: 'BSE', price: 425.10, change: 2.95, pct: 0.70, up: true },
  { name: 'Larsen & Toubro', type: 'NSE', price: 3540.00, change: -45.60, pct: -1.27, up: false },
  { name: 'Larsen & Toubro', type: 'BSE', price: 3538.50, change: -47.10, pct: -1.31, up: false },
  { name: 'ICICI Bank', type: 'NSE', price: 1120.50, change: -8.15, pct: -0.72, up: false },
  { name: 'ICICI Bank', type: 'BSE', price: 1119.80, change: -8.50, pct: -0.75, up: false },
  { name: 'Bharti Airtel', type: 'NSE', price: 1375.00, change: 18.40, pct: 1.36, up: true },
  { name: 'Bharti Airtel', type: 'BSE', price: 1374.20, change: 17.50, pct: 1.29, up: true },
  { name: 'Wipro', type: 'NSE', price: 485.60, change: -1.25, pct: -0.26, up: false },
  { name: 'Wipro', type: 'BSE', price: 485.10, change: -1.75, pct: -0.36, up: false },
  { name: 'Adani Ports', type: 'NSE', price: 1450.25, change: 32.10, pct: 2.26, up: true },
  { name: 'Adani Ports', type: 'BSE', price: 1449.80, change: 31.50, pct: 2.22, up: true }
];

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

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({ 
  watchlist, 
  onAddWatchlist, 
  onStockClick,
  onAddStockDirect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchResults = searchQuery.trim() !== ''
    ? MOCK_NSE_BSE_STOCKS.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleAddDirect = (stock: typeof MOCK_NSE_BSE_STOCKS[0]) => {
    if (onAddStockDirect) {
      onAddStockDirect({
        name: stock.name,
        type: stock.type,
        price: stock.price,
        change: stock.change,
        pct: stock.pct,
        up: stock.up
      });
    } else {
      alert(`UI Action: Add ${stock.name} (${stock.type}) directly.`);
    }
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <>
      {/* ── Search ── */}
      <div className="wl-search-box" ref={containerRef}>
        <div className="wl-search-inner">
          <Search size={14} className="wl-search-icon" />
          <input
            type="text"
            className="wl-search-input"
            placeholder="Search & Add (e.g. TATA, Reliance)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(e.target.value.trim().length > 0);
            }}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setShowDropdown(true);
              }
            }}
            aria-label="Search watchlist"
          />
          {searchQuery ? (
            <button 
              className="wl-clear-btn" 
              onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', padding: '4px' }}
            >
              <X size={14} />
            </button>
          ) : (
            <span className="wl-shortcut">Ctrl+K</span>
          )}
        </div>

        {/* Floating Search Dropdown for NSE/BSE */}
        {showDropdown && searchResults.length > 0 && (
          <div className="wl-search-dropdown">
            <div className="dropdown-section-title">NSE & BSE MARKET INSTRUMENTS</div>
            <div className="dropdown-scroll-list">
              {searchResults.map((stock, idx) => {
                const isAlreadyAdded = watchlist.some(
                  (item) => item.name === stock.name && item.type.toUpperCase() === stock.type.toUpperCase()
                );
                return (
                  <div key={idx} className="dropdown-result-row">
                    <div className="result-left">
                      <span className="result-name">{stock.name}</span>
                      <span className={`result-exchange-badge ${stock.type.toLowerCase()}`}>
                        {stock.type}
                      </span>
                    </div>
                    <div className="result-right">
                      <div className="result-pricing">
                        <span className="result-price">₹{stock.price.toFixed(2)}</span>
                        <span className={`result-change ${stock.up ? 'color-up' : 'color-down'}`}>
                          {stock.up ? '+' : ''}{stock.pct.toFixed(2)}%
                        </span>
                      </div>
                      <button
                        className={`wl-add-to-watchlist-btn ${isAlreadyAdded ? 'added' : ''}`}
                        disabled={isAlreadyAdded}
                        onClick={() => handleAddDirect(stock)}
                      >
                        {isAlreadyAdded ? 'Added' : <><Plus size={11} style={{ marginRight: '2px' }} /> Add</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {showDropdown && searchResults.length === 0 && (
          <div className="wl-search-dropdown empty">
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              No NSE/BSE instruments match "{searchQuery}"
            </span>
          </div>
        )}
      </div>

      {/* ── Watchlist header ── */}
      <div className="wl-section-header">
        <span className="wl-section-label">Watchlist</span>
        <button className="wl-add-btn" onClick={onAddWatchlist}>+ Add new</button>
      </div>

      {/* ── Group label ── */}
      <div className="wl-group-label">
        <span className="wl-group-name">Default ({filteredWatchlist.length})</span>
      </div>

      {/* ── Stock rows ── */}
      <div className="wl-stock-list">
        {filteredWatchlist.length === 0 ? (
          <div className="wl-empty">No items found</div>
        ) : (
          filteredWatchlist.map((stock) => (
            <WatchlistRow key={stock.id} stock={stock} onClick={() => onStockClick?.(stock)} />
          ))
        )}
      </div>
    </>
  );
};
