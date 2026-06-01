import React, { useState } from 'react';
import { BookOpen, Users } from 'lucide-react';
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

interface LearningCenterViewProps {
  watchlist: StockItem[];
  onAddWatchlist?: () => void;
  onStockClick?: (stock: StockItem) => void;
}

export const LearningCenterView: React.FC<LearningCenterViewProps> = ({ watchlist, onAddWatchlist, onStockClick }) => {
  const [activeSubTab, setActiveSubTab] = useState<'Assets' | 'Community'>('Assets');

  return (
    <div className="learning-center-container">
      {/* LEFT SIDEBAR: WATCHLIST & INDICES */}
      <aside className="learning-sidebar-left">
        <WatchlistSidebar watchlist={watchlist} onAddWatchlist={onAddWatchlist} onStockClick={onStockClick} />
      </aside>

      {/* RIGHT MAIN PANEL */}
      <main className="learning-content-right">
        {/* Title Header */}
        <header className="learning-header">
          <h1 className="learning-title">Learning Center</h1>
          <p className="learning-subtitle">Upgrade your trading skills with professional courses and community insights.</p>
        </header>

        {/* Sub Navigation Tabs */}
        <div className="learning-tab-nav">
          <button 
            className={`learning-tab-btn ${activeSubTab === 'Assets' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('Assets')}
          >
            <BookOpen size={16} className="tab-icon-spacing" />
            <span>Assets</span>
          </button>
          <button 
            className={`learning-tab-btn ${activeSubTab === 'Community' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('Community')}
          >
            <Users size={16} className="tab-icon-spacing" />
            <span>Community</span>
          </button>
        </div>

        {activeSubTab === 'Assets' ? (
          <div className="learning-courses-grid">
            <div className="learning-course-card">
              <div className="course-image-placeholder">
                <svg viewBox="0 0 160 120" style={{ width: '80px', height: '60px' }}>
                  <rect width="160" height="120" rx="8" fill="var(--bg-card)" />
                  <rect x="68" y="70" width="24" height="40" rx="4" fill="var(--text-muted)" />
                  <line x1="80" y1="80" x2="80" y2="110" stroke="var(--border-color)" strokeWidth="1.5" />
                  <circle cx="80" cy="50" r="16" fill="none" stroke="var(--success)" strokeWidth="2.5" />
                  <line x1="91" y1="61" x2="105" y2="75" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 30,90 Q 60,60 90,40 T 130,20" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" />
                  <polyline points="120,20 130,20 130,30" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="45" cy="40" r="3" fill="var(--primary)" opacity="0.6" />
                  <circle cx="120" cy="70" r="4" fill="var(--orange)" opacity="0.6" />
                </svg>
              </div>

              <span className="course-badge">Adv Patterns</span>
              <h3 className="course-title">Advance Patterns: Harmonic Trading</h3>
              
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 8px 0', lineHeight: '1.4', flexGrow: 1 }}>
                Master the art of identifying harmonic patterns like the Gartley, Bat and Butterfly to predict market reversals with high precision.
              </p>

              <div className="course-progress-row">
                <span className="progress-lbl">75% Complete</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '75%', backgroundColor: 'var(--success)' }}></div>
                </div>
              </div>

              <button className="course-action-btn" onClick={() => alert('Resuming course: Harmonic Trading')}>
                Resume Course
              </button>
            </div>

            <div className="learning-course-card">
              <div className="course-image-placeholder orange">
                <svg viewBox="0 0 160 120" style={{ width: '80px', height: '60px' }}>
                  <rect width="160" height="120" rx="8" fill="var(--bg-card)" />
                  <line x1="30" y1="20" x2="30" y2="100" stroke="var(--text-main)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="30" y1="100" x2="140" y2="100" stroke="var(--text-main)" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="42" y="75" width="12" height="25" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="1" />
                  <rect x="62" y="60" width="12" height="40" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="1" />
                  <rect x="82" y="45" width="12" height="55" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="1" />
                  <path d="M 30,90 Q 70,75 110,40 T 135,25" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                  <polyline points="127,25 135,25 135,33" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <span className="course-badge">Basic Terminology</span>
              <h3 className="course-title">Technical Analysis Basics</h3>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 8px 0', lineHeight: '1.4', flexGrow: 1 }}>
                Learn basic chart terminology, drawing support/resistance levels, and using moving averages.
              </p>

              <div className="course-progress-row">
                <span className="progress-lbl">40% Complete</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '40%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              <button className="course-action-btn" onClick={() => alert('Resuming course: Technical Analysis Basics')}>
                Resume Course
              </button>
            </div>
          </div>
        ) : (
          <div className="community-stubs-wrapper" style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Upgrade to Premium to unlock interactive community forums and expert trading circles.</p>
          </div>
        )}
      </main>
    </div>
  );
};
