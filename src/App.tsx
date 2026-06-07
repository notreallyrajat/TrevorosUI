import { useState, useEffect } from 'react'
import {
  Bell,
  Flame,
  User,
  Moon,
  Sun,
  X,
  Settings,
  LogOut,
  BarChart3,
  BookOpen,
  Bot,
  Layers,
} from 'lucide-react'

import { PortfolioView } from './components/PortfolioView'
import { DashboardView } from './components/DashboardView'
import { DisciplineReportView } from './components/DisciplineReportView'
import { LearningCenterView } from './components/LearningCenterView'
import type { NewPosition } from './components/StockChartDrawer'
import { StockChartDrawer } from './components/StockChartDrawer'
import { PositionsView } from './components/PositionsView'
import { AiView } from './components/AiView'
import { ChallengeView } from './components/ChallengeView'
import { AuthPage } from './components/AuthPage'

// Mock Initial Data
const initialWatchlist = [
  { id: '1', name: 'NIFTY 50', type: 'INDEX', price: 23659.00, change: 41.00, pct: 0.17, up: true },
  { id: '2', name: 'INFY', type: 'STOCK', price: 1193.70, change: -3.20, pct: -0.27, up: false },
  { id: '3', name: 'HDFC BANK', type: 'BSE', price: 759.50, change: -3.25, pct: -0.43, up: false },
  { id: '4', name: 'TCS', type: 'BSE', price: 2327.15, change: -0.40, pct: -0.02, up: false },
  { id: '5', name: 'ONGC', type: 'STOCK', price: 298.30, change: 1.80, pct: 0.61, up: true },
]

// Nav tabs config — Trade removed; chart opens from watchlist click
const NAV_TABS = [
  { id: 'Dashboard',  label: 'Dashboard',  hash: 'dashboard'  },
  { id: 'Positions',  label: 'Positions',  hash: 'positions'  },
  { id: 'Learn',      label: 'Academy',    hash: 'learn'      },
  { id: 'Challenge',  label: 'Challenge',  hash: 'challenge'  },
  { id: 'AI',         label: 'AI Copilot', hash: 'ai'         },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [portfolioSubTab, setPortfolioSubTab] = useState('Reports')
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [newStock, setNewStock] = useState({ name: '', symbol: '', price: '', change: '', pct: '' })

  // ── Auth state ──────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState({ name: 'Marshall D.', email: 'marshall@trevoros.com' })

  const handleAuthenticated = (name: string, email: string) => {
    setAuthUser({ name, email })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveTab('Dashboard')
    window.location.hash = '#dashboard'
  }

  const [portfolio] = useState({
    todayPL: 2154.55,
    todayPLPct: 3.24,
    topHolding: 'XYZ',
    totalInvestment: 20000000,
    totalProfit: 40000,
    totalLoss: 10000,
    netPL: 30000,
    overallReturns: 20210450
  })

  const [streak, setStreak] = useState(4)
  const [streakAnimating, setStreakAnimating] = useState(false)

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'TSLA hit your profit target of ₹245.30', time: '5m ago', read: false },
    { id: 2, text: 'You climbed to 6th place in Paid Stock challenge!', time: '15m ago', read: false },
    { id: 3, text: 'NIFTY 50 hit intraday high of 23,659.00', time: '1h ago', read: true },
  ])

  // Positions state — shared between TradeView and PositionsView
  const [positions, setPositions] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    avgPrice: number;
    currentPrice: number;
    qty: number;
    type: 'BUY' | 'SELL';
  }>>([
    { id: '1', symbol: 'HDFC BANK', name: 'HDFC Bank Ltd.', avgPrice: 762.75, currentPrice: 759.50, qty: 25, type: 'BUY' },
    { id: '2', symbol: 'INFY', name: 'Infosys Ltd.', avgPrice: 1196.90, currentPrice: 1193.70, qty: 10, type: 'BUY' },
    { id: '3', symbol: 'ONGC', name: 'Oil & Natural Gas Corp.', avgPrice: 296.50, currentPrice: 298.30, qty: 100, type: 'BUY' },
  ])

  // Stock chart drawer state — opened by clicking any watchlist row
  const [drawerStock, setDrawerStock] = useState<typeof initialWatchlist[0] | null>(null)

  // Handle order placed from TradeView
  const handleOrderPlaced = (newPos: NewPosition) => {
    const created = {
      id: Date.now().toString(),
      symbol: newPos.symbol,
      name: newPos.name,
      avgPrice: newPos.avgPrice,
      currentPrice: newPos.currentPrice,
      qty: newPos.qty,
      type: newPos.type,
    }
    setPositions((prev) => [...prev, created])
    const notif = {
      id: Date.now(),
      text: `${newPos.type} order: ${newPos.qty} × ${newPos.name} @ ₹${newPos.avgPrice.toFixed(2)} added to Positions.`,
      time: 'Just now',
      read: false,
    }
    setNotifications((prev) => [notif, ...prev])
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#notification-bell-btn') && !target.closest('#notifications-dropdown')) {
        setIsNotificationsOpen(false)
      }
      if (!target.closest('#profile-avatar-btn') && !target.closest('#profile-dropdown')) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '#dashboard').replace('#', '').toLowerCase()
      const found = NAV_TABS.find((t) => t.hash === hash)
      if (found) {
        setActiveTab(found.id)
      } else if (hash === 'profile' || hash === 'portfolio') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Reports')
      } else if (hash === 'settings') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Settings')
      } else if (hash === 'banks') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Banks')
      } else if (hash === 'analytics') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Analytics')
      } else if (hash === 'account') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Account')
      } else if (hash === 'support') {
        setActiveTab('Portfolio')
        setPortfolioSubTab('Support')
      } else if (hash === 'mentorship') {
        setActiveTab('Learn')
      } else {
        setActiveTab('Dashboard')
      }
    }
    window.addEventListener('hashchange', handleHash)
    handleHash()
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Live price simulation
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setWatchlist((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length)
        return prev.map((stock, idx) => {
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

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleStreakClick = () => {
    setStreakAnimating(true)
    setStreak((prev) => prev + 1)
    const newNotif = {
      id: Date.now(),
      text: `Streak increased to ${streak + 1} days! Keep trading to double your multipliers.`,
      time: 'Just now',
      read: false
    }
    setNotifications((prev) => [newNotif, ...prev])
    setTimeout(() => setStreakAnimating(false), 500)
  }

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStock.name || !newStock.symbol || !newStock.price) return
    const priceNum = parseFloat(newStock.price)
    const changeNum = parseFloat(newStock.change || '0')
    const pctNum = parseFloat(newStock.pct || '0')
    if (isNaN(priceNum) || isNaN(changeNum) || isNaN(pctNum)) {
      alert('Please enter valid numeric values for price and changes.')
      return
    }
    const created = {
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

  const clearNotifications = () => setNotifications([])

  // Desktop nav tabs (first 5 visible, rest in overflow or shown)
  const desktopTabs = NAV_TABS

  return (
    <div className="app-container">
      {/* ── AUTH GATE ── */}
      {!isAuthenticated && (
        <AuthPage onAuthenticated={handleAuthenticated} />
      )}

      {/* ── MAIN APP (only when authenticated) ── */}
      {isAuthenticated && (<>
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <a href="#" className="logo-container">
            <span className="logo-icon">
              <img src="/logo.png" alt="Trevoros Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span className="logo-text">Trevoros</span>
          </a>

          <nav className="app-nav" aria-label="Main Navigation">
            {desktopTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <a
                  key={tab.id}
                  href={`#${tab.hash}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => { window.location.hash = `#${tab.hash}` }}
                >
                  {tab.label}
                </a>
              )
            })}
          </nav>
        </div>

        <div className="header-right">
          {/* Streak */}
          <div
            id="streak-badge"
            className={`streak-badge ${streakAnimating ? 'shake-animation' : ''}`}
            onClick={handleStreakClick}
            title="Click to increase streak!"
          >
            <Flame size={16} fill="var(--orange)" />
            <span>{streak}</span>
          </div>

          {/* Theme toggle */}
          <button id="theme-toggle-btn" className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              id="notification-bell-btn"
              className="icon-btn"
              onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileMenuOpen(false) }}
              aria-label="Toggle notifications"
            >
              <Bell size={20} className={notifications.some(n => !n.read) ? 'shake-animation' : ''} />
              {notifications.some(n => !n.read) && <span className="notification-badge" />}
            </button>

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

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              id="profile-avatar-btn"
              className="avatar-btn"
              onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen); setIsNotificationsOpen(false) }}
              aria-label="Toggle profile menu"
            >
              {authUser.name.charAt(0).toUpperCase()}
            </button>

            {isProfileMenuOpen && (
              <div className="dropdown-menu" id="profile-dropdown">
                <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{authUser.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{authUser.email}</span>
                </div>
                <a href="#portfolio" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                  <User size={16} /><span>My Profile</span>
                </a>
                <a href="#settings" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                  <Settings size={16} /><span>Account Settings</span>
                </a>
                <div className="dropdown-item" onClick={() => { toggleTheme(); setIsProfileMenuOpen(false) }}>
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                <div className="dropdown-item" style={{ color: 'var(--danger)', cursor: 'pointer' }}
                  onClick={() => { setIsProfileMenuOpen(false); handleLogout() }}>
                  <LogOut size={16} /><span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* VIEWS */}
      {activeTab === 'Dashboard' && (
        <DashboardView
          watchlist={watchlist}
          onAddWatchlist={() => setIsAddWatchlistOpen(true)}
          onStockClick={(s) => setDrawerStock(s)}
          portfolioData={{
            todayPL: portfolio.todayPL,
            todayPLPct: portfolio.todayPLPct,
            topHolding: portfolio.topHolding,
            totalInvestment: portfolio.totalInvestment,
            overallReturns: portfolio.overallReturns,
          }}
          onNavigate={(tab) => { window.location.hash = `#${tab.toLowerCase()}` }}
        />
      )}
      {activeTab === 'Discipline' && (
        <DisciplineReportView watchlist={watchlist} onAddWatchlist={() => setIsAddWatchlistOpen(true)} onStockClick={(s) => setDrawerStock(s)} />
      )}
      {activeTab === 'Positions' && (
        <PositionsView positions={positions} onPositionsChange={setPositions} />
      )}
      {activeTab === 'Portfolio' && (
        <PortfolioView
          portfolioData={portfolio}
          activeSubTab={portfolioSubTab}
          setActiveSubTab={setPortfolioSubTab}
          onNavigate={(target) => {
            if (target === 'Reports') window.location.hash = '#portfolio'
            else if (target === 'Analytics') window.location.hash = '#analytics'
            else if (target === 'Settings') window.location.hash = '#settings'
            else if (target === 'Banks') window.location.hash = '#banks'
            else if (target === 'Account') window.location.hash = '#account'
            else if (target === 'Support') window.location.hash = '#support'
          }}
        />
      )}
      {activeTab === 'Learn' && (
        <LearningCenterView watchlist={watchlist} onAddWatchlist={() => setIsAddWatchlistOpen(true)} onStockClick={(s) => setDrawerStock(s)} />
      )}
      {activeTab === 'Challenge' && (
        <ChallengeView />
      )}
      {activeTab === 'AI' && <AiView />}

      {/* STOCK CHART DRAWER — opens when any watchlist row is clicked */}
      {drawerStock && (
        <StockChartDrawer
          stock={drawerStock}
          onClose={() => setDrawerStock(null)}
          onOrderPlaced={(pos) => {
            handleOrderPlaced(pos)
            setDrawerStock(null)
          }}
        />
      )}

      {/* MODAL - ADD STOCK */}
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
                  <input id="stock-name" type="text" className="form-input" placeholder="e.g. Reliance Industries"
                    value={newStock.name} onChange={(e) => setNewStock({ ...newStock, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="stock-symbol">Symbol / Type</label>
                  <input id="stock-symbol" type="text" className="form-input" placeholder="e.g. RELIANCE or NSE"
                    value={newStock.symbol} onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="stock-price">Current Price (₹)</label>
                  <input id="stock-price" type="number" step="0.01" className="form-input" placeholder="e.g. 2450.75"
                    value={newStock.price} onChange={(e) => setNewStock({ ...newStock, price: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock-change">Change Amt</label>
                    <input id="stock-change" type="number" step="0.01" className="form-input" placeholder="e.g. 15.40"
                      value={newStock.change} onChange={(e) => setNewStock({ ...newStock, change: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock-pct">Change %</label>
                    <input id="stock-pct" type="number" step="0.01" className="form-input" placeholder="e.g. 0.65"
                      value={newStock.pct} onChange={(e) => setNewStock({ ...newStock, pct: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddWatchlistOpen(false)}>Cancel</button>
                <button type="submit" id="submit-add-stock-btn" className="btn-primary">Add Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <a href="#dashboard" className={`mobile-nav-link ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => { window.location.hash = '#dashboard' }}>
          <BarChart3 size={20} /><span>Dashboard</span>
        </a>
        <a href="#positions" className={`mobile-nav-link ${activeTab === 'Positions' ? 'active' : ''}`} onClick={() => { window.location.hash = '#positions' }}>
          <Layers size={20} /><span>Positions</span>
        </a>
        <a href="#learn" className={`mobile-nav-link ${activeTab === 'Learn' ? 'active' : ''}`} onClick={() => { window.location.hash = '#learn' }}>
          <BookOpen size={20} /><span>Academy</span>
        </a>
        <a href="#ai" className={`mobile-nav-link ${activeTab === 'AI' ? 'active' : ''}`} onClick={() => { window.location.hash = '#ai' }}>
          <Bot size={20} /><span>AI</span>
        </a>
      </nav>
      </>)}
    </div>
  )
}

export default App