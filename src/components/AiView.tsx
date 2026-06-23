import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm Trevoros AI, your intelligent trading assistant. Ask me anything about stock valuations, portfolio risk, or current market trends.",
      time: '9:00 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPills = [
    "Analyze NIFTY 50 trend",
    "Should I buy TATA MOTORS?",
    "Evaluate portfolio risk",
    "Top stocks to watch today"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I've analyzed the market conditions. NIFTY 50 shows solid consolidation above the 23,500 support level, indicating a potential bullish breakout in the upcoming sessions.";
      
      const prompt = text.toLowerCase();
      if (prompt.includes('tata')) {
        aiText = "TATA MOTORS is currently trading at ₹1,176.20 with an upward momentum (+2.13%). The 50-day moving average acts as a strong support line. Recommend holding or accumulation on minor dips.";
      } else if (prompt.includes('risk') || prompt.includes('portfolio')) {
        aiText = "Based on your current portfolio (₹2,00,000 invested with 70% in high-cap wins like Tata Motors and 10% cash/losses), your portfolio beta is 1.15. This is slightly aggressive but well-diversified. Adding index hedges could reduce risk.";
      } else if (prompt.includes('watch') || prompt.includes('top')) {
        aiText = "Top stocks showing strong intraday volume breakout are ONGC (+0.61% breakout at ₹298.30) and TCS (consolidating near ₹2,327.15). Keep a close eye on resistance breakouts.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="ai-view-container view-transition">
      {/* LEFT SIDEBAR: SUGGESTIONS & CONTROLS */}
      <aside className="ai-sidebar">
        <div className="ai-sidebar-card">
          <div className="ai-title-row">
            <h3>AI Capabilities</h3>
          </div>
          <ul className="ai-capabilities-list">
            <li>Real-time Market Analysis</li>
            <li>Portfolio Risk Audits</li>
            <li>Smart Watchlist Breakouts</li>
            <li>Stock valuation models</li>
          </ul>
        </div>

        <div className="ai-sidebar-card helper">
          <div className="ai-title-row">
            <HelpCircle size={18} className="ai-icon-help" />
            <h3>Ask Trevoros</h3>
          </div>
          <p className="ai-helper-desc">
            Type natural language queries like "Is HDFC bank looking bearish?" or "Verify if my current holdings are safe."
          </p>
        </div>
      </aside>

      {/* RIGHT SIDE: CHAT INTERFACE */}
      <main className="ai-chat-main">
        <header className="ai-chat-header">
          <div className="ai-header-left">
            <div className="ai-bot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h4>Trevoros AI Copilot</h4>
              <span className="ai-status-online">Online</span>
            </div>
          </div>
        </header>

        <div className="ai-chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`chat-bubble-row ${m.sender === 'user' ? 'user-align' : 'ai-align'}`}>
              <div className="chat-avatar">
                {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="chat-bubble-content">
                <div className="chat-bubble-text">{m.text}</div>
                <div className="chat-bubble-time">{m.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row ai-align">
              <div className="chat-avatar">
                <Bot size={16} />
              </div>
              <div className="chat-bubble-content typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* SUGGESTIONS PILLS */}
        <div className="ai-suggestions-row">
          {suggestionPills.map((pill, idx) => (
            <button key={idx} className="suggestion-pill" onClick={() => handleSend(pill)}>
              {pill}
            </button>
          ))}
        </div>

        <footer className="ai-chat-input-row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="ai-chat-form"
          >
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask Trevoros AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-chat-send-btn" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
};
