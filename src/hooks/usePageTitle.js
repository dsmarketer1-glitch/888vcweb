import { useEffect } from 'react';

/**
 * Custom hook to set the document title per page.
 * WCAG 2.4.2 Page Titled (Level A)
 * @param {string} title - The page title to set
 */
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default usePageTitle;
