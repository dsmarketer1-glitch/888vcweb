import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Globe, Building2, Target, CheckCircle2, ChevronRight, Briefcase, TrendingUp } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

/* ─── CountUp — with reduced motion support ─── */
const CountUp = ({ value, prefix = '', suffix = '' }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(parseInt(value));
      return;
    }
    let cur = 0;
    const end = parseInt(value);
    const step = Math.max(1, end / (1500 / 16));
    const id = setInterval(() => {
      cur += step;
      if (cur >= end) { setDisplay(end); clearInterval(id); }
      else setDisplay(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, value, prefersReducedMotion]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

/* ─── WebImages Assets ─── */
const imgHeroSub1 = '/assets/webimages/Investors/HERO/Thumb%201.jpg';
const imgHeroSub2 = '/assets/webimages/Investors/HERO/Thumb%202.jpg';
const imgHeroSub3 = '/assets/webimages/Investors/HERO/Thumb%203.jpg';
const imgEcosystem = '/assets/webimages/Investors/WHY%20888VC/888vc%20meeting.jpg';
const imgFooterHero = '/assets/webimages/Investors/FOOTER/888vcevent.jpg';

/* ─── Data ─── */
const investorTypes = [
  { title: 'Super Angels', desc: 'Founders, CXOs, and industry veterans who bring more than just capital.', icon: Users },
  { title: 'Family Offices', desc: 'Strategic capital from established family offices looking for high-alpha startup exposure.', icon: Globe },
  { title: 'Institutions', desc: 'Venture funds and institutional limited partners backing our cross-border thesis.', icon: Building2 },
];

const sectors = [
  { name: 'AI & Deep Tech', img: '/assets/webimages/Startup/PORTFOLIO/EcoRatings.png' },
  { name: 'Manufacturing', img: '/assets/webimages/Startup/PORTFOLIO/Pick%20My%20Work.png' },
  { name: 'Gaming / Consumer', img: '/assets/webimages/Startup/PORTFOLIO/Rooter.png' },
  { name: 'Fintech / SaaS', img: '/assets/webimages/Startup/PORTFOLIO/GetCrest%20ai.png' },
];

/* ─── COMPONENT ─── */
const InvestorsPage = () => {
  usePageTitle('For Investors — 888VC');
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  return (
    <main id="main-content" role="main" style={{ backgroundColor: 'white', width: '100%', overflowX: 'hidden' }}>

      {/* ═══ 1 · HERO ═══ */}
      <section aria-label="Investment opportunities overview" style={{ backgroundColor: '#f0f4fb', padding: isMobile ? '80px 0 60px' : '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', width: isSmallMobile ? 280 : 520, height: isSmallMobile ? 280 : 520, right: -30, top: -150, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: isSmallMobile ? 220 : 380, height: isSmallMobile ? 220 : 380, right: 40, top: -80, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 480px', 
            gap: isMobile ? '40px' : '60px', 
            alignItems: 'start' 
          }}>
            {/* Left */}
            <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ backgroundColor: 'rgba(235,58,27,0.1)', display: 'inline-block', padding: '6px 20px', borderRadius: 15, marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)' }}>PRIVATE INVESTMENT NETWORK</span>
              </div>
              <h1 style={{ 
                fontSize: isSmallMobile ? '38px' : (isMobile ? '52px' : '68px'), 
                fontWeight: 800, 
                lineHeight: 1.1, 
                marginBottom: 24,
                wordWrap: 'break-word'
              }}>
                <span style={{ color: 'var(--primary)', display: 'block' }}>High-Alpha Deals.</span>
                <span style={{ color: 'var(--secondary)' }}>Deep Technical Edge.</span>
              </h1>
              <p style={{ fontSize: isSmallMobile ? '16px' : '17px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 580, marginBottom: 32 }}>
                888vc connects global investors with India's most promising early-stage founders. We focus on technology-led businesses with defensible moats and global scale potential.
              </p>
              <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                <button className="primary-btn" style={{ width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center' }}>Become a Member →</button>
                <button style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14, border: '1px solid rgba(29,47,111,0.15)', cursor: 'pointer', minHeight: '44px', width: isSmallMobile ? '100%' : 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Partner with Us</button>
              </div>
            </motion.div>

            {/* Right Cards — WCAG 1.1.1 (decorative images hidden or alted) */}
            <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isSmallMobile ? '10px' : '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isSmallMobile ? '10px' : '14px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(29,47,111,0.1)' }}>
                  <img src={imgHeroSub1} alt="" style={{ width: '100%', height: isSmallMobile ? 120 : 160, objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}><CountUp value="50" suffix="+" /></div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>STARTUPS FUNDED</div>
                  </div>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(29,47,111,0.1)' }}>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--secondary)' }}><CountUp value="200" suffix="+" /></div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>VC PARTNERS</div>
                  </div>
                  <img src={imgHeroSub2} alt="" style={{ width: '100%', height: isSmallMobile ? 80 : 100, objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isSmallMobile ? '10px' : '14px', paddingTop: isSmallMobile ? 0 : 20 }}>
                <div style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(29,47,111,0.1)' }}>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}><CountUp value="1" prefix="$" suffix="Bn+" /></div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>COMBINED VALUATION</div>
                  </div>
                  <img src={imgHeroSub3} alt="" style={{ width: '100%', height: isSmallMobile ? 140 : 180, objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: 'var(--secondary)', color: 'white', borderRadius: 16, padding: '16px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>15%</div>
                  <p style={{ fontSize: 10, lineHeight: 1.4, opacity: 0.9 }}>Average deal co-syndicated with Tier-1 VC funds.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 2 · STATS STRIP ═══ */}
      <section aria-label="Key statistics" style={{ backgroundColor: 'var(--primary)', padding: '36px 0' }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'),
          gap: isSmallMobile ? '24px 16px' : '20px',
          justifyItems: 'center',
          alignItems: 'center'
        }}>
          {[
            { value: '50', suffix: '+', label: 'COMPANIES' },
            { value: '1', prefix: '$', suffix: 'Bn+', label: 'VALUATION' },
            { value: '100', prefix: '$', suffix: 'Mn+', label: 'SYNDICATED' },
            { value: '200', suffix: '+', label: 'VC PARTNERS' },
            { value: '1000', suffix: '+', label: 'ANGEL MEMBERS' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isSmallMobile ? '28px' : '34px', fontWeight: 800, color: 'white' }}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'white', opacity: 0.8, marginTop: 4, letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 · WHY 888VC ═══ */}
      <section aria-label="Why partner with 888VC" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '640px 1fr', 
            gap: isMobile ? '40px' : '80px', 
            alignItems: 'center' 
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary)', marginBottom: 12 }}>WHY 888VC</div>
              <h2 style={{ fontSize: isSmallMobile ? '30px' : (isMobile ? '36px' : '42px'), fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2, marginBottom: 20 }}>
                Proprietary access to high-conviction dealflow.
              </h2>
              <p style={{ fontSize: isSmallMobile ? '16px' : '17px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
                We bridge the gap between global capital and high-growth Indian startups. Our model combines institutional-grade diligence with a community-driven technical edge.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
                {[
                  { title: 'AI-Enabled Diligence', desc: 'We use proprietary AI agents to screen 500+ startups every month.' },
                  { title: 'Cross-Border Edge', desc: 'Deep roots in India, US, and UAE for global expansion support.' },
                  { title: 'Tier-1 Co-Investors', desc: 'We often co-invest alongside major global VC funds.' },
                  { title: 'Structured SPVs', desc: 'Fully compliant digital platforms for seamless capital deployment.' },
                ].map((item, i) => (
                  <div key={i} style={{ backgroundColor: '#f5f7fc', padding: '16px', borderRadius: 12 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', height: isMobile ? 320 : 500 }}>
                <img src={imgEcosystem} alt="888VC investor meet-up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -20, right: -10, backgroundColor: 'var(--secondary)', color: 'white', padding: '20px', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>100+</div>
                <div style={{ fontSize: 12 }}>Deals Closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · SECTOR FOCUS ═══ */}
      <section aria-label="Our sector focus" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '80px 0' : '100px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: isMobile ? 40 : 60 }}>
            <h2 style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, color: 'white', marginBottom: 12 }}>Our Sector Conviction</h2>
            <p style={{ fontSize: 16, color: 'white', opacity: 0.7, maxWidth: 600, margin: isMobile ? '0 auto' : '0' }}>We back technology-led businesses that reimagining industries from the ground up.</p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), 
            gap: 20 
          }}>
            {sectors.map((s, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -10 }} style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{s.name}</span>
                  <ChevronRight color="white" size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 · INVESTOR TYPES ═══ */}
      <section aria-label="Who can invest" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary)', marginBottom: 12 }}>PARTNERSHIP TYPES</div>
              <h2 style={{ fontSize: isSmallMobile ? '30px' : (isMobile ? '36px' : '42px'), fontWeight: 800, color: 'var(--primary)', marginBottom: 20 }}>A global community of sophisticated investors.</h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40, lineHeight: 1.6 }}>888vc is more than a fund; it is a peer network of decision-makers. We select our limited partners as carefully as we select our founders.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {investorTypes.map((type, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#f0f4fb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <type.icon color="var(--primary)" size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{type.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ paddingTop: 30 }}>
                <div style={{ backgroundColor: '#eef1f9', borderRadius: 20, padding: '30px 20px', textAlign: 'center', marginBottom: 16 }}>
                  <TrendingUp size={32} color="var(--primary)" style={{ marginBottom: 16 }} />
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>25%</div>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6 }}>TARGET IRR</div>
                </div>
                <div style={{ height: 200, borderRadius: 20, overflow: 'hidden' }}>
                  <img src="/assets/webimages/About%20Us/Our%20Story%20Section/Image%20area.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div>
                <div style={{ height: 240, borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
                  <img src="/assets/webimages/Investors/WHY%20888VC/888vc%20meeting.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: 'var(--secondary)', borderRadius: 20, padding: '30px 20px', textAlign: 'center', color: 'white' }}>
                  <Briefcase size={32} style={{ marginBottom: 16 }} />
                  <div style={{ fontSize: 24, fontWeight: 800 }}>$100Mn+</div>
                  <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>DEAL VALUE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6 · OUR PROCESS ═══ */}
      <section aria-label="Our investment process" style={{ backgroundColor: '#f5f7fc', padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary)', marginBottom: 12 }}>THE INVESTOR JOURNEY</div>
            <h2 style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, color: 'var(--primary)' }}>How it works.</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), 
            gap: 24, 
            position: 'relative' 
          }}>
            {!isMobile && (
              <div style={{ position: 'absolute', top: 40, left: 100, right: 100, height: 2, backgroundColor: 'var(--primary)', opacity: 0.1 }} />
            )}
            {[
              { title: 'Application', desc: 'Become an approved member through our curated screening process.' },
              { title: 'Deal Access', desc: 'Secure early access to private investment opportunities on GRO8.' },
              { title: 'Execution', desc: 'Participate through streamlined SPVs with full digital legal compliance.' },
              { title: 'Portfolio Management', desc: 'Track your investments with real-time performance dashboards.' },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: isMobile ? 'center' : 'left', position: 'relative' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, marginBottom: 20, margin: isMobile ? '0 auto 20px' : '0 0 20px' }}>{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7 · CTA ═══ */}
      <section aria-label="Join 888VC" style={{ padding: isMobile ? '80px 0' : '120px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 568px', 
            gap: isMobile ? '40px' : '80px', 
            alignItems: 'center', 
            backgroundColor: 'var(--primary)', 
            borderRadius: 40, 
            padding: isMobile ? '50px 30px' : '80px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ color: 'white', position: 'relative', zIndex: 1, textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.7, marginBottom: 16 }}>JOIN 888VC NETWORK</div>
              <h2 style={{ fontSize: isSmallMobile ? '34px' : '38px', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Invest in the builders of tomorrow.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {['Direct access to private dealflow', 'Co-invest alongside Tier-1 VC funds', 'Comprehensive digital SPV structure'].map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                    <CheckCircle2 color="var(--secondary)" size={18} />
                    <span style={{ fontSize: 14, opacity: 0.9 }}>{l}</span>
                  </div>
                ))}
              </div>
              <button className="primary-btn" style={{ padding: '16px 40px', width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center' }}>Apply for Membership →</button>
            </div>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: isSmallMobile ? 240 : 400 }}>
              <img src={imgFooterHero} alt="888VC event cohort" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(29,47,111,0.2)' }} />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default InvestorsPage;
