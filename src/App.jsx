import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Ticker, Navbar } from './components/Navbar';
import { Footer } from './components/AdditionalSections';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import InvestorsPage from './pages/InvestorsPage';
import StartupPage from './pages/StartupPage';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        {/* WCAG 2.4.1 Bypass Blocks — Skip to main content link */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <Ticker />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/startup" element={<StartupPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
