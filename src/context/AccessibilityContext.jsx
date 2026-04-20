import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  // Initialize from localStorage or prefers-reduced-motion media query
  const [motionEnabled, setMotionEnabled] = useState(() => {
    const saved = localStorage.getItem('motionEnabled');
    if (saved !== null) return JSON.parse(saved);
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('motionEnabled', JSON.stringify(motionEnabled));
    
    // Apply a global class to the body for CSS-based motion disabling if needed
    if (!motionEnabled) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [motionEnabled]);

  const toggleMotion = () => setMotionEnabled(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ motionEnabled, toggleMotion }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
