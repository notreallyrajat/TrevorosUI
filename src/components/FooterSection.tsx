import React from 'react';

export const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: 'Home', href: '#home' },
    { label: 'What we do', href: '#what-we-do' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Who this is for', href: '#who-this-is-for' },
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <footer className="footer-showcase-container">
      <div className="footer-showcase-card">
        
        {/* Column 1: Brand Anchor Block (Spans wider for asymmetric balance) */}
        <div className="footer-col-brand-panel">
          <h3 className="footer-brand-title">
            Trevoros<span className="footer-brand-dot">.</span>
          </h3>
          <p className="footer-brand-tagline">
            Evaluating traders through data, behaviour, and performance.
            <span className="footer-tagline-highlight"> Discipline is the edge.</span>
          </p>

          {/* Social Icons Aligned Left Directly Under Brand Description */}
          <div className="footer-social-row">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              aria-label="Twitter X"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              aria-label="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Platform Links */}
        <div className="footer-col-links-panel">
          <span className="footer-col-header">Platform</span>
          <ul className="footer-links-list">
            {platformLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="footer-link-item">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Legal Operations */}
        <div className="footer-col-contact-panel">
          <span className="footer-col-header">Contact</span>
          <a href="mailto:hello@trevoros.com" className="footer-email-link">
            hello@trevoros.com
          </a>
          <p className="footer-support-text">
            Our dedicated trading desk is available to assist active program members 24/7.
          </p>
        </div>

      </div>

      {/* Copyright Footer Sub-bar */}
      <div className="footer-copyright-subbar">
        <p className="copyright-text">
          &copy; {currentYear} Trevoros. All rights reserved. Built for disciplined proprietary traders.
        </p>
      </div>
    </footer>
  );
};
