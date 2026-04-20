import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';

// CountUp Component for stats — with reduced motion support
const CountUp = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setDisplayValue(parseInt(value));
        return;
      }
      let start = 0;
      const finalValue = parseInt(value);
      const duration = 2000;
      const increment = finalValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= finalValue) {
          setDisplayValue(finalValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, prefersReducedMotion]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

// Figma Design Assets
const portfolioData = [
  { name: "Babai Tiffins", category: "FoodTech", stage: "Seed", coInvested: "Partner Funds & Others", image: "/assets/webimages/Portfolio/Thumbnail/Babai%20Tiffins.png", logo: "/assets/webimages/Portfolio/Logo/Babai%20Tiffins.png" },
  { name: "Multipl", category: "Fintech", stage: "Series A", coInvested: "Blume, Flourish", image: "/assets/webimages/Portfolio/Thumbnail/Multipl.png", logo: "/assets/webimages/Portfolio/Logo/Multipl.png", badge: "Series A" },
  { name: "DaanVeda", category: "Social Impact", stage: "Seed", coInvested: "100Unicorns", image: "/assets/webimages/Portfolio/Thumbnail/DaanVeda.png", logo: "/assets/webimages/Portfolio/Logo/DaanVeda.png" },
  { name: "UKHI", category: "CleanTech", stage: "Seed", coInvested: "Impact Funds", image: "/assets/webimages/Portfolio/Thumbnail/UKHI.png", logo: "/assets/webimages/Portfolio/Logo/UKHI.png" },
  { name: "GetCrest.ai", category: "AI", stage: "Pre-Series A", coInvested: "IPV", image: "/assets/webimages/Portfolio/Thumbnail/GetCrest%20ai.png", logo: "/assets/webimages/Portfolio/Logo/GetCrest.png" },
  { name: "HomeCapital", category: "Proptech", stage: "Seed", coInvested: "AngelList", image: "/assets/webimages/Portfolio/Thumbnail/HomeCapital.png", logo: "/assets/webimages/Portfolio/Logo/HomeCapital.png" },
  { name: "Pick My Work", category: "Gig Economy", stage: "Seed", coInvested: "Venture Catalysts", image: "/assets/webimages/Portfolio/Thumbnail/Pick%20My%20Work.png", logo: "/assets/webimages/Portfolio/Logo/Pick%20My%20Work.png" },
  { name: "EcoRatings", category: "ESG / AI", stage: "Seed", coInvested: "Sovereign Funds", image: "/assets/webimages/Portfolio/Thumbnail/EcoRatings.png", logo: "/assets/webimages/Portfolio/Logo/EcoRatings.png" },
  { name: "Datazip", category: "Data / AI", stage: "Seed", coInvested: "Better Capital", image: "/assets/webimages/Portfolio/Thumbnail/Datazip.png", logo: "/assets/webimages/Portfolio/Logo/Datazip.png" },
  { name: "G.O.A.T Brand Labs", category: "D2C", stage: "Soonicorn", coInvested: "Tiger Global, Mayfield", image: "/assets/webimages/Portfolio/Thumbnail/G.O.A.T%20Brand%20Labs.png", logo: "/assets/webimages/Portfolio/Logo/G.O.A.T%20Brand%20Labs.png", badge: "Soonicorn" },
  { name: "Sanfe", category: "FemTech", stage: "Series A", coInvested: "LetsVenture", image: "/assets/webimages/Portfolio/Thumbnail/Sanfe.png", logo: "/assets/webimages/Portfolio/Logo/Sanfe.png" },
  { name: "IGoWise", category: "EV / Mobility", stage: "Seed", coInvested: "Cross-Border India–US", image: "/assets/webimages/Portfolio/Thumbnail/IGoWise.png", logo: "/assets/webimages/Portfolio/Logo/IGoWise.png" },
  { name: "Rooter", category: "Gaming", stage: "Series A", coInvested: "Partner Funds & Others", image: "/assets/webimages/Portfolio/Thumbnail/Rooter.png", logo: "/assets/webimages/Portfolio/Logo/Rooter.png", badge: "Series A" },
];

const categories = ["All", "Deep Tech", "AI", "D2C", "Fintech", "Proptech", "CleanTech", "FoodTech", "EV / Mobility"];


const PortfolioPage = () => {
  usePageTitle('Portfolio — 888VC');
  const prefersReducedMotion = useReducedMotion();

  const [filter, setFilter] = useState("All");
  const filteredData = filter === "All" ? portfolioData : portfolioData.filter(item => item.category.includes(filter));

  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 0.2], prefersReducedMotion ? [0, 0] : [0, 100]);

  return (
    <main id="main-content" role="main" ref={pageRef}>
      {/* Portfolio Hero */}
      <section aria-label="Portfolio overview" style={{ backgroundColor: 'var(--bg-soft)', paddingTop: '100px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <motion.div className="container" style={{ y: heroY }}>
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px', letterSpacing: '1px' }}>OUR PORTFOLIO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 className="text-hero" style={{ color: 'var(--primary)', marginBottom: '24px', fontSize: '60px' }}>
                Our startups are on their way to changing the world.
              </h1>
              <p className="text-lg text-muted" style={{ maxWidth: '560px', marginBottom: '40px' }}>
                From seed to Series A and beyond — 50+ companies, $1Bn+ in combined valuation, backed by 888vc and the world's best co-investors.
              </p>
              <button className="primary-btn" style={{ padding: '16px 32px' }}>Explore Portfolio →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[
                { label: 'STARTUPS FUNDED', value: '50', suffix: '+', color: 'var(--secondary)' },
                { label: 'COMBINED VALUATION', prefix: '$', value: '1', suffix: 'Bn+', color: 'var(--primary)' },
                { label: 'SERIES A FUNDED', value: '10', suffix: '+', color: 'var(--primary)' },
                { label: 'SOONICORNS', value: '3', suffix: '+', color: 'var(--primary)' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  style={{ backgroundColor: 'white', padding: '32px 24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                >
                  <div style={{ fontSize: '36px', fontWeight: 800, color: stat.color, marginBottom: '8px' }}>
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  {/* WCAG 1.4.6 — using compliant text-secondary color */}
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Bar — WCAG 2.1.1 Keyboard, 4.1.2 Name/Role/Value */}
      <div style={{ borderBottom: '1px solid var(--border-muted)', backgroundColor: 'white', position: 'sticky', top: '70px', zIndex: 100 }} role="search" aria-label="Filter portfolio companies">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <div role="tablist" aria-label="Category filters" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                aria-controls="portfolio-grid"
                onClick={() => setFilter(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: filter === cat ? 'var(--primary)' : '#eef1f9',
                  color: filter === cat ? 'white' : 'var(--primary)',
                  border: filter === cat ? '2px solid var(--primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '44px'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* WCAG 4.1.3 — aria-live for status message */}
          <div className="text-sm text-navy" style={{ fontWeight: 600 }} role="status" aria-live="polite">{filteredData.length} companies</div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section aria-label="Portfolio companies grid" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '12px' }}>OUR PORTFOLIO</div>
          <h2 className="text-3xl text-navy" style={{ marginBottom: '60px' }}>Companies we've backed</h2>

          <div id="portfolio-grid" role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {filteredData.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={prefersReducedMotion ? {} : { y: -10 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-muted)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}
              >
                <div
                  role="img"
                  aria-label={`${item.name} cover image`}
                  style={{ height: '180px', backgroundImage: `url("${item.image}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', bottom: '-15px', left: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px' }}>
                    <img src={item.logo} alt={`${item.name} logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
                <div style={{ padding: '32px 24px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: 'var(--bg-soft)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.category}</span>
                    <span style={{ backgroundColor: 'white', border: '1px solid var(--secondary)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--secondary)', fontWeight: 600 }}>{item.stage}</span>
                    {item.badge && (
                      <span style={{ backgroundColor: '#eef1f9', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>{item.badge}</span>
                    )}
                  </div>
                  <h3 className="text-xl text-navy" style={{ marginBottom: '16px', fontWeight: 700 }}>{item.name}</h3>
                  <div style={{ height: '1px', backgroundColor: 'var(--border-muted)', marginBottom: '16px' }} aria-hidden="true" />
                  <div className="text-xs text-muted" style={{ marginBottom: '20px' }}>Co-invested: {item.coInvested}</div>
                  <a href="#" aria-label={`Visit ${item.name} website`} className="text-orange font-bold text-sm">Visit →</a>
                </div>
              </motion.article>
            ))}

          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section aria-label="Success stories" style={{ backgroundColor: '#f5f7fc', padding: '80px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '12px' }}>SUCCESS STORIES</div>
          <h2 className="text-3xl text-navy" style={{ marginBottom: '60px' }}>Portfolio milestones that matter.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <motion.article whileHover={prefersReducedMotion ? {} : { y: -5 }} style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '40px', borderRadius: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.7, marginBottom: '24px' }}>ACQUISITION</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Finly</h3>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>Acquired</div>
              <p style={{ fontSize: '15px', opacity: 0.85, lineHeight: '1.7', marginBottom: '32px' }}>
                Finly's AP automation platform was successfully acquired by a large Fintech company in the US — a landmark exit that validated our early conviction.
              </p>
              <div style={{ fontSize: '12px', opacity: 0.5 }}>B2B SaaS · Exit via Acquisition</div>
            </motion.article>

            <motion.article whileHover={prefersReducedMotion ? {} : { y: -5 }} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-muted)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>SERIES A</div>
              <h3 className="text-navy" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Rooter</h3>
              <div className="text-navy" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Series A ✓</div>
              <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
                Rooter raised a strong Series A round with marquee investors — validating 888vc's early conviction in India's gaming content sector.
              </p>
              <div className="text-muted" style={{ fontSize: '12px' }}>Gaming · Series A</div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section aria-label="Join 888VC" style={{ backgroundColor: 'var(--primary)', padding: '100px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-4xl text-white" style={{ marginBottom: '24px', fontSize: '42px', maxWidth: '850px', margin: '0 auto 24px' }}>
            Be a part of our all-inclusive ecosystem of change-makers!
          </h2>
          <p className="text-lg text-white" style={{ opacity: 0.85, marginBottom: '40px' }}>
            50+ startup investments · $100Mn+ syndicated · Cross-border India–US community
          </p>
          <button className="primary-btn" style={{ padding: '16px 40px', fontSize: '16px' }}>Join Us →</button>
        </div>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.1 }} aria-hidden="true" />
      </section>
    </main>
  );
};

export default PortfolioPage;
