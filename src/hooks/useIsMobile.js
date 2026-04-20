import { useState, useEffect } from 'react';

/**
 * Hook to determine if the current viewport is mobile or tablet.
 * @param {number} width - The breakpoint width to check against (default: 1024).
 * @returns {boolean} - True if viewport width is less than the breakpoint.
 */
const useIsMobile = (width = 1024) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
    
    const handleUpdate = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Watch for changes
    mediaQuery.addEventListener('change', handleUpdate);
    return () => mediaQuery.removeEventListener('change', handleUpdate);
  }, [width]);

  return isMobile;
};

export default useIsMobile;
