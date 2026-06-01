import { useState, useEffect } from 'react'
import {
  Bell,
  Flame,
  User,
  Moon,
  Sun,
  X,
  Settings,
  LogOut
} from 'lucide-react'

import { PortfolioView } from './components/PortfolioView'
import { DisciplineReportView } from './components/DisciplineReportView'
import { LearningCenterView } from './components/LearningCenterView'
import { TradeView } from './components/TradeView'

// Mock Initial Data matching reference image
const initialWatchlist = [
  { id: '1', name: 'NIFTY 50', type: 'INDEX', price: 23659.00, change: 41.00, pct: 0.17, up: true },
  { id: '2', name: 'INFY', type: 'STOCK', price: 1193.70, change: -3.20, pct: -0.27, up: false },
  { id: '3', name: 'HDFC BANK', type: 'BSE', price: 759.50, change: -3.25, pct: -0.43, up: false },
  { id: '4', name: 'TCS', type: 'BSE', price: 2327.15, change: -0.40, pct: -0.02, up: false },
  { id: '5', name: 'ONGC', type: 'STOCK', price: 298.30, change: 1.80, pct: 0.61, up: true },
]

function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Watchlist state
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('Dashboard')

  // Modals & Menu Toggles
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  // Input states for forms
  const [newStock, setNewStock] = useState({ name: '', symbol: '', price: '', change: '', pct: '' })

  // Live portfolio states
  const [portfolio, setPortfolio] = useState({
    todayPL: 2154.55,
    todayPLPct: 3.24,
    topHolding: 'XYZ',
    totalInvestment: 200000,
    totalProfit: 40000,
    totalLoss: 10000,
    netPL: 30000,
    overallReturns: 230000
  })

  // User streak
  const [streak, setStreak] = useState(4)
  const [streakAnimating, setStreakAnimating] = useState(false)

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'TSLA hit your profit target of ₹245.30', time: '5m ago', read: false },
    { id: 2, text: 'You climbed to 6th place in Paid Stock challenge!', time: '15m ago', read: false },
    { id: 3, text: 'NIFTY 50 hit intraday high of 23,659.00', time: '1h ago', read: true },
  ])



  // Synchronize location hash with activeTab routing state
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#dashboard'
      const page = hash.replace('#', '').toLowerCase()
      if (page === 'portfolio' || page === 'profile') {
        setActiveTab('Portfolio')
      } else if (page === 'trade') {
        setActiveTab('Trade')
      } else if (page === 'learn') {
        setActiveTab('Learn')
      } else {
        setActiveTab('Dashboard')
      }
    }
    window.addEventListener('hashchange', handleHash)
    handleHash() // run once initially
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Simulate small real-time fluctuations in watchlist stock prices
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setWatchlist((prevWatchlist) => {
        // Pick one random stock to update
        const randomIndex = Math.floor(Math.random() * prevWatchlist.length)
        return prevWatchlist.map((stock, idx) => {
          if (idx === randomIndex) {
            const isUp = Math.random() > 0.45
            const percentChange = (Math.random() * 0.15) * (isUp ? 1 : -1)
            const oldPrice = stock.price
            const newPrice = Number((oldPrice * (1 + percentChange / 100)).toFixed(2))
            const delta = Number((newPrice - oldPrice).toFixed(2))

            return {
              ...stock,
              price: newPrice,
              change: Number((stock.change + delta).toFixed(2)),
              pct: Number((stock.pct + percentChange).toFixed(2)),
              up: stock.pct + percentChange >= 0
            }
          }
          return stock
        })
      })
    }, 3500)

    return () => clearInterval(priceInterval)
  }, [])

  // Format countdown time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs.toString().padStart(2, '0')}s`
  }

  // Toggle application theme (Light/Dark)
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  // Streak click handler
  const handleStreakClick = () => {
    setStreakAnimating(true)
    setStreak((prev) => prev + 1)
    // Add a notification too
    const newNotif = {
      id: Date.now(),
      text: `Streak increased to ${streak + 1} days! Keep trading to double your multipliers.`,
      time: 'Just now',
      read: false
    }
    setNotifications((prev) => [newNotif, ...prev])
    setTimeout(() => setStreakAnimating(false), 500)
  }

  // Add stock to watchlist
  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStock.name || !newStock.symbol || !newStock.price) return

    const priceNum = parseFloat(newStock.price)
    const changeNum = parseFloat(newStock.change || '0')
    const pctNum = parseFloat(newStock.pct || '0')

    const created: typeof initialWatchlist[0] = {
      id: Date.now().toString(),
      name: newStock.name,
      type: newStock.symbol.toUpperCase(),
      price: priceNum,
      change: changeNum,
      pct: pctNum,
      up: pctNum >= 0
    }

    setWatchlist((prev) => [...prev, created])
    setNewStock({ name: '', symbol: '', price: '', change: '', pct: '' })
    setIsAddWatchlistOpen(false)
  }



  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="header-left">
          <a href="#" className="logo-container">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <span>Trevoros</span>
          </a>

          <nav className="app-nav" aria-label="Main Navigation">
            {['Dashboard', 'Trade', 'Portfolio', 'Learn'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <a
                  key={tab}
                  href={`#${tab.toLowerCase()}`}
                  id={`nav-${tab.toLowerCase()}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    window.location.hash = `#${tab.toLowerCase()}`;
                  }}
                >
                  {tab}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="header-right">
          {/* Active daily streak widget */}
          <div
            id="streak-badge"
            className={`streak-badge ${streakAnimating ? 'shake-animation' : ''}`}
            onClick={handleStreakClick}
            title="Click to increase streak!"
          >
            <Flame size={16} fill="var(--orange)" />
            <span>{streak}</span>
          </div>

          {/* Theme switcher */}
          <button
            id="theme-toggle-btn"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle light and dark modes"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Alert Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              id="notification-bell-btn"
              className="icon-btn"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsProfileMenuOpen(false)
              }}
              aria-label="Toggle notifications menu"
            >
              <Bell size={20} className={notifications.some(n => !n.read) ? 'shake-animation' : ''} />
              {notifications.some(n => !n.read) && <span className="notification-badge" />}
            </button>

            {/* Notification dropdown */}
            {isNotificationsOpen && (
              <div className="dropdown-menu" id="notifications-dropdown">
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>Notifications</span>
                  {notifications.length > 0 && (
                    <button onClick={clearNotifications} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Clear All
                    </button>
                  )}
                </div>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '2px', opacity: n.read ? 0.6 : 1 }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: n.read ? 500 : 600 }}>{n.text}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div style={{ position: 'relative' }}>
            <button
              id="profile-avatar-btn"
              className="avatar-btn"
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen)
                setIsNotificationsOpen(false)
              }}
              aria-label="Toggle profile menu"
            >
              M
            </button>

            {/* Profile settings dropdown */}
            {isProfileMenuOpen && (
              <div className="dropdown-menu" id="profile-dropdown">
                <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>Marshall D.</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>marshall@trevoros.com</span>
                </div>
                <a href="#profile" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                  <User size={16} />
                  <span>My Profile</span>
                </a>
                <a href="#settings" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                  <Settings size={16} />
                  <span>Account Settings</span>
                </a>
                <div className="dropdown-item" onClick={() => { toggleTheme(); setIsProfileMenuOpen(false); }}>
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                <a href="#logout" className="dropdown-item" style={{ color: 'var(--danger)' }} onClick={() => setIsProfileMenuOpen(false)}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {activeTab === 'Dashboard' && (
        <DisciplineReportView />
      )}

      {activeTab === 'Learn' && (
        <LearningCenterView />
      )}

      {activeTab === 'Portfolio' && (
        <PortfolioView 
          portfolioData={portfolio}
          onNavigate={(target) => {
            if (target === 'Reports') {
              window.location.hash = '#dashboard';
            } else if (target === 'Learn') {
              window.location.hash = '#learn';
            }
          }}
        />
      )}

      {activeTab === 'Trade' && (
        <TradeView />
      )}

      {/* MODAL - ADD STOCK TO WATCHLIST */}
      {isAddWatchlistOpen && (
        <div className="modal-overlay" onClick={() => setIsAddWatchlistOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} id="add-stock-modal">
            <div className="modal-header">
              <h2 className="modal-title">Add to Watchlist</h2>
              <button className="modal-close-btn" onClick={() => setIsAddWatchlistOpen(false)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddStock}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="stock-name">Stock Name</label>
                  <input
                    id="stock-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Reliance Industries"
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="stock-symbol">Symbol / Type</label>
                  <input
                    id="stock-symbol"
                    type="text"
                    className="form-input"
                    placeholder="e.g. RELIANCE or NSE"
                    value={newStock.symbol}
                    onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="stock-price">Current Price (₹)</label>
                  <input
                    id="stock-price"
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="e.g. 2450.75"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock-change">Change Amt</label>
                    <input
                      id="stock-change"
                      type="number"
                      step="0.01"
                      className="form-input"
                      placeholder="e.g. 15.40"
                      value={newStock.change}
                      onChange={(e) => setNewStock({ ...newStock, change: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="stock-pct">Change %</label>
                    <input
                      id="stock-pct"
                      type="number"
                      step="0.01"
                      className="form-input"
                      placeholder="e.g. 0.65"
                      value={newStock.pct}
                      onChange={(e) => setNewStock({ ...newStock, pct: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddWatchlistOpen(false)}>
                  Cancel
                </button>
                <button type="submit" id="submit-add-stock-btn" className="btn-primary">
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  )
}

export default App
