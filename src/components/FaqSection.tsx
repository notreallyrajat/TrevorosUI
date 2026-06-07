import React, { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialFaqs: FaqItem[] = [
    {
      id: 1,
      question: "What is Trevoros?",
      answer: "Trevoros is an advanced behavioral analytics and proprietary trading evaluation platform. We help traders discover their behavioral blindspots, master emotional discipline, and earn access to significant scaling capital through our structured challenges."
    },
    {
      id: 2,
      question: "Who can join Trevoros?",
      answer: "Anyone with a passion for financial markets and structured growth! Whether you are a disciplined beginner looking to hone risk management or an experienced professional looking to scale your buying power, our global evaluations are open to all."
    },
    {
      id: 3,
      question: "How does the evaluation process work?",
      answer: "Our evaluation measures trade discipline alongside raw profitability. We monitor crucial trading metrics including maximum drawdowns, consistency index, and average hold times to ensure we fund traders who treat trading as a professional craft."
    },
    {
      id: 4,
      question: "Is real money used during evaluation?",
      answer: "No. The evaluation phases are conducted on state-of-the-art simulated accounts with live market data feeds. Once a trader successfully completes the program objectives, they are granted access to fund accounts containing real proprietary capital."
    }
  ];

  const extraFaqs: FaqItem[] = [
    {
      id: 5,
      question: "What trading platforms do you support?",
      answer: "We support popular industry-leading platforms including MetaTrader 4/5, cTrader, and DXTrade. All linked directly to our proprietary behavioral panel dashboard for real-time risk telemetry."
    },
    {
      id: 6,
      question: "What are the rules regarding drawdowns?",
      answer: "We utilize a daily relative drawdown limit of 5% and a maximum overall drawdown limit of 10%. Maintaining strict compliance with these risk thresholds is the primary metric of your evaluation."
    }
  ];

  const visibleFaqs = showAll ? [...initialFaqs, ...extraFaqs] : initialFaqs;

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-showcase-container">
      
      {/* Subtitle Badge & Header */}
      <div className="faq-header">
        <div className="faq-badge">
          <span className="faq-badge-dot"></span> FAQ
        </div>
        <h2 className="faq-title">Frequently Asked Questions</h2>
      </div>

      {/* Accordion List Wrapper */}
      <div className="faq-accordion-list">
        {visibleFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id} 
              className={`faq-item-wrapper ${isOpen ? 'active' : ''}`}
            >
              
              {/* Question Trigger Area */}
              <button 
                className="faq-question-trigger" 
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-chevron-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {/* GPU-Accelerated Height Expansion Panel */}
              <div className={`faq-answer-viewport ${isOpen ? 'open' : ''}`}>
                <div className="faq-answer-content">
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <button 
        className="faq-load-more-btn"
        onClick={() => {
          setShowAll(!showAll);
          setOpenId(null); // Reset open states on list reload
        }}
      >
        {showAll ? "Show Less" : "Load More"}
      </button>

    </div>
  );
};
