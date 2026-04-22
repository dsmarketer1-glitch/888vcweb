import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../data/site-content';
import { PartnersMarquee } from '../components/AdditionalSections';
import { useAccessibility } from '../context/AccessibilityContext';
import usePageTitle from '../hooks/usePageTitle';
import useIsMobile from '../hooks/useIsMobile';

// CountUp Component — with accessibility context support
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
const imgImageArea = "/assets/webimages/About%20Us/Our%20Story%20Section/Image%20area.jpg";

const portfolioDataSummary = [
  { label: 'STARTUPS INVESTED', value: '50', suffix: '+', color: 'var(--secondary)' },
  { label: 'COMBINED VALUATION', prefix: '$', value: '1', suffix: 'Bn+', color: 'var(--primary)' },
  { label: 'VC FUND PARTNERS', value: '200', suffix: '+', color: 'var(--primary)' },
  { label: 'ANGELS & CXOS', value: '1000', suffix: '+', color: 'var(--primary)' },
];

const countries = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Germany', flag: '🇩🇪' }
];

const AboutPage = () => {
  usePageTitle('About Us — 888VC');
  const { motionEnabled } = useAccessibility();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  // Parallax effects — disabled if motion is not enabled
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], !motionEnabled ? [1, 1] : [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], !motionEnabled ? [0, 0] : [0, 50]);

  return (
    <main id="main-content" role="main" ref={pageRef}>
      {/* Hero Banner */}
      <section aria-label="About 888VC" style={{ backgroundColor: '#f0f4fb', padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Abstract Blobs — decorative */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-100px', top: '-120px', width: '500px', height: '500px', opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              <div className="text-orange text-sm font-bold" style={{
                backgroundColor: 'rgba(235, 58, 27, 0.1)',
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '24px'
              }}>
                EARLY-STAGE VENTURE CAPITAL · INDIA × US
              </div>
              <h1 className="text-hero" style={{ fontSize: isSmallMobile ? '38px' : (isMobile ? '48px' : '66px'), lineHeight: '1.1', marginBottom: '32px' }}>
                Backing those <br/>
                who dare to build <br/>
                <span className="text-orange">beyond limits.</span>
              </h1>
              <p className="text-lg text-muted" style={{ maxWidth: '600px', marginBottom: '48px', lineHeight: '1.6' }}>
                888vc is an early-stage venture capital firm backing founders building category-defining, technology-led businesses. A peer network of leaders across the globe.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/portfolio" className="primary-btn" aria-label="About Us View Portfolio CTA" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  View Portfolio →
                </Link>
                <a href="https://gro8.club/" target="_blank" rel="noopener noreferrer" className="secondary-btn" aria-label="About Us Join our Community CTA" style={{ textDecoration: 'none', borderRadius: '14px', padding: '14px 28px', display: 'inline-block', borderColor: 'rgba(29,47,111,0.15)', color: 'var(--primary)', fontWeight: 700 }}>
                  Join our Community
                </a>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="mobile-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isSmallMobile ? '16px' : '24px' }}>
              {portfolioDataSummary.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={!motionEnabled ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: !motionEnabled ? 0 : i * 0.1 }}
                  style={{ backgroundColor: 'white', padding: '32px 24px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ fontSize: '36px', fontWeight: 800, color: stat.color, marginBottom: '8px' }}>
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section aria-label="Our Story" style={{ padding: isMobile ? '80px 0' : '120px 0' }}>
        <div className="container">
          <div className="responsive-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: isMobile ? '40px' : '100px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <motion.div
                initial={!motionEnabled ? {} : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
              >
                <img src={imgImageArea} alt="888VC team collaborating in office" style={{ width: '100%', display: 'block' }} />
              </motion.div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-30px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '24px 32px',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 800 }}>2020</div>
                <div style={{ fontSize: '13px', opacity: 0.7 }}>Founded</div>
              </div>
            </div>

            <div>
              <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>OUR STORY</div>
              <h2 className="text-4xl text-navy" style={{ fontSize: '42px', lineHeight: '1.2', marginBottom: '32px', fontWeight: 800 }}>
                A community built on <br/>
                conviction, not just capital.
              </h2>
              <p className="text-lg text-muted" style={{ marginBottom: '24px', lineHeight: '1.7' }}>
                888vc was founded on a simple but powerful idea — that the best founders don't just need money. They need a network of believers who will open doors, share hard-won knowledge, and stand behind them through every stage.
              </p>
              <p className="text-lg text-muted" style={{ marginBottom: '48px', lineHeight: '1.7' }}>
                We are a digital-first, community-based investment platform. Our community members are a mix of corporate executives, founders, and investors who have been part of the startup ecosystem across India, the US, and beyond.
              </p>

              <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {[
                  { title: 'Seed to Series A', desc: 'First cheques up to $500K' },
                  { title: 'India × US', desc: 'Cross-border market access' },
                  { title: 'Community First', desc: '1000+ angels & CXOs' },
                  { title: 'GRO8 Platform', desc: 'SPV, syndication & mentorship' },
                ].map((pillar, i) => (
                  <div key={i} style={{ backgroundColor: '#f5f7fc', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--primary)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                      <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                    </div>
                    <div>
                      <div className="text-navy font-bold" style={{ fontSize: '14px' }}>{pillar.title}</div>
                      <div className="text-muted" style={{ fontSize: '12px' }}>{pillar.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section aria-label="Founder spotlight" style={{ backgroundColor: 'var(--primary)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background Texture - Lines — decorative */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} style={{ width: '1px', height: '100%', backgroundColor: 'white' }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="responsive-stack" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '380px 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'start' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '3/4'
              }}>
                <img src={SITE_CONTENT.team.founder.image} alt={`Photo of ${SITE_CONTENT.team.founder.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-20px',
                backgroundColor: 'var(--secondary)',
                color: 'white',
                padding: '24px 32px',
                borderRadius: '14px'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 800 }}>10+</div>
                <div style={{ fontSize: '13px' }}>Years in VC</div>
              </div>
            </div>

            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '24px', letterSpacing: '1px' }}>FOUNDER & CEO</div>
              <h2 style={{ fontSize: isSmallMobile ? '38px' : '52px', fontWeight: 800, marginBottom: '16px' }}>Rohit Bafna</h2>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '6px 20px',
                borderRadius: '17px',
                display: 'inline-block',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '32px'
              }}>
                Founder & CEO, 888vc
              </div>
              <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: '1.7', marginBottom: '48px', maxWidth: '700px' }}>
                Early-stage investor with 10+ years of venture capital experience. Rohit has syndicated over 100 startup investments and backed 50+ companies across AI, Deep Tech, Manufacturing, and Consumer. He holds a Master's in Global Finance from Fordham University, New York.
              </p>

              <div style={{ display: 'flex', gap: '60px', borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '32px 0', marginBottom: '48px', flexWrap: 'wrap' }}>
                {[
                  { label: 'COMPANIES BACKED', value: '50+' },
                  { label: 'INVESTMENTS SYNDICATED', value: '100+' },
                  { label: 'CAPITAL DEPLOYED', value: '$100Mn+' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.7 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['AI & Deep Tech', 'Manufacturing', 'Consumer', 'Cross-Border India × US', 'Fordham University, NY'].map(tag => (
                  <span key={tag} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '15px', fontSize: '12px', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section aria-label="Our philosophy" style={{ backgroundColor: '#f5f7fc', padding: '120px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>OUR PHILOSOPHY</div>
          <h2 className="text-4xl text-navy" style={{ fontWeight: 800, marginBottom: '24px' }}>How we think about building companies.</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', marginBottom: '64px' }}>
            Four core beliefs that guide every investment decision and every relationship we build with founders.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { id: '01', title: 'Back the Builder, Not Just the Business Plan', desc: 'We invest in founders first. Conviction, character, and the ability to learn fast matter more than a polished deck.', tag: 'Founder First' },
              { id: '02', title: 'Global by Design from Day One', desc: "We believe India's best companies are built for the world — not just for one market. Our India × US corridor gives founders a real path globally.", tag: 'Cross-Border' },
              { id: '03', title: 'Capital + Community = Compounding Advantage', desc: 'Money alone doesn\'t build companies. Our 1000+ member network means portfolio companies get warm introductions and strategic partnership.', tag: 'GRO8 Network' },
              { id: '04', title: 'Long-Term Partnership Over Transactional Investment', desc: "We don't just write cheques and move on. We stay deeply engaged — through pivots, fundraises, and scale.", tag: 'Long Term' },
            ].map((belief, i) => (
              <motion.div
                key={i}
                initial={!motionEnabled ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={!motionEnabled ? {} : { y: -5 }}
                style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid rgba(29,47,111,0.08)' }}
              >
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#eef1f9', marginBottom: '-15px' }} aria-hidden="true">{belief.id}</div>
                <h3 className="text-navy" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', position: 'relative', zIndex: 1 }}>{belief.title}</h3>
                <p className="text-sm text-muted" style={{ marginBottom: '24px', lineHeight: '1.6' }}>{belief.desc}</p>
                <span style={{ backgroundColor: '#f5f7fc', padding: '4px 12px', borderRadius: '11px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>{belief.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section aria-label="Core team members" style={{ padding: '120px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>THE TEAM</div>
          <h2 className="text-4xl text-navy" style={{ fontWeight: 800, marginBottom: '20px' }}>Meet the people behind 888vc.</h2>
          <p className="text-lg text-muted" style={{ marginBottom: '60px' }}>Operators, lawyers, investors, and advisors — decades of cross-border experience.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {SITE_CONTENT.team.members.map((member, i) => (
              <motion.div key={i} whileHover={!motionEnabled ? {} : { y: -10 }} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.08)', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1/1.2', overflow: 'hidden' }}>
                  <img src={member.image} alt={`Photo of ${member.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 className="text-navy font-bold" style={{ fontSize: '16px', marginBottom: '8px' }}>{member.name}</h3>
                  <div className="text-orange font-bold" style={{ fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{member.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network / Angels */}
      <section aria-label="Investment network" style={{ backgroundColor: '#f5f7fc', padding: '100px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>OUR NETWORK</div>
          <h2 className="text-3xl text-navy" style={{ fontWeight: 800, marginBottom: '60px' }}>Super Angels & CXOs Investing With Us</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Akash Gupta', title: 'Co-Founder & CEO, Zypp Electric', img: '/assets/webimages/Homepage/SuperAngels/Akash%20Gupta.png' },
              { name: 'Gaurav Mangla', title: 'CEO & Co-Founder, Pickrr', img: '/assets/webimages/Homepage/SuperAngels/Gaurav%20Mangla.png' },
              { name: 'Dinesh Kumar', title: 'CEO, Ixigo Trains & Confirmtkt', img: '/assets/webimages/Homepage/SuperAngels/Dinesh%20Kumar.png' },
              { name: 'Sripad Vaidya', title: 'COO, Ixigo Trains & Confirmtkt', img: '/assets/webimages/Homepage/SuperAngels/Sripad%20Vaidya.png' },
            ].map((angel, i) => (
              <motion.div key={i} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(29,47,111,0.08)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px' }}>
                  <img src={angel.img} alt={`Photo of ${angel.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className="text-navy font-bold" style={{ fontSize: '18px', marginBottom: '8px' }}>{angel.name}</h3>
                <div className="text-orange" style={{ fontSize: '12px', fontWeight: 500 }}>{angel.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section aria-label="Global presence" style={{ backgroundColor: 'var(--primary)', padding: '100px 0', position: 'relative', overflow: 'hidden', color: 'white' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(40, 1fr)',
          gridTemplateRows: 'repeat(20, 1fr)',
          gap: '2px',
          opacity: 0.1,
          pointerEvents: 'none'
        }} aria-hidden="true">
          {Array(800).fill(0).map((_, i) => (
            <div key={i} style={{ width: '2px', height: '2px', backgroundColor: 'white', borderRadius: '50%' }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '24px', letterSpacing: '1px', opacity: 0.75 }}>GLOBAL PRESENCE</div>
          <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '48px', maxWidth: '800px', margin: '0 auto 48px', lineHeight: '1.2' }}>
            A global community of <br/>
            investors and founders.
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {countries.map((country, i) => (
              <motion.div
                key={i}
                initial={!motionEnabled ? {} : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <span style={{ fontSize: '18px' }} aria-hidden="true">{country.flag}</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{country.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersMarquee />

      {/* Portfolio CTA */}
      <section aria-label="Call to action" style={{ backgroundColor: 'var(--primary)', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-4xl text-white" style={{ marginBottom: '24px', fontSize: '48px', maxWidth: '900px', margin: '0 auto 24px', fontWeight: 800 }}>
            Be a part of our ecosystem of change-makers.
          </h2>
          <p className="text-lg text-white" style={{ opacity: 0.85, marginBottom: '48px', maxWidth: '850px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            Whether you're building something extraordinary or looking for your next investment — the 888vc community is where ambition meets capital.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://forms.gle/hsN1ATiCtFPYZibo8" target="_blank" rel="noopener noreferrer" className="primary-btn" aria-label="About Us Apply as Startup CTA" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Apply as Startup →
            </a>
            <a href="https://forms.gle/RNPwKDHfkdeaffvo7" target="_blank" rel="noopener noreferrer" className="secondary-btn" aria-label="About Us Join as Investor CTA" style={{
                textDecoration: 'none',
                display: 'inline-block',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                padding: '16px 40px',
                fontSize: '16px',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>Join as Investor</a>
          </div>
        </div>

        {/* Abstract Blobs — decorative */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 60%)', opacity: 0.1, zIndex: 0 }} aria-hidden="true" />
      </section>
    </main>
  );
};

export default AboutPage;
