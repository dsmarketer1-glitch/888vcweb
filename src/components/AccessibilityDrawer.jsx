import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';

const AccessibilityDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { motionEnabled, toggleMotion } = useAccessibility();

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        right: '30px', 
        zIndex: 9999,
        fontFamily: 'var(--font-family)'
      }}
    >
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '28px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          boxShadow: '0 8px 24px rgba(29, 47, 111, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          border: 'none',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Drawer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={motionEnabled ? { opacity: 0, x: 50, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={motionEnabled ? { opacity: 0, x: 20, scale: 0.9 } : { opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              bottom: '70px',
              right: 0,
              width: '280px',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 15px 45px rgba(29, 47, 111, 0.15)',
              border: '1px solid var(--border-muted)',
              overflow: 'hidden'
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                Accessibility
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', opacity: 0.7 }}>
                Customize your viewing experience
              </p>
            </div>

            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: 'var(--bg-soft)',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
              onClick={toggleMotion}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
                  Motion Effects
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {motionEnabled ? 'All animations enabled' : 'Reduced motion active'}
                </div>
              </div>
              
              {/* Custom Toggle Switch */}
              <div style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: motionEnabled ? 'var(--secondary)' : '#CBD5E1',
                position: 'relative',
                transition: 'background-color 0.3s'
              }}>
                <motion.div 
                  layout
                  transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '3px',
                    left: motionEnabled ? '23px' : '3px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-muted)', paddingTop: '16px' }}>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityDrawer;
