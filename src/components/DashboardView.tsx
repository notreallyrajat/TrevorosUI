import React from 'react';
import { ChevronDown, Zap } from 'lucide-react';
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

interface PortfolioData {
  todayPL: number;
  todayPLPct: number;
  topHolding: string;
  totalInvestment: number;
  overallReturns: number;
}

interface DashboardViewProps {
  watchlist: StockItem[];
  onAddWatchlist?: () => void;
  onStockClick?: (stock: StockItem) => void;
  portfolioData: PortfolioData;
  onNavigate?: (tab: string) => void;
}

// ── Static movers data (matches screenshot exactly) ───────────
const topGainers = [
  { symbol: 'TSLA',       price: 245.30, change: 5.23,  logoBg: '#1e293b',              logoColor: '#ffffff', logoText: 'T'  },
  { symbol: 'Volatility', price: 460.18, change: 3.12,  logoBg: 'rgba(249,115,22,0.15)', logoColor: '#f97316', logoText: 'vx' },
  { symbol: 'Volatility', price: 460.18, change: 3.12,  logoBg: 'rgba(59,130,246,0.15)', logoColor: '#2563eb', logoText: 'vx' },
];

const topLosers = [
  { symbol: 'TSLA',       price: 245.30, change: -5.23, logoBg: '#1e293b',              logoColor: '#ffffff', logoText: 'T'  },
  { symbol: 'Volatility', price: 460.18, change: -3.12, logoBg: '#e2e8f0',              logoColor: '#64748b', logoText: 'vx' },
  { symbol: 'Volatility', price: 460.18, change: -3.12, logoBg: '#e2e8f0',              logoColor: '#64748b', logoText: 'vx' },
];

// ── Leaderboard data ──────────────────────────────────────────
const freeBoard = [
  { rank: 1, name: 'Harsh',  value: '46%' },
  { rank: 2, name: 'Rohan',  value: '39%' },
  { rank: 3, name: 'Mayank', value: '36%' },
  { rank: 6, name: 'You',    value: '32%', isUser: true },
];

const paidBoard = [
  { rank: 1, name: 'Harsh',  value: '46%' },
  { rank: 2, name: 'Rohan',  value: '39%' },
  { rank: 3, name: 'Mayank', value: '36%' },
  { rank: 6, name: 'you',    value: '32%', isUser: true },
];

const ordinal = (n: number) => {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return `${n}th`;
};

// rank colour: free = blue shades, paid = orange shades
const rankStyle = (rank: number, variant: 'free' | 'paid'): React.CSSProperties => {
  const colors = variant === 'free'
    ? ['#2563eb', 'rgba(37,99,235,0.65)', 'rgba(37,99,235,0.45)', '#94a3b8']
    : ['#f97316', 'rgba(249,115,22,0.65)', 'rgba(249,115,22,0.45)', '#94a3b8'];
  const idx = rank <= 3 ? rank - 1 : 3;
  return { color: colors[idx], fontWeight: 800, fontSize: '13px' };
};

// ── Leaderboard card (one per variant, always visible) ────────
const LeaderboardCard: React.FC<{ variant: 'free' | 'paid'; rows: typeof freeBoard }> = ({ variant, rows }) => (
  <div className="db-lb-card">
    {/* top row: pill + filter pill + timer */}
    <div className="db-lb-top-row">
      <div className="db-lb-top-left">
        <span className={`db-lb-pill ${variant}`}>
          {variant === 'free' ? 'Free' : 'Paid'}
        </span>
        <div className="db-lb-filter">
          <span>Stock</span>
          <ChevronDown size={12} />
        </div>
      </div>
      <span className="db-lb-timer">Ends in 32 mins</span>
    </div>

    {/* column headers */}
    <div className="db-lb-col-hdr">
      <span />
      <span>Name</span>
      <span>Value</span>
    </div>

    {/* data rows */}
    {rows.map((row, i) => (
      <div key={i} className="db-lb-row">
        <span style={rankStyle(row.rank, variant)}>{ordinal(row.rank)}</span>
        <span className="db-lb-name">{row.name}</span>
        <span className="db-lb-value">{row.value}</span>
      </div>
    ))}
  </div>
);

// ── Main ──────────────────────────────────────────────────────
export const DashboardView: React.FC<DashboardViewProps> = ({
  watchlist,
  onAddWatchlist,
  onStockClick,
  portfolioData,
  onNavigate,
}) => (
  <div className="db-shell view-transition">

    {/* LEFT SIDEBAR */}
    <aside className="db-sidebar">
      <WatchlistSidebar watchlist={watchlist} onAddWatchlist={onAddWatchlist} onStockClick={onStockClick} />
    </aside>

    {/* CENTER */}
    <main className="db-center">

      {/* Quick Portfolio */}
      <div className="db-card">
        <h2 className="db-card-heading">Quick Portfolio</h2>
        <div className="db-qp-grid">
          <div className="db-qp-cell db-qp-br db-qp-bb">
            <span className="db-qp-lbl">Today's P&L</span>
            <span className="db-qp-val color-up">
              ₹ {portfolioData.todayPL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              {' '}({portfolioData.todayPLPct.toFixed(2)}%)
            </span>
          </div>
          <div className="db-qp-cell db-qp-bb">
            <span className="db-qp-lbl">Top holding</span>
            <span className="db-qp-val">{portfolioData.topHolding}</span>
          </div>
          <div className="db-qp-cell db-qp-br">
            <span className="db-qp-lbl">Total investment</span>
            <span className="db-qp-val">₹ {portfolioData.totalInvestment.toLocaleString('en-IN')}</span>
          </div>
          <div className="db-qp-cell">
            <span className="db-qp-lbl">Overall returns</span>
            <span className="db-qp-val">₹ {portfolioData.overallReturns.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="db-card">
        <div className="db-movers-hdr">
          <h2 className="db-card-heading" style={{ marginBottom: 0 }}>Top Gainers</h2>
          <button className="db-view-all" onClick={() => onNavigate?.('Trade')}>View All</button>
        </div>
        <div className="db-movers-col-hdr">
          <span>SYMBOL</span><span>PRICE</span><span>CHANGE</span>
        </div>
        {topGainers.map((s, i) => (
          <div key={i} className="db-movers-row">
            <div className="db-movers-asset">
              <span className="db-movers-logo" style={{ background: s.logoBg, color: s.logoColor }}>
                {s.logoText}
              </span>
              <span className="db-movers-sym">{s.symbol}</span>
            </div>
            <span className="db-movers-price">₹ {s.price.toFixed(2)}</span>
            <span className="db-movers-chg color-up">+ {s.change.toFixed(2)} %</span>
          </div>
        ))}
      </div>

      {/* Top Losers */}
      <div className="db-card">
        <div className="db-movers-hdr">
          <h2 className="db-card-heading" style={{ marginBottom: 0 }}>Top Losers</h2>
          <button className="db-view-all" onClick={() => onNavigate?.('Trade')}>View All</button>
        </div>
        <div className="db-movers-col-hdr">
          <span>SYMBOL</span><span>PRICE</span><span>CHANGE</span>
        </div>
        {topLosers.map((s, i) => (
          <div key={i} className="db-movers-row">
            <div className="db-movers-asset">
              <span className="db-movers-logo" style={{ background: s.logoBg, color: s.logoColor }}>
                {s.logoText}
              </span>
              <span className="db-movers-sym">{s.symbol}</span>
            </div>
            <span className="db-movers-price">₹ {s.price.toFixed(2)}</span>
            <span className="db-movers-chg color-down">- {Math.abs(s.change).toFixed(2)} %</span>
          </div>
        ))}
      </div>

    </main>

    {/* RIGHT PANEL */}
    <aside className="db-right">
      <h2 className="db-card-heading">Leaderboard</h2>
      <LeaderboardCard variant="free" rows={freeBoard} />
      <LeaderboardCard variant="paid" rows={paidBoard} />
      <button className="db-join-btn" onClick={() => alert('Redirecting to Challenges...')}>
        <Zap size={17} fill="currentColor" />
        Join Challenges
      </button>
    </aside>

  </div>
);
