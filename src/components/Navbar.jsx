import React, { useState } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import useReducedMotion from '../hooks/useReducedMotion';

export const Ticker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="ticker-wrapper"
      role="marquee"
      aria-label="Latest updates"
      aria-live="off"
      style={{
        backgroundColor: 'var(--primary)',
        height: '38px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 100
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <motion.div
        className="ticker-content"
        animate={(isPaused || prefersReducedMotion) ? {} : { x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          whiteSpace: 'nowrap',
          paddingLeft: '40px',
          color: 'white',
          fontSize: '12px',
          fontWeight: 500,
          display: 'flex',
          gap: '40px'
        }}
      >
        {SITE_CONTENT.ticker.concat(SITE_CONTENT.ticker).map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </motion.div>

      {/* WCAG 2.2.2 Pause, Stop, Hide — pause button for ticker */}
      <button
        className="marquee-pause-btn"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Play ticker' : 'Pause ticker'}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10
        }}
      >
        {isPaused ? '▶' : '❚❚'}
      </button>
    </div>
  );
};

export const Navbar = () => {
  const { logo, links, cta } = SITE_CONTENT.nav;
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isActive = (link) => {
    if (location.pathname === link.href) return true;
    if (link.dropdownItems) {
      return link.dropdownItems.some(item => location.pathname === item.href);
    }
    return false;
  };

  return (
    <nav
      aria-label="Main navigation"
      style={{
        backgroundColor: 'white',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        borderBottom: '1px solid var(--border-muted)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <Link to="/" aria-label="888VC Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/assets/logo.svg" alt="888VC Logo" style={{ height: '42px', width: 'auto' }} />
      </Link>

      <div style={{
        display: 'flex',
        gap: '32px',
        marginLeft: 'auto',
        marginRight: '32px'
      }}>
        {links.map((link, i) => {
          const active = isActive(link);
          return (
            <div 
              key={i} 
              style={{ position: 'relative' }}
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(i)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={`nav-link ${active ? 'text-orange font-bold' : 'text-navy'}`}
                style={{
                  fontSize: '15px',
                  fontWeight: active ? 700 : 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  height: '70px'
                }}
                aria-current={active ? 'page' : undefined}
                aria-expanded={link.hasDropdown ? activeDropdown === i : undefined}
                aria-haspopup={link.hasDropdown ? 'true' : undefined}
              >
                {link.label}
                {link.hasDropdown && <span style={{ fontSize: '10px' }}>▼</span>}
              </Link>

              {link.hasDropdown && activeDropdown === i && (
                <div style={{
                  position: 'absolute',
                  top: '70px',
                  left: '0',
                  backgroundColor: 'white',
                  boxShadow: '0 10px 25px rgba(29, 47, 111, 0.1)',
                  borderRadius: '8px',
                  padding: '12px 0',
                  minWidth: '220px',
                  zIndex: 1001,
                  border: '1px solid var(--border-muted)'
                }}>
                  {link.dropdownItems.map((item, idx) => {
                    const isExternal = item.href.startsWith('http');
                    const linkProps = {
                      key: idx,
                      style: {
                        display: 'block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: location.pathname === item.href ? 'var(--secondary)' : 'var(--primary)',
                        fontSize: '14px',
                        fontWeight: location.pathname === item.href ? 700 : 500,
                        transition: 'background 0.2s'
                      },
                      onMouseEnter: (e) => e.target.style.backgroundColor = '#f8f9fe',
                      onMouseLeave: (e) => e.target.style.backgroundColor = 'transparent'
                    };

                    return isExternal ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" {...linkProps}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} {...linkProps}>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="primary-btn" style={{ padding: '8px 20px', fontSize: '12px' }}>
        {cta}
      </button>
    </nav>
  );
};

