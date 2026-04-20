import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user's prefers-reduced-motion setting.
 * Returns true if the user prefers reduced motion.
 * WCAG 2.3.3 Animation from Interactions (AA)
 */
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (event) => setPrefersReducedMotion(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
