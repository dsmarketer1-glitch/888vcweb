import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SITE_CONTENT } from '../data/site-content';
import { PartnersMarquee } from '../components/AdditionalSections';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

// CountUp Component — with reduced motion support
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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  // Parallax effects — disabled for reduced motion
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], (prefersReducedMotion || isMobile) ? [1, 1] : [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], (prefersReducedMotion || isMobile) ? [0, 0] : [0, 50]);

  return (
    <main id="main-content" role="main" ref={pageRef} style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Banner */}
      <section aria-label="About 888VC" style={{ backgroundColor: '#f0f4fb', padding: isMobile ? '80px 0 60px' : '120px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-100px', top: '-120px', width: '500px', height: '500px', opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', 
            gap: isMobile ? '40px' : '60px', 
            alignItems: 'center' 
          }}>
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
              <h1 className="text-hero" style={{ 
                fontSize: isSmallMobile ? '38px' : (isMobile ? '52px' : '66px'), 
                lineHeight: '1.1', 
                marginBottom: '32px',
                wordWrap: 'break-word'
              }}>
                Backing those <br className="hidden-mobile"/>
                who dare to build <br className="hidden-mobile"/>
                <span className="text-orange">beyond limits.</span>
              </h1>
              <p className="text-lg text-muted" style={{ maxWidth: '600px', marginBottom: '48px', lineHeight: '1.6', fontSize: isSmallMobile ? '16px' : '18px' }}>
                888vc is an early-stage venture capital firm backing founders building category-defining, technology-led businesses. A peer network of leaders across the globe.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button className="primary-btn" style={{ width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center' }}>View Portfolio →</button>
                <button className="secondary-btn" style={{ width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center', borderColor: 'rgba(29,47,111,0.15)', color: 'var(--primary)', fontWeight: 700 }}>Join our Community</button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(2, 1fr)', 
              gap: '20px' 
            }}>
              {portfolioDataSummary.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: 'white', padding: isSmallMobile ? '24px' : '32px 24px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', textAlign: isSmallMobile ? 'center' : 'left' }}
                >
                  <div style={{ fontSize: isSmallMobile ? '32px' : '36px', fontWeight: 800, color: stat.color, marginBottom: '8px' }}>
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
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', 
            gap: isMobile ? '40px' : '100px', 
            alignItems: 'center' 
          }}>
            <div style={{ position: 'relative', order: isMobile ? 2 : 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
              >
                <img src={imgImageArea} alt="888VC team collaborating" style={{ width: '100%', display: 'block' }} />
              </motion.div>
              <div style={{
                position: 'absolute',
                bottom: isSmallMobile ? '-15px' : '-30px',
                right: isSmallMobile ? '-15px' : '-30px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: isSmallMobile ? '16px 20px' : '24px 32px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}>
                <div style={{ fontSize: isSmallMobile ? '20px' : '28px', fontWeight: 800 }}>2020</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>Founded</div>
              </div>
            </div>

            <div style={{ order: isMobile ? 1 : 2 }}>
              <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>OUR STORY</div>
              <h2 className="text-navy" style={{ 
                fontSize: isSmallMobile ? '30px' : (isMobile ? '36px' : '42px'), 
                lineHeight: '1.2', 
                marginBottom: '32px', 
                fontWeight: 800 
              }}>
                A community built on <br className="hidden-mobile"/>
                conviction, not just capital.
              </h2>
              <p className="text-lg text-muted" style={{ marginBottom: '24px', lineHeight: '1.7', fontSize: isSmallMobile ? '16px' : '18px' }}>
                888vc was founded on a simple but powerful idea — that the best founders don't just need money. They need a network of believers who will open doors, share hard-won knowledge, and stand behind them through every stage.
              </p>
              <p className="text-lg text-muted" style={{ marginBottom: '48px', lineHeight: '1.7', fontSize: isSmallMobile ? '16px' : '18px' }}>
                We are a digital-first, community-based investment platform. Our community members are a mix of corporate executives, founders, and investors who have been part of the startup ecosystem.
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: '16px' 
              }}>
                {[
                  { title: 'Seed to Series A', desc: 'First cheques up to $500K' },
                  { title: 'India × US', desc: 'Cross-border market access' },
                  { title: 'Community First', desc: '1000+ angels & CXOs' },
                  { title: 'GRO8 Platform', desc: 'SPV, syndication & mentorship' },
                ].map((pillar, i) => (
                  <div key={i} style={{ backgroundColor: '#f5f7fc', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                      <div style={{ width: '5px', height: '5px', backgroundColor: 'white', borderRadius: '50%' }} />
                    </div>
                    <div>
                      <div className="text-navy font-bold" style={{ fontSize: '13px' }}>{pillar.title}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{pillar.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section aria-label="Founder spotlight" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '80px 0' : '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} style={{ width: '1px', height: '100%', backgroundColor: 'white' }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '380px 1fr', 
            gap: isMobile ? '40px' : '80px', 
            alignItems: 'start' 
          }}>
            <div style={{ position: 'relative', maxWidth: isMobile ? '400px' : '100%', margin: isMobile ? '0 auto' : '0' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '3/4'
              }}>
                <img src={SITE_CONTENT.team.founder.image} alt="Rohit Bafna" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-15px',
                backgroundColor: 'var(--secondary)',
                color: 'white',
                padding: '20px 28px',
                borderRadius: '14px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 800 }}>10+</div>
                <div style={{ fontSize: '12px' }}>Years in VC</div>
              </div>
            </div>

            <div style={{ color: 'white', textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '20px', letterSpacing: '1px' }}>FOUNDER & CEO</div>
              <h2 style={{ fontSize: isSmallMobile ? '36px' : (isMobile ? '42px' : '52px'), fontWeight: 800, marginBottom: '16px' }}>Rohit Bafna</h2>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '6px 20px',
                borderRadius: '17px',
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '32px'
              }}>
                Founder & CEO, 888vc
              </div>
              <p style={{ fontSize: isSmallMobile ? '16px' : '18px', opacity: 0.9, lineHeight: '1.7', marginBottom: '40px', maxWidth: '700px', margin: isMobile ? '0 auto 40px' : '0 0 40px' }}>
                Early-stage investor with 10+ years of venture capital experience. Rohit has syndicated over 100 startup investments and backed 50+ companies across AI, Deep Tech, Manufacturing, and Consumer.
              </p>

              <div style={{ 
                display: 'flex', 
                gap: isSmallMobile ? '24px' : '60px', 
                borderTop: '1px solid rgba(255,255,255,0.15)', 
                borderBottom: '1px solid rgba(255,255,255,0.15)', 
                padding: '32px 0', 
                marginBottom: '40px', 
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                {[
                  { label: 'COMPANIES BACKED', value: '50+' },
                  { label: 'INVESTMENTS SYNDICATED', value: '100+' },
                  { label: 'CAPITAL DEPLOYED', value: '$100Mn+' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <div style={{ fontSize: isSmallMobile ? '24px' : '32px', fontWeight: 800, marginBottom: '8px' }}>{s.value}</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.7 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {['AI & Deep Tech', 'Manufacturing', 'Consumer', 'Cross-Border', 'Fordham University'].map(tag => (
                  <span key={tag} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '15px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section aria-label="Our philosophy" style={{ backgroundColor: '#f5f7fc', padding: isMobile ? '80px 0' : '120px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>OUR PHILOSOPHY</div>
          <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, marginBottom: '24px' }}>How we think about building companies.</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', marginBottom: isMobile ? '40px' : '64px', fontSize: isSmallMobile ? '16px' : '18px' }}>
            Four core beliefs that guide every investment decision and relationship we build with founders.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              { id: '01', title: 'Back the Builder, Not Just the Plan', desc: 'We invest in founders first. Conviction, character, and the ability to learn fast matter more.', tag: 'Founder First' },
              { id: '02', title: 'Global by Design from Day One', desc: "India's best companies are built for the world. Our India × US corridor gives founders a path.", tag: 'Cross-Border' },
              { id: '03', title: 'Capital + Community Advantage', desc: 'Money alone doesn\'t build companies. Our 1000+ member network means warm introductions.', tag: 'GRO8 Network' },
              { id: '04', title: 'Long-Term Strategic Partnership', desc: "We don't just write cheques. We stay deeply engaged — through pivots, fundraises, and scale.", tag: 'Long Term' },
            ].map((belief, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', border: '1px solid rgba(29,47,111,0.08)' }}
              >
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#eef1f9', marginBottom: '-10px' }} aria-hidden="true">{belief.id}</div>
                <h3 className="text-navy" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', position: 'relative', zIndex: 1 }}>{belief.title}</h3>
                <p className="text-sm text-muted" style={{ marginBottom: '24px', lineHeight: '1.6' }}>{belief.desc}</p>
                <span style={{ backgroundColor: '#f5f7fc', padding: '4px 10px', borderRadius: '10px', fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 700 }}>{belief.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section aria-label="Core team" style={{ padding: isMobile ? '80px 0' : '120px 0' }}>
        <div className="container">
          <div className="text-orange text-sm font-bold" style={{ marginBottom: '16px' }}>THE TEAM</div>
          <h2 className="text-4xl text-navy" style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, marginBottom: '20px' }}>Meet the people behind 888vc.</h2>
          <p className="text-lg text-muted" style={{ marginBottom: '48px' }}>Decades of cross-border experience.</p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: isSmallMobile ? '12px' : '20px' 
          }}>
            {SITE_CONTENT.team.members.map((member, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -5 }} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1/1.2', overflow: 'hidden' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '12px' }}>
                  <h3 className="text-navy font-bold" style={{ fontSize: '14px', marginBottom: '4px' }}>{member.name}</h3>
                  <div className="text-orange font-bold" style={{ fontSize: '10px', textTransform: 'uppercase' }}>{member.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersMarquee />

      {/* CTA Section */}
      <section aria-label="Call to action" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '80px 20px' : '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-white" style={{ 
            marginBottom: '24px', 
            fontSize: isSmallMobile ? '30px' : (isMobile ? '38px' : '48px'), 
            maxWidth: '900px', 
            margin: '0 auto 24px', 
            fontWeight: 800 
          }}>
            Be a part of our ecosystem of change-makers.
          </h2>
          <p className="text-lg text-white" style={{ opacity: 0.85, marginBottom: '40px', maxWidth: '850px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Whether you're building or looking for your next investment — the 888vc community is where ambition meets capital.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="primary-btn" style={{ width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center', padding: '16px 40px' }}>Apply as Startup →</button>
            <button className="secondary-btn" style={{
              width: isSmallMobile ? '100%' : 'auto', 
              justifyContent: 'center',
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              padding: '16px 40px',
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}>Join as Investor</button>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 60%)', opacity: 0.1, zIndex: 0 }} aria-hidden="true" />
      </section>
    </main>
  );
};

export default AboutPage;
