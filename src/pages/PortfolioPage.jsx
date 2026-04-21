import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';
import usePageTitle from '../hooks/usePageTitle';
import useIsMobile from '../hooks/useIsMobile';

// CountUp Component for stats — with accessibility support
const CountUp = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { motionEnabled } = useAccessibility();

  useEffect(() => {
    if (isInView) {
      if (!motionEnabled) {
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
  }, [isInView, value, motionEnabled]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

// Figma Design Assets
const portfolioData = [
  { name: "Babai Tiffins", url: "https://www.babaitiffins.com/", category: "FoodTech", stage: "Seed", coInvested: "Partner Funds & Others", image: "/assets/webimages/Portfolio/Thumbnail/Babai%20Tiffins.png", logo: "/assets/webimages/Portfolio/Logo/Babai%20Tiffins.png", founderName: "Ravi Morampudi", founderPhoto: "/assets/webimages/Portfolio/Founders/Ravi%20Morampudi.jpeg" },
  { name: "Multipl", url: "https://multipl.in/", category: "Fintech", stage: "Series A", coInvested: "Blume, Flourish", image: "/assets/webimages/Portfolio/Thumbnail/Multipl.png", logo: "/assets/webimages/Portfolio/Logo/Multipl.png", badge: "Series A", founderName: "Paddy Raghavan", founderPhoto: "/assets/webimages/Portfolio/Founders/Paddy%20Raghavan.jpeg" },
  { name: "DaanVeda", url: "https://daanveda.com/", category: "Social Impact", stage: "Seed", coInvested: "100Unicorns", image: "/assets/webimages/Portfolio/Thumbnail/DaanVeda.png", logo: "/assets/webimages/Portfolio/Logo/DaanVeda.png", founderName: "Irfan Bashir Shah", founderPhoto: "/assets/webimages/Portfolio/Founders/Irfan%20Bashir%20Shah.jpeg" },
  { name: "UKHI", url: "https://ukhi.com", category: "CleanTech", stage: "Seed", coInvested: "Impact Funds", image: "/assets/webimages/Portfolio/Thumbnail/UKHI.png", logo: "/assets/webimages/Portfolio/Logo/UKHI.png", founderName: "Vishal Vivek", founderPhoto: "/assets/webimages/Portfolio/Founders/Vishal%20Vivek.webp" },
  { name: "GetCrest.ai", url: "https://getcrest.ai", category: "AI", stage: "Pre-Series A", coInvested: "IPV", image: "/assets/webimages/Portfolio/Thumbnail/GetCrest%20ai.png", logo: "/assets/webimages/Portfolio/Logo/GetCrest.png", founderName: "Rahul Vishwakarma", founderPhoto: "/assets/webimages/Portfolio/Founders/Rahul%20Vishwakarma.jpeg" },
  { name: "HomeCapital", url: "https://homecapital.in", category: "Proptech", stage: "Seed", coInvested: "AngelList", image: "/assets/webimages/Portfolio/Thumbnail/HomeCapital.png", logo: "/assets/webimages/Portfolio/Logo/HomeCapital.png", founderName: "Lalit Menghani", founderPhoto: "/assets/webimages/Portfolio/Founders/Lalit%20Menghani.png" },
  { name: "Pick My Work", url: "https://pickmywork.com", category: "Gig Economy", stage: "Seed", coInvested: "Venture Catalysts", image: "/assets/webimages/Portfolio/Thumbnail/Pick%20My%20Work.png", logo: "/assets/webimages/Portfolio/Logo/Pick%20My%20Work.png", founderName: "Vidyarthi Baddireddy", founderPhoto: "/assets/webimages/Portfolio/Founders/Vidyarthi%20Baddireddy.png" },
  { name: "EcoRatings", url: "https://www.ecoratings.ai/", category: "ESG / AI", stage: "Seed", coInvested: "Sovereign Funds", image: "/assets/webimages/Portfolio/Thumbnail/EcoRatings.png", logo: "/assets/webimages/Portfolio/Logo/EcoRatings.png", founderName: "Aditi Balbir", founderPhoto: "/assets/webimages/Portfolio/Founders/Aditi%20Balbir.png" },
  { name: "Datazip", url: "https://datazip.io", category: "Data / AI", stage: "Seed", coInvested: "Better Capital", image: "/assets/webimages/Portfolio/Thumbnail/Datazip.png", logo: "/assets/webimages/Portfolio/Logo/Datazip.png", founderName: "Sandeep Devarapalli", founderPhoto: "/assets/webimages/Portfolio/Founders/Sandeep%20Devarapalli.jpeg" },
  { name: "G.O.A.T Brand Labs", url: "https://goatbrandlabs.com", category: "D2C", stage: "Soonicorn", coInvested: "Tiger Global, Mayfield", image: "/assets/webimages/Portfolio/Thumbnail/G.O.A.T%20Brand%20Labs.png", logo: "/assets/webimages/Portfolio/Logo/G.O.A.T%20Brand%20Labs.png", badge: "Soonicorn", founderName: "Rishi Vasudev", founderPhoto: "/assets/webimages/Portfolio/Founders/Rishi%20Vasudev.jpg" },
  { name: "Sanfe", url: "https://sanfe.in", category: "FemTech", stage: "Series A", coInvested: "LetsVenture", image: "/assets/webimages/Portfolio/Thumbnail/Sanfe.png", logo: "/assets/webimages/Portfolio/Logo/Sanfe.png", founderName: "Archit Agarwal", founderPhoto: "/assets/webimages/Portfolio/Founders/Archit%20Agarwal.jpeg" },
  { name: "IGoWise", url: "https://igowise.com/", category: "EV / Mobility", stage: "Seed", coInvested: "Cross-Border India–US", image: "/assets/webimages/Portfolio/Thumbnail/IGoWise.png", logo: "/assets/webimages/Portfolio/Logo/IGoWise.png", founderName: "Sravan K Appana", founderPhoto: "/assets/webimages/Portfolio/Founders/Sravan%20K%20Appana.jpeg" },
  { name: "Rooter", url: "https://www.rooter.gg/", category: "Gaming", stage: "Series A", coInvested: "Partner Funds & Others", image: "/assets/webimages/Portfolio/Thumbnail/Rooter.png", logo: "/assets/webimages/Portfolio/Logo/Rooter.png", badge: "Series A", founderName: "Piyush Kumar", founderPhoto: "/assets/webimages/Portfolio/Founders/Piyush%20Kumar.jpg" },
];

const sectors = ["Deeptech", "AI", "Manufacturing", "Consumer", "Semiconductor", "Spacetech", "Fintech", "Healthtech"];


const PortfolioPage = () => {
  usePageTitle('Portfolio — 888VC');
  const { motionEnabled } = useAccessibility();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 0.2], !motionEnabled ? [0, 0] : [0, 100]);

  return (
    <main id="main-content" role="main" ref={pageRef}>
      {/* Portfolio Hero */}
      <section aria-label="Portfolio overview" style={{ backgroundColor: 'var(--bg-soft)', paddingTop: '100px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <motion.div className="container" style={{ y: heroY }}>
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px', letterSpacing: '1px' }}>OUR PORTFOLIO</div>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.6fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
            <div>
              <h1 className="text-hero" style={{ color: 'var(--primary)', marginBottom: '24px', fontSize: isSmallMobile ? '38px' : (isMobile ? '48px' : '60px') }}>
                Our startups are on their way to changing the world.
              </h1>
              <p className="text-lg text-muted" style={{ maxWidth: '560px', marginBottom: '40px' }}>
                From seed to Series A and beyond — 50+ companies, $1Bn+ in combined valuation, backed by 888vc and the world's best co-investors.
              </p>
              <a href="https://gro8.club/" target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ textDecoration: 'none' }}>
                Join Our Community →
              </a>
            </div>
            <div className="mobile-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isSmallMobile ? '16px' : '20px' }}>
              {[
                { label: 'STARTUPS FUNDED', value: '50', suffix: '+', color: 'var(--secondary)' },
                { label: 'COMBINED VALUATION', prefix: '$', value: '1', suffix: 'Bn+', color: 'var(--primary)' },
                { label: 'SERIES A FUNDED', value: '10', suffix: '+', color: 'var(--primary)' },
                { label: 'SOONICORNS', value: '3', suffix: '+', color: 'var(--primary)' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={!motionEnabled ? {} : { opacity: 0, y: 20 }}
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

      {/* Invested Sectors Bar */}
      <div style={{ borderBottom: '1px solid var(--border-muted)', backgroundColor: 'white', position: 'sticky', top: isMobile ? '60px' : '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', padding: '16px 0', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Invested Sectors</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sectors.map(sector => (
                <div
                  key={sector}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '24px',
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: '#f0f4ff',
                    color: 'var(--primary)',
                    border: '1px solid rgba(29, 47, 111, 0.08)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-navy" style={{ fontWeight: 600 }}>{portfolioData.length} companies</div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section aria-label="Portfolio companies grid" style={{ padding: isMobile ? '60px 0' : '80px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '12px' }}>OUR PORTFOLIO</div>
          <h2 className="text-3xl text-navy" style={{ marginBottom: '60px' }}>Companies we've backed</h2>

          <div id="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {portfolioData.map((item, i) => (
              <motion.article
                key={item.name}
                initial={!motionEnabled ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={!motionEnabled ? {} : { y: -10 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-muted)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  position: 'relative'
                }}
              >
                <div
                  role="img"
                  aria-label={`${item.name} cover image`}
                  style={{ height: '180px', backgroundImage: `url("${item.image}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
                >
                  {/* Company Logo — Top Left */}
                  <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', zIndex: 3 }}>
                    <img src={item.logo} alt={`${item.name} logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>

                  {/* Floating Founder Card — Floating Right */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '15px',
                    width: '110px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    padding: '8px',
                    zIndex: 4,
                    textAlign: 'center'
                  }}>
                    {/* Portrait (Rectangle) */}
                    <div style={{
                      width: '100%',
                      height: '94px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}>
                      <img src={item.founderPhoto} alt={`Photo of ${item.founderName}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {/* Name (Just the name) */}
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', lineHeight: '1.2' }}>
                      {item.founderName}
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '40px 24px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: 'var(--bg-soft)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.category}</span>
                    <span style={{ backgroundColor: 'white', border: '1px solid var(--secondary)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--secondary)', fontWeight: 600 }}>{item.stage}</span>
                  </div>
                  
                  <h3 className="text-xl text-navy" style={{ marginBottom: '8px', fontWeight: 800 }}>{item.name}</h3>
                  <div className="text-xs text-muted" style={{ marginBottom: '24px' }}>Co-invested: {item.coInvested}</div>

                  <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.name} website`} className="text-orange font-bold text-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Visit Website <span style={{ fontSize: '16px' }}>→</span>
                  </a>
                </div>
              </motion.article>
            ))}

          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section aria-label="Success stories" style={{ backgroundColor: '#f5f7fc', padding: isMobile ? '60px 0' : '80px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '12px' }}>SUCCESS STORIES</div>
          <h2 className="text-3xl text-navy" style={{ marginBottom: '60px' }}>Portfolio milestones that matter.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <motion.article whileHover={!motionEnabled ? {} : { y: -5 }} style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '40px', borderRadius: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.7, marginBottom: '24px' }}>ACQUISITION</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Finly</h3>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>Acquired</div>
              <p style={{ fontSize: '15px', opacity: 0.85, lineHeight: '1.7', marginBottom: '32px' }}>
                Finly's AP automation platform was successfully acquired by a large Fintech company in the US — a landmark exit that validated our early conviction.
              </p>
              <div style={{ fontSize: '12px', opacity: 0.5 }}>B2B SaaS · Exit via Acquisition</div>
            </motion.article>

            <motion.article whileHover={!motionEnabled ? {} : { y: -5 }} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-muted)' }}>
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
      <section aria-label="Join 888VC" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '60px 20px' : '100px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-4xl text-white" style={{ marginBottom: '24px', fontSize: isSmallMobile ? '28px' : (isMobile ? '36px' : '42px'), maxWidth: '850px', margin: '0 auto 24px' }}>
            Be a part of our all-inclusive ecosystem of change-makers!
          </h2>
          <p className="text-lg text-white" style={{ opacity: 0.85, marginBottom: '40px' }}>
            50+ startup investments · $100Mn+ syndicated · Cross-border India–US community
          </p>
          <a href="https://forms.gle/hsN1ATiCtFPYZibo8" target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-block', padding: '16px 40px', fontSize: '16px' }}>
            Join Us →
          </a>
        </div>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.1 }} aria-hidden="true" />
      </section>
    </main>
  );
};

export default PortfolioPage;
