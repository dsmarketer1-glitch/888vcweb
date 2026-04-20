import React, { useState, useEffect, useCallback } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import useReducedMotion from '../hooks/useReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

export const Ticker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);

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
          paddingLeft: isMobile ? '20px' : '40px',
          color: 'white',
          fontSize: '12px',
          fontWeight: 500,
          display: 'flex',
          gap: isMobile ? '24px' : '40px'
        }}
      >
        {SITE_CONTENT.ticker.concat(SITE_CONTENT.ticker).map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </motion.div>

      <button
        className="marquee-pause-btn"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Play ticker' : 'Pause ticker'}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          opacity: 0.8
        }}
      >
        {isPaused ? '▶' : '❚❚'}
      </button>
    </div>
  );
};

export const Navbar = () => {
  const { links, cta, ctaHref } = SITE_CONTENT.nav;
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile(1024);

  const isActive = (link) => {
    if (location.pathname === link.href) return true;
    if (link.dropdownItems) {
      return link.dropdownItems.some(item => location.pathname === item.href);
    }
    return false;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      style={{
        backgroundColor: 'white',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '0 16px' : '0 40px',
        borderBottom: '1px solid var(--border-muted)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
      }}
    >
      <Link to="/" aria-label="888VC Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/assets/logo.svg" alt="888VC Logo" style={{ height: isMobile ? '36px' : '42px', width: 'auto' }} />
      </Link>

      {/* Desktop Links */}
      {!isMobile && (
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
                        }
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
      )}

      {!isMobile && (
        <Link to={ctaHref} style={{ textDecoration: 'none' }}>
          <button className="primary-btn" style={{ padding: '8px 20px', fontSize: '12px' }}>
            {cta}
          </button>
        </Link>
      )}

      {/* Hamburger Button */}
      {isMobile && (
        <button
          style={{ marginLeft: 'auto', fontSize: '24px', color: 'var(--primary)', padding: '8px' }}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
              padding: '24px',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflow: 'hidden'
            }}
          >
            {links.map((link, i) => (
              <div key={i}>
                <Link
                  to={link.href}
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: isActive(link) ? 'var(--secondary)' : 'var(--primary)',
                    display: 'block'
                  }}
                  onClick={() => !link.hasDropdown && setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div style={{ marginTop: '12px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {link.dropdownItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.href}
                        style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to={ctaHref} style={{ textDecoration: 'none', width: '100%' }} onClick={() => setIsMenuOpen(false)}>
              <button className="primary-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                {cta}
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
