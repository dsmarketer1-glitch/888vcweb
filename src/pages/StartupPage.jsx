import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Bot, ShoppingBag, HeartPulse, Recycle, Factory, Wallet, Cloud } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';

/* ─── CountUp — with reduced motion support ─── */
const CountUp = ({ value, prefix = '', suffix = '', isText = false }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || isText) return;
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
  }, [inView, value, isText, prefersReducedMotion]);

  if (isText) return <span ref={ref}>{prefix}{value}{suffix}</span>;
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

/* ─── WebImages Assets ─── */
const imgThumb  = '/assets/webimages/Startup/HERO/Thumb%201.jpg';
const imgThumb1 = '/assets/webimages/Startup/HERO/Thumb%202.jpg';
const imgThumb2 = '/assets/webimages/Startup/HERO/Thumb%203.jpg';
const imgGroupPhoto = '/assets/webimages/Startup/WHAT%20YOU%20GET/888vc%20Event.jpg';
const imgRohitHeadshot = '/assets/webimages/Startup/WHO%20SHOULD%20JOIN/Rohit%20Bafna.jpg';
const imgDemoDay = '/assets/webimages/Startup/WHO%20SHOULD%20JOIN/888vc1.jpg';
const imgNetworking = '/assets/webimages/Startup/WHO%20SHOULD%20JOIN/888vc2.jpg';

// Industry icons loaded via lucide-react

// Portfolio thumbs
const imgPF0 = '/assets/webimages/Startup/PORTFOLIO/Rooter.png';
const imgPF1 = '/assets/webimages/Startup/PORTFOLIO/G.O.A.T%20Brand%20Labs.png';
const imgPF2 = '/assets/webimages/Startup/PORTFOLIO/EcoRatings.png';
const imgPF3 = '/assets/webimages/Startup/PORTFOLIO/GetCrest%20ai.png';
const imgPF4 = '/assets/webimages/Startup/PORTFOLIO/Pick%20My%20Work.png';
const imgPF5 = '/assets/webimages/Startup/PORTFOLIO/Sanfe.png';

// Testimonial avatars
const imgTestA0 = '/assets/webimages/Startup/TESTIMONIALS/Aditi%20Balbir.png';
const imgTestA1 = '/assets/webimages/Startup/TESTIMONIALS/Rahul%20Vishwakarma.png';
const imgTestA2 = '/assets/webimages/Startup/TESTIMONIALS/Vidyarthi%20Baddireddy.png';

// Venture Partner photos
const imgVP0 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Dhairya%20Pujara.png';
const imgVP1 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Kush%20Vatsaraj.png';
const imgVP2 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Darshan%20Doshi.png';
const imgVP3 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Tripti%20Somani.png';
const imgVP4 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Nirav%20Mehta.png';
const imgVP5 = '/assets/webimages/Startup/VENTURE%20PARTNERS/Girish%20Ahirwar.png';

// Angel avatars
const imgAngel0 = '/assets/webimages/Startup/SUPER%20ANGELS/Akash%20Gupta.png';
const imgAngel1 = '/assets/webimages/Startup/SUPER%20ANGELS/Gaurav%20Mangla.png';
const imgAngel2 = '/assets/webimages/Startup/SUPER%20ANGELS/Dinesh%20Kumar.png';
const imgAngel3 = '/assets/webimages/Startup/SUPER%20ANGELS/Sripad%20Vaidya.png';

// Deco rings
// Replaced with CSS equivalents

/* ─── Data ─── */
const statsStrip = [
  { value: '50', suffix: '+', label: 'STARTUPS BACKED' },
  { value: '1', prefix: '$', suffix: 'Bn+', label: 'COMBINED VALUATION' },
  { value: '200', suffix: '+', label: 'VC FUND PARTNERS' },
  { value: '1000', suffix: '+', label: 'ANGELS & CXOS' },
  { value: '100', prefix: '$', suffix: 'Mn+', label: 'SYNDICATED' },
  { value: '12', suffix: ' Wks', label: 'ACCELERATOR LENGTH', isText: true },
];

const whatYouGet = [
  { title: 'Mentorship', desc: 'Connect with battle-tested founders, CXOs, and domain experts who have built category-defining companies.', sub: '1:1 Sessions · Office Hours · Expert Network' },
  { title: 'Accelerated Growth', desc: "A structured 12-week journey — MVP to market-ready. Learn from operators who've been through the scaling gauntlet.", sub: 'GTM Strategy · AI Tools · PMF' },
  { title: 'Investor Connect', desc: 'Direct access to 200+ VC funds, 1000+ angels, and family offices. Curated 1:1 introductions across India, US, and UAE.', sub: '200+ VCs · Demo Day · SPV Access' },
  { title: 'Ecosystem Access', desc: 'Workspace, legal support, accounting, and vendor credits. Warm introductions to strategic partners globally.', sub: 'Legal · Workspace · Vendor Credits' },
];

const phases = [
  { badge: 'Foundation', color: '#eb3a1b', weeks: '1–3', title: 'Strategy & Validation', desc: 'Define your ICP, validate your market, and build your AI-powered GTM playbook.', sub: 'Market Research · AI Tools · ICP' },
  { badge: 'Build', color: '#8b5cf6', weeks: '4–6', title: 'Product & Sales', desc: 'Optimize product-market fit and build your first repeatable sales process with AI agents.', sub: 'PMF · Sales Playbook · AI Agents' },
  { badge: 'Scale', color: '#10b981', weeks: '7–9', title: 'Finance & Operations', desc: 'Build financial models, set up governance, and prepare your investor-ready deck.', sub: 'Financial Model · Governance · Legal' },
  { badge: 'Launch', color: '#f59e0b', weeks: '10–12', title: 'Fundraising & Demo Day', desc: 'Refine your pitch, meet investors 1:1, and present at Demo Day to 200+ global investors.', sub: 'Pitch Prep · Investor 1:1s · Demo Day' },
];

const criteria = [
  { title: 'Early Traction', desc: 'Pre-seed or seed-stage with early market validation. You have a product in market and a clear GTM strategy.' },
  { title: 'Global Ambition', desc: 'You think beyond India from day one — US, UAE, and beyond. Cross-border scale is part of your thesis.' },
  { title: 'Tech-Driven', desc: 'Your startup uses technology to reimagine how value is created, exchanged, and distributed across markets.' },
  { title: 'Long-Term Mindset', desc: "We stay with you beyond 12 weeks. You're building something enduring, not just raising a round." },
];

const industries = [
  { title: 'Deep Tech', sub: 'Frontier science & engineering', icon: Cpu },
  { title: 'AI & ML', sub: 'Intelligent systems & automation', icon: Bot },
  { title: 'Consumer', sub: 'D2C, platforms & marketplaces', icon: ShoppingBag },
  { title: 'Healthtech', sub: 'Digital health & med-tech', icon: HeartPulse },
  { title: 'Sustainability', sub: 'Cleantech & climate solutions', icon: Recycle },
  { title: 'Manufacturing', sub: 'Industry 4.0 & supply chain', icon: Factory },
  { title: 'Fintech', sub: 'Payments, lending & wealth', icon: Wallet },
  { title: 'SaaS / B2B', sub: 'Enterprise software & tools', icon: Cloud },
];

const portfolio = [
  { name: 'Rooter', cat: 'Gaming · Series A', img: imgPF0 },
  { name: 'G.O.A.T Brand Labs', cat: 'D2C · Soonicorn', img: imgPF1 },
  { name: 'EcoRatings', cat: 'ESG / AI', img: imgPF2 },
  { name: 'getcrest.ai', cat: 'AI · Supply Chain', img: imgPF3 },
  { name: 'PickMyWork', cat: 'Gig Economy', img: imgPF4 },
];

const testimonials = [
  { company: 'EcoRatings', cat: 'ESG / AI', quote: 'We are grateful to 888vc for investing in us and building our fund raise. They brought in much needed guidance and great connects through their network.', author: 'Aditi Balbir', role: 'Co-Founder, EcoRatings', avatar: imgTestA0 },
  { company: 'getcrest.ai', cat: 'AI · Supply Chain', quote: '888 not only provided us with funds but much needed mentorship and guidance. The team genuinely goes above and beyond for their portfolio companies.', author: 'Rahul Vishwakarma', role: 'Founder, getcrest.ai', avatar: imgTestA1 },
  { company: 'PickMyWork', cat: 'Gig Economy', quote: 'We got the pleasure to meet 888vc, who assisted us by participating in our first round of fundraising and constructing the entire round for us.', author: 'Vidyarthi Baddireddy', role: 'Founder, PickMyWork', avatar: imgTestA2 },
];

const venturePartners = [
  { name: 'Dhairya Pujara', role: 'Founder & CEO, Ycenter', bio: 'Serving clients across 30+ countries. WEF Global Shaper. Regional Head for GODAN North America.', img: imgVP0 },
  { name: 'Kush Vatsaraj', role: 'Venture Partner, 888vc', bio: 'International Tax, Transfer Pricing, FEMA & Business Advisory. IFA Leadership (India & APAC).', img: imgVP1 },
  { name: 'Darshan Doshi', role: 'Venture Partner, 888vc', bio: "MBA from ISB (Dean's List), CA, Company Secretary AIR 25, CFA Level II. Finance & governance expert.", img: imgVP2 },
  { name: 'Tripti Somani', role: 'CA, Founder, Womennovator', bio: 'Times 40 Under 40, ET Inspiring Women Leader. Former PwC India. Investor and ecosystem builder.', img: imgVP3 },
  { name: 'Nirav Mehta', role: 'Material Science & IP Expert', bio: 'Nanosafe & Patent Partners — translating advanced research into protected commercial innovations.', img: imgVP4 },
  { name: 'Girish Ahirwar', role: 'Founder & CEO, Maxtron Innovations', bio: 'Serial entrepreneur with 2 exits. Angel investor focused on empowering humans through emerging tech.', img: imgVP5 },
];

const angels = [
  { name: 'Akash Gupta', role1: 'Co-Founder & CEO', role2: 'Zypp Electric', img: imgAngel0 },
  { name: 'Gaurav Mangla', role1: 'CEO & Co-Founder', role2: 'Pickrr', img: imgAngel1 },
  { name: 'Dinesh Kumar', role1: 'CEO, Ixigo Trains', role2: '& Confirmtkt', img: imgAngel2 },
  { name: 'Sripad Vaidya', role1: 'COO, Ixigo Trains', role2: '& Confirmtkt', img: imgAngel3 },
];

/* ─── COMPONENT ─── */
import useIsMobile from '../hooks/useIsMobile';

const StartupPage = () => {
  usePageTitle('For Startups — 888VC');
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  return (
    <main id="main-content" role="main" style={{ backgroundColor: 'white' }}>

      {/* ═══ 1 · HERO ═══ */}
      <section aria-label="Startup program overview" style={{ backgroundColor: '#f0f4fb', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative rings — aria-hidden */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 520, height: 520, right: -30, top: -150, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 380, height: 380, right: 40, top: -80, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 220, height: 220, right: 120, top: 20, opacity: 0.1, border: '2px solid var(--secondary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 200, height: 200, left: -60, bottom: -40, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 572px', gap: isMobile ? '40px' : 40, alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ backgroundColor: 'rgba(235,58,27,0.1)', display: 'inline-block', padding: '6px 20px', borderRadius: 15, marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)' }}>888VC × GRO8 AI-ENABLED ACCELERATOR</span>
            </div>
            {/* WCAG fix: merged duplicate H1 into single H1 with span for color */}
            <h1 style={{ fontSize: isSmallMobile ? '38px' : (isMobile ? '48px' : 68), fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              <span style={{ color: 'var(--primary)', display: 'block' }}>Built for Founders</span>
              <span style={{ color: 'var(--secondary)' }}>Who Build Beyond.</span>
            </h1>
            {/* WCAG fix: #6878a8 → var(--text-secondary) */}
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 580, marginBottom: 32 }}>
              The 888vc × GRO8 AI-Enabled 12-Week Venture Accelerator — integrating capital, mentorship, and global networks to take your startup from product to scale.
            </p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <button className="primary-btn" style={{ padding: '12px 28px', fontSize: 15 }}>Apply Now →</button>
              <button style={{ backgroundColor: '#eef1f9', color: 'var(--primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', minHeight: '44px' }}>View the Program</button>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['12 Weeks', 'India × US × UAE', 'AI-Enabled', 'Demo Day: 200+ Investors'].map((b, i) => (
                <div key={i} style={{ backgroundColor: 'white', padding: '6px 16px', borderRadius: 14, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{b}</div>
              ))}
            </div>
          </motion.div>

          {/* Right — Cards */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mobile-grid-1"
            style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr', gap: 14 }}
          >
            {/* Demo Day card — wide */}
            <div style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ height: 120, overflow: 'hidden' }}><img src={imgThumb} alt="Demo Day 2024 — 200+ global investors" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '10px 17px 14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>GRO8 ACCELERATOR</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>Demo Day 2024 — 200+ Global Investors, India × US × UAE</div>
              </div>
            </div>
            {/* Two small cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { img: imgThumb1, tag: 'MENTORSHIP', title: 'Weekly CXO & Founder Sessions' },
                { img: imgThumb2, tag: 'INVESTOR ACCESS', title: '1:1 Curated VC Introductions' },
              ].map((c, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ height: 120, overflow: 'hidden' }}><img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ padding: '8px 13px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>{c.tag}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{c.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2 · STATS STRIP ═══ */}
      <section aria-label="Key statistics" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '40px 0' : '36px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'), gap: '24px', alignItems: 'center' }}>
          {statsStrip.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isSmallMobile ? '28px' : 34, fontWeight: 800, color: 'white' }}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} isText={s.isText} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'white', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 · WHAT YOU GET ═══ */}
      <section aria-label="Program benefits" style={{ padding: isMobile ? '60px 0' : '80px 72px' }}>
        <div className="container responsive-stack" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '620px 1fr', gap: isMobile ? '40px' : 60, alignItems: 'start' }}>
          <div>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHAT YOU GET</div>
            <h2 className="text-navy" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3, marginBottom: 16 }}>
              Everything a founder needs,<br />in one program.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 40 }}>
              Capital, community, connections, and operational support — built into a structured 12-week journey designed for global scale.
            </p>
            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              {whatYouGet.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ backgroundColor: '#f5f7fc', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, padding: '14px 19px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'var(--primary)', flexShrink: 0 }} aria-hidden="true" />
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{w.title}</h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{w.desc}</p>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>{w.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Image with badge */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', height: 496 }}>
              <img src={imgGroupPhoto} alt="GRO8 accelerator cohort group photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -20, right: -16, backgroundColor: 'var(--secondary)', borderRadius: 14, padding: '10px 20px', color: 'white' }}>
              <div style={{ fontSize: 28, fontWeight: 800 }}>50+</div>
              <div style={{ fontSize: 12 }}>Alumni Startups</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · 12-WEEK PROGRAM ═══ */}
      <section aria-label="12-week accelerator program" style={{ backgroundColor: '#f5f7fc', padding: '60px 72px 80px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>THE 12-WEEK JOURNEY</div>
          <h2 className="text-navy" style={{ fontSize: 38, fontWeight: 800, marginBottom: 12 }}>Our GRO8 Accelerator Program</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48, maxWidth: 860 }}>
            888vc × GRO8 AI-Enabled Venture Accelerator — integrating AI into daily startup operations, from Strategy and Sales to Finance, Product, and Fundraising.
          </p>

          {/* Timeline line */}
          <div style={{ position: 'relative' }}>
            {!isMobile && <div style={{ position: 'absolute', top: 46, left: 86, right: 86, height: 2, backgroundColor: '#eb3a1b', opacity: 0.35 }} aria-hidden="true" />}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
              {phases.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 18, padding: 15, position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                      <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{p.weeks}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>Weeks {p.weeks}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 6, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>{p.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5 · WHO SHOULD JOIN ═══ */}
      <section aria-label="Selection criteria" style={{ padding: isMobile ? '60px 0' : '40px 72px 80px' }}>
        <div className="container responsive-stack" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '620px 1fr', gap: isMobile ? '40px' : 40, alignItems: 'start' }}>
          <div>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHO SHOULD JOIN</div>
            <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>
              Built for founders ready<br />to go global.
            </h2>
            <p style={{ fontSize: 16, color: '#000', marginBottom: 28 }}>
              We back ambitious founders using technology to build companies with global potential.
            </p>

            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {criteria.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ backgroundColor: '#f5f7fc', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 14, padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: 'rgba(235,58,27,0.12)', flexShrink: 0 }} aria-hidden="true" />
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{c.title}</h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--primary)', lineHeight: 1.5 }}>{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <button className="primary-btn" style={{ padding: '10px 28px', fontSize: 14 }}>Apply for Next Cohort →</button>
          </div>

          <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : '264px 1fr'), gap: 16, height: isMobile ? 'auto' : 492 }}>
            <div style={{ borderRadius: 18, overflow: 'hidden' }}>
              <img src={imgRohitHeadshot} alt="Rohit Bafna, 888VC founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ borderRadius: 18, overflow: 'hidden', flex: 1 }}>
                <img src={imgDemoDay} alt="GRO8 Demo Day event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ borderRadius: 18, overflow: 'hidden', flex: 1 }}>
                <img src={imgNetworking} alt="Networking session with investors" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6 · INDUSTRIES ═══ */}
      <section aria-label="Industries we invest in" style={{ backgroundColor: 'var(--primary)', padding: '80px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.06, pointerEvents: 'none' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'white' }} />)}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 12 }}>OUR COHORTS</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Industries we back.</h2>
          <p style={{ fontSize: 15, color: 'white', opacity: 0.7, marginBottom: 40, maxWidth: 760 }}>
            Tech-enabled sectors shaping demand in consumer and enterprise markets worldwide.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
            {industries.map((ind, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -6 }}
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '19px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                  <ind.icon color="white" size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4, margin: 0 }}>{ind.title}</h3>
                  <div style={{ fontSize: 12, color: 'white', opacity: 0.65 }}>{ind.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7 · PORTFOLIO ═══ */}
      <section aria-label="Portfolio companies" style={{ backgroundColor: 'var(--primary)', padding: '80px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'white' }} />)}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 12 }}>OUR PORTFOLIO</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Startups we've helped scale.</h2>
          <p style={{ fontSize: 16, color: 'white', opacity: 0.7, marginBottom: 40, maxWidth: 740 }}>
            50+ companies backed — from seed to Series A. These are the builders defining tomorrow.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
            {portfolio.map((p, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -6 }}
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ height: 140, overflow: 'hidden' }}>
                  <img src={p.img} alt={`${p.name} — ${p.cat}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '12px 15px 14px' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: 0 }}>{p.name}</h3>
                  <div style={{ fontSize: 11, color: 'white', opacity: 0.65, marginTop: 2 }}>{p.cat}</div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Bottom row */}
          <div className="responsive-stack" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '284px 1fr', gap: 16 }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 140, overflow: 'hidden' }}>
                <img src={imgPF4} alt="PickMyWork — Gig Economy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px 15px 14px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>PickMyWork</div>
                <div style={{ fontSize: 11, color: 'white', opacity: 0.65, marginTop: 2 }}>Gig Economy</div>
              </div>
            </div>
            <Link to="/portfolio" aria-label="View full portfolio of 50+ companies" style={{ display: 'block' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, overflow: 'hidden', height: '100%' }}>
                <div style={{ height: 140, overflow: 'hidden' }}>
                  <img src={imgPF5} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '8px 15px 14px' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>50+ Companies →</div>
                  <div style={{ fontSize: 11, color: 'white', opacity: 0.65, marginTop: 2 }}>View Full Portfolio</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 8 · TESTIMONIALS ═══ */}
      <section aria-label="Founder testimonials" style={{ backgroundColor: '#f5f7fc', padding: '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>FOUNDER STORIES</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>What our founders say.</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 740 }}>
            From seed to Series A — here's what happens when ambition meets the right community.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 18, padding: 19 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <img src={t.avatar} alt={`Photo of ${t.author}`} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{t.company}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)' }}>{t.cat}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--secondary)', marginBottom: 8 }} aria-hidden="true">★★★★★</div>
                <blockquote style={{ margin: 0, padding: 0, border: 'none' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>"{t.quote}"</p>
                </blockquote>
                <footer>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}><cite style={{ fontStyle: 'normal' }}>{t.role}</cite></div>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9 · VENTURE PARTNERS ═══ */}
      <section aria-label="Venture partners" style={{ padding: '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>OUR VENTURE PARTNERS</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>World-class experts in your corner.</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 852 }}>
            Operators, domain experts, and serial entrepreneurs — deeply embedded in the 888vc network.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
            {venturePartners.map((vp, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -6 }}
                style={{ backgroundColor: '#f5f7fc', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ height: 184, overflow: 'hidden' }}>
                  <img src={vp.img} alt={`Photo of ${vp.name}, ${vp.role}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '10px 15px 16px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{vp.name}</h3>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)', marginTop: 2 }}>{vp.role}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 8 }}>{vp.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10 · SUPER ANGELS ═══ */}
      <section aria-label="Super angels and CXO investors" style={{ backgroundColor: '#f5f7fc', padding: '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>OUR NETWORK</div>
          <h2 className="text-navy" style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Super Angels & CXOs Investing With Us</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40 }}>
            Industry leaders who bring capital and connections to every deal.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 22 }}>
            {angels.map((a, i) => (
              <motion.div key={i} whileHover={prefersReducedMotion ? {} : { y: -6 }}
                style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, padding: '13px 16px 18px', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px' }}>
                  <img src={a.img} alt={`Photo of ${a.name}, ${a.role1} ${a.role2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{a.name}</h3>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--secondary)', marginTop: 4, lineHeight: 1.3 }}>{a.role1}<br />{a.role2}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StartupPage;
