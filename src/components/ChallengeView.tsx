import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Search, 
  Users, 
  ChevronDown, 
  Trophy
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  tags: { text: string; type: 'stocks' | 'options' | 'paid' | 'free' }[];
  prizePool: string;
  entryFee: string;
  participants: string;
  timeText: string;
  timeType: 'clock' | 'calendar';
  isUrgent?: boolean;
  buttonText: string;
  buttonVariant: 'solid' | 'outline';
  gradientClass: string;
  sparklineColor: string;
}

export const ChallengeView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my' | 'past'>('all');
  const [marketFilter, setMarketFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('Paid');
  const [searchQuery, setSearchQuery] = useState('');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Weekly Bluechip Sprint',
      description: 'Focus on NIFTY 50 volume trends.',
      tags: [
        { text: 'STOCKS', type: 'stocks' },
        { text: 'PAID', type: 'paid' }
      ],
      prizePool: '₹ 50,000',
      entryFee: '₹ 500',
      participants: '1,240',
      timeText: 'Ends in 4h 20m',
      timeType: 'clock',
      isUrgent: true,
      buttonText: 'Join Challenge',
      buttonVariant: 'solid',
      gradientClass: 'chall-grad-purple',
      sparklineColor: 'rgba(168, 85, 247, 0.4)'
    },
    {
      id: '2',
      title: 'Theta Decay Master',
      description: 'Master the art of option selling.',
      tags: [
        { text: 'OPTIONS', type: 'options' },
        { text: 'FREE', type: 'free' }
      ],
      prizePool: 'Certificates',
      entryFee: 'Free',
      participants: '3,500',
      timeText: 'Starts in 2 Days',
      timeType: 'calendar',
      buttonText: 'View Details',
      buttonVariant: 'outline',
      gradientClass: 'chall-grad-green',
      sparklineColor: 'rgba(34, 197, 94, 0.4)'
    },
    {
      id: '3',
      title: 'Intraday Scalping Cup',
      description: 'High frequency trading only.',
      tags: [
        { text: 'STOCKS', type: 'stocks' },
        { text: 'PAID', type: 'paid' }
      ],
      prizePool: '₹ 1,000,000',
      entryFee: '₹ 1,500',
      participants: '850',
      timeText: 'Ends in 22h',
      timeType: 'clock',
      isUrgent: true,
      buttonText: 'Join Challenge',
      buttonVariant: 'solid',
      gradientClass: 'chall-grad-red',
      sparklineColor: 'rgba(239, 68, 68, 0.4)'
    },
    {
      id: '4',
      title: 'Altcoin Volatility Hunt',
      description: 'Trade top 10 altcoins with max ROI.',
      tags: [
        { text: 'OPTIONS', type: 'options' },
        { text: 'FREE', type: 'free' }
      ],
      prizePool: 'Token Airdrops',
      entryFee: 'Free',
      participants: '2,100',
      timeText: 'Starting Soon',
      timeType: 'calendar',
      buttonText: 'Notify Me',
      buttonVariant: 'outline',
      gradientClass: 'chall-grad-blue',
      sparklineColor: 'rgba(59, 130, 246, 0.4)'
    }
  ];

  const leaderboard = [
    { rank: '1st', name: 'Harsh Mehra', accuracy: '84.2%', return: '+46.2%', avatar: 'HM', color: '#f59e0b' },
    { rank: '2nd', name: 'Rohan Das', accuracy: '78.5%', return: '+39.1%', avatar: 'RD', color: '#94a3b8' },
    { rank: '3rd', name: 'Mayank Singh', accuracy: '76.1%', return: '+36.4%', avatar: 'MS', color: '#b45309' }
  ];

  return (
    <div className="chall-view-container view-transition">
      <div className="chall-layout">
        
        {/* LEFT COLUMN: Filter & Grid */}
        <div className="chall-main-col">
          
          {/* FILTER BAR CARD */}
          <div className="chall-filter-card">
            <div className="chall-tabs-left">
              <button 
                className={`chall-tab-btn ${activeSubTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('all')}
              >
                All Challenges
              </button>
              <button 
                className={`chall-tab-btn ${activeSubTab === 'my' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('my')}
              >
                My Challenges
              </button>
              <button 
                className={`chall-tab-btn ${activeSubTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('past')}
              >
                Past Results
              </button>
            </div>
            
            <div className="chall-filters-right">
              {/* Market Dropdown */}
              <div className="chall-dropdown-wrapper">
                <span className="chall-dropdown-label">Market: <strong>{marketFilter}</strong></span>
                <ChevronDown size={14} className="chall-dropdown-icon" />
                <select 
                  className="chall-hidden-select" 
                  value={marketFilter} 
                  onChange={(e) => setMarketFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Stocks">Stocks</option>
                  <option value="Options">Options</option>
                </select>
              </div>

              {/* Type Dropdown */}
              <div className="chall-dropdown-wrapper">
                <span className="chall-dropdown-label">Type: <strong>{typeFilter}</strong></span>
                <ChevronDown size={14} className="chall-dropdown-icon" />
                <select 
                  className="chall-hidden-select" 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
              </div>

              {/* Search Toggle */}
              <div className="chall-search-box">
                <Search size={16} className="chall-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="chall-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* CHALLENGES GRID */}
          <div className="chall-grid">
            {challenges.map((c) => (
              <div key={c.id} className="chall-card">
                
                {/* Header Visualization */}
                <div className={`chall-card-header ${c.gradientClass}`}>
                  {/* Grid Lines Overlay */}
                  <div className="chall-card-grid-overlay" />
                  
                  {/* Simulated Sparkline SVG Path */}
                  <svg className="chall-card-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path 
                      d={
                        c.id === '1' ? "M 0 30 Q 25 10, 50 25 T 100 15 L 100 40 L 0 40 Z" :
                        c.id === '2' ? "M 0 35 Q 35 15, 70 30 T 100 10 L 100 40 L 0 40 Z" :
                        c.id === '3' ? "M 0 30 L 10 32 L 20 20 L 30 25 L 40 10 L 50 15 L 60 5 L 70 12 L 80 8 L 90 22 L 100 3 L 100 40 L 0 40 Z" :
                        "M 0 35 C 20 30, 40 10, 60 25 C 80 40, 90 20, 100 15 L 100 40 L 0 40 Z"
                      }
                      fill={c.sparklineColor}
                    />
                    <path 
                      d={
                        c.id === '1' ? "M 0 30 Q 25 10, 50 25 T 100 15" :
                        c.id === '2' ? "M 0 35 Q 35 15, 70 30 T 100 10" :
                        c.id === '3' ? "M 0 30 L 10 32 L 20 20 L 30 25 L 40 10 L 50 15 L 60 5 L 70 12 L 80 8 L 90 22 L 100 3" :
                        "M 0 35 C 20 30, 40 10, 60 25 C 80 40, 90 20, 100 15"
                      }
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>

                  {/* Tags Overlay */}
                  <div className="chall-card-tags">
                    {c.tags.map((tag, i) => (
                      <span key={i} className={`chall-tag tag-${tag.type}`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div className="chall-card-body">
                  <h3 className="chall-card-title">{c.title}</h3>
                  <p className="chall-card-desc">{c.description}</p>
                  
                  <div className="chall-card-meta-grid">
                    <div className="chall-meta-item">
                      <span className="chall-meta-label">PRIZE POOL</span>
                      <span className={`chall-meta-value ${c.entryFee === 'Free' ? 'text-success' : ''}`}>
                        {c.prizePool}
                      </span>
                    </div>
                    <div className="chall-meta-item text-right">
                      <span className="chall-meta-label">ENTRY FEE</span>
                      <span className={`chall-meta-value ${c.entryFee === 'Free' ? 'text-success' : ''}`}>
                        {c.entryFee}
                      </span>
                    </div>
                  </div>

                  <div className="chall-card-footer">
                    <div className="chall-participants">
                      <Users size={14} className="chall-footer-icon" />
                      <span>{c.participants} Participants</span>
                    </div>
                    <div className={`chall-timer ${c.isUrgent ? 'text-danger-custom' : ''}`}>
                      {c.timeType === 'clock' ? (
                        <Clock size={14} className="chall-footer-icon" />
                      ) : (
                        <Calendar size={14} className="chall-footer-icon" />
                      )}
                      <span>{c.timeText}</span>
                    </div>
                  </div>

                  <button 
                    className={`chall-card-btn ${c.buttonVariant === 'solid' ? 'btn-solid' : 'btn-outline'}`}
                    onClick={() => alert(`Registration triggered for: ${c.title}`)}
                  >
                    {c.buttonText}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar widgets */}
        <div className="chall-side-col">
          
          {/* GLOBAL LEADERBOARD WIDGET */}
          <div className="chall-widget-card">
            <div className="chall-widget-header">
              <h3 className="chall-widget-title">
                <Trophy size={16} className="chall-widget-icon text-warning" />
                Global Leaderboard
              </h3>
              <a href="#leaderboard" className="chall-widget-link">Full List</a>
            </div>

            <div className="chall-leaderboard-list">
              {leaderboard.map((user, idx) => (
                <div key={idx} className="chall-leaderboard-row">
                  <div className="chall-rank" style={{ color: user.color }}>{user.rank}</div>
                  <div className="chall-user-info">
                    <div className="chall-user-avatar">{user.avatar}</div>
                    <div className="chall-user-details">
                      <div className="chall-user-name">{user.name}</div>
                      <div className="chall-user-accuracy">{user.accuracy} Accuracy</div>
                    </div>
                  </div>
                  <div className="chall-user-return">{user.return}</div>
                </div>
              ))}
            </div>

            <div className="chall-user-rank-box">
              <div className="chall-user-rank-header">
                <span className="chall-rank-label">Your Rank</span>
                <span className="chall-rank-value">6th <span className="chall-rank-total">/ 5,240</span></span>
              </div>
              <div className="chall-progress-track">
                <div className="chall-progress-bar" style={{ width: '32%' }} />
              </div>
              <div className="chall-progress-subtext">Maintain 32% growth to reach Top 5.</div>
            </div>
          </div>

          {/* HOW IT WORKS WIDGET */}
          <div className="chall-widget-card">
            <h3 className="chall-widget-title">How it works?</h3>
            <div className="chall-steps-list">
              <div className="chall-step-item">
                <div className="chall-step-num">1</div>
                <div className="chall-step-text">Select a challenge that matches your capital & risk profile.</div>
              </div>
              <div className="chall-step-item">
                <div className="chall-step-num">2</div>
                <div className="chall-step-text">Trade within the specified rules & risk parameters.</div>
              </div>
              <div className="chall-step-item">
                <div className="chall-step-num">3</div>
                <div className="chall-step-text">Win prizes, earn badges, and get ranked globally.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
