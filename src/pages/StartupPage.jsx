import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Bot, ShoppingBag, HeartPulse, Recycle, Factory, Wallet, Cloud } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';
import useIsMobile from '../hooks/useIsMobile';

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

/* ─── Data ─── */
const statsStrip = [
  { value: '50', suffix: '+', label: 'STARTUPS' },
  { value: '1', prefix: '$', suffix: 'Bn+', label: 'VALUATION' },
  { value: '200', suffix: '+', label: 'VC FUNDS' },
  { value: '1000', suffix: '+', label: 'ANGEL MEMBERS' },
  { value: '100', prefix: '$', suffix: 'Mn+', label: 'SYNDICATED' },
  { value: '12', suffix: ' Wks', label: 'LENGTH', isText: true },
];

const whatYouGet = [
  { title: 'Mentorship', desc: 'Connect with battle-tested founders, CXOs, and domain experts who have built category-defining companies.', sub: '1:1 Sessions · Office Hours' },
  { title: 'Accelerated Growth', desc: "A structured 12-week journey — MVP to market-ready. Learn from operators who've been through it.", sub: 'GTM Strategy · AI Tools · PMF' },
  { title: 'Investor Connect', desc: 'Direct access to 200+ VC funds, 1000+ angels. Curated 1:1 introductions across India, US, and UAE.', sub: '200+ VCs · Demo Day' },
  { title: 'Ecosystem Access', desc: 'Workspace, legal support, and vendor credits. Warm introductions to strategic partners globally.', sub: 'Legal · Vendor Credits' },
];

const phases = [
  { badge: 'Foundation', color: '#eb3a1b', weeks: '1–3', title: 'Strategy & Validation', desc: 'Define your ICP, validate your market, and build your AI-powered GTM playbook.', sub: 'Market Research · AI Tools' },
  { badge: 'Build', color: '#8b5cf6', weeks: '4–6', title: 'Product & Sales', desc: 'Optimize product-market fit and build your first repeatable sales process with AI agents.', sub: 'PMF · Sales Playbook' },
  { badge: 'Scale', color: '#10b981', weeks: '7–9', title: 'Finance & Operations', desc: 'Build financial models, set up governance, and prepare your investor-ready deck.', sub: 'Financial Model · Legal' },
  { badge: 'Launch', color: '#f59e0b', weeks: '10–12', title: 'Fundraising & Demo Day', desc: 'Refine your pitch, meet investors 1:1, and present at Demo Day to 200+ global investors.', sub: 'Investor 1:1s · Demo Day' },
];

const criteria = [
  { title: 'Early Traction', desc: 'Pre-seed or seed-stage with early market validation. You have a clear GTM strategy.' },
  { title: 'Global Ambition', desc: 'You think beyond India from day one — US, UAE, and beyond.' },
  { title: 'Tech-Driven', desc: 'Your startup uses technology to reimagine how value is created and exchanged.' },
  { title: 'Long-Term Mindset', desc: "We stay with you beyond 12 weeks. You're building something enduring." },
];

const industries = [
  { title: 'Deep Tech', sub: 'Frontier science', icon: Cpu },
  { title: 'AI & ML', sub: 'Intelligent automation', icon: Bot },
  { title: 'Consumer', sub: 'D2C & marketplaces', icon: ShoppingBag },
  { title: 'Healthtech', sub: 'Digital health', icon: HeartPulse },
  { title: 'Sustainability', sub: 'Climate solutions', icon: Recycle },
  { title: 'Manufacturing', sub: 'Industry 4.0', icon: Factory },
  { title: 'Fintech', sub: 'Payments & wealth', icon: Wallet },
  { title: 'SaaS / B2B', sub: 'Enterprise tools', icon: Cloud },
];

const portfolio = [
  { name: 'Rooter', cat: 'Gaming · Series A', img: imgPF0 },
  { name: 'G.O.A.T Brand Labs', cat: 'D2C · Soonicorn', img: imgPF1 },
  { name: 'EcoRatings', cat: 'ESG / AI', img: imgPF2 },
  { name: 'getcrest.ai', cat: 'AI · Supply Chain', img: imgPF3 },
  { name: 'PickMyWork', cat: 'Gig Economy', img: imgPF4 },
];

const testimonials = [
  { company: 'EcoRatings', cat: 'ESG / AI', quote: 'We are grateful to 888vc for investing in us and building our fund raise. They brought in much needed guidance.', author: 'Aditi Balbir', role: 'Co-Founder, EcoRatings', avatar: imgTestA0 },
  { company: 'getcrest.ai', cat: 'AI · Supply Chain', quote: '888 not only provided us with funds but much needed mentorship. The team goes above and beyond.', author: 'Rahul Vishwakarma', role: 'Founder, getcrest.ai', avatar: imgTestA1 },
  { company: 'PickMyWork', cat: 'Gig Economy', quote: 'We got the pleasure to meet 888vc, who assisted us by participating in our first round and constructing the entire round.', author: 'Vidyarthi Baddireddy', role: 'Founder, PickMyWork', avatar: imgTestA2 },
];

const venturePartners = [
  { name: 'Dhairya Pujara', role: 'Founder & CEO, Ycenter', bio: 'Serving clients across 30+ countries. WEF Global Shaper.', img: imgVP0 },
  { name: 'Kush Vatsaraj', role: 'Venture Partner, 888vc', bio: 'International Tax, Transfer Pricing, FEMA & Business Advisory.', img: imgVP1 },
  { name: 'Darshan Doshi', role: 'Venture Partner, 888vc', bio: "MBA from ISB, CA, Company Secretary AIR 25. Finance expert.", img: imgVP2 },
  { name: 'Tripti Somani', role: 'CA, Founder, Womennovator', bio: 'Times 40 Under 40. Former PwC India. Ecosystem builder.', img: imgVP3 },
  { name: 'Nirav Mehta', role: 'Material Science & IP Expert', bio: 'Nanosafe — translating research into commercial innovations.', img: imgVP4 },
  { name: 'Girish Ahirwar', role: 'Founder & CEO, Maxtron', bio: 'Serial entrepreneur with 2 exits. Angel investor.', img: imgVP5 },
];

const angels = [
  { name: 'Akash Gupta', role1: 'Co-Founder & CEO', role2: 'Zypp Electric', img: imgAngel0 },
  { name: 'Gaurav Mangla', role1: 'CEO & Co-Founder', role2: 'Pickrr', img: imgAngel1 },
  { name: 'Dinesh Kumar', role1: 'CEO, Ixigo Trains', role2: '& Confirmtkt', img: imgAngel2 },
  { name: 'Sripad Vaidya', role1: 'COO, Ixigo Trains', role2: '& Confirmtkt', img: imgAngel3 },
];

/* ─── COMPONENT ─── */
const StartupPage = () => {
  usePageTitle('For Startups — 888VC');
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);

  return (
    <main id="main-content" role="main" style={{ backgroundColor: 'white', width: '100%', overflowX: 'hidden' }}>

      {/* ═══ 1 · HERO ═══ */}
      <section aria-label="Startup program overview" style={{ backgroundColor: '#f0f4fb', padding: isMobile ? '80px 0 60px' : '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', width: isSmallMobile ? 300 : 520, height: isSmallMobile ? 300 : 520, right: -30, top: -150, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 200, height: 200, left: -60, bottom: -40, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 572px', 
            gap: isMobile ? '40px' : '60px', 
            alignItems: 'start' 
          }}>
            {/* Left */}
            <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ backgroundColor: 'rgba(235,58,27,0.1)', display: 'inline-block', padding: '6px 20px', borderRadius: 15, marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)' }}>888VC × GRO8 AI-ENABLED ACCELERATOR</span>
              </div>
              <h1 style={{ 
                fontSize: isSmallMobile ? '38px' : (isMobile ? '52px' : '68px'), 
                fontWeight: 800, 
                lineHeight: 1.1, 
                marginBottom: 24,
                wordWrap: 'break-word'
              }}>
                <span style={{ color: 'var(--primary)', display: 'block' }}>Built for Founders</span>
                <span style={{ color: 'var(--secondary)' }}>Who Build Beyond.</span>
              </h1>
              <p style={{ fontSize: isSmallMobile ? '16px' : '17px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 580, marginBottom: 32 }}>
                The 888vc × GRO8 AI-Enabled 12-Week Venture Accelerator — integrating capital, mentorship, and global networks to take your startup from product to scale.
              </p>
              <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                <button className="primary-btn" style={{ width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center' }}>Apply Now →</button>
                <button style={{ backgroundColor: '#eef1f9', color: 'var(--primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', minHeight: '44px', width: isSmallMobile ? '100%' : 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>View the Program</button>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['12 Weeks', 'India × US × UAE', 'AI-Enabled', 'Demo Day: 200+ VCs'].map((b, i) => (
                  <div key={i} style={{ backgroundColor: 'white', padding: '6px 16px', borderRadius: 14, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{b}</div>
                ))}
              </div>
            </motion.div>

            {/* Right — Cards */}
            <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ height: isSmallMobile ? 120 : 140, overflow: 'hidden' }}><img src={imgThumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ padding: '12px 17px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>GRO8 ACCELERATOR</div>
                  <div style={{ fontSize: isSmallMobile ? '13px' : '14px', fontWeight: 700, color: 'var(--primary)' }}>Demo Day 2024 — 200+ Global Investors</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { img: imgThumb1, tag: 'MENTORSHIP', title: 'CXO Sessions' },
                  { img: imgThumb2, tag: 'INVESTOR', title: '1:1 VC Intros' },
                ].map((c, i) => (
                  <div key={i} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ height: 100, overflow: 'hidden' }}><img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: '10px 13px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>{c.tag}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{c.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 2 · STATS STRIP ═══ */}
      <section aria-label="Key statistics" style={{ backgroundColor: 'var(--primary)', padding: '36px 0' }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'),
          gap: '24px 16px',
          justifyItems: 'center',
          alignItems: 'center'
        }}>
          {statsStrip.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isSmallMobile ? '28px' : '34px', fontWeight: 800, color: 'white' }}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} isText={s.isText} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 500, color: 'white', opacity: 0.8, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 · WHAT YOU GET ═══ */}
      <section aria-label="Program benefits" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '620px 1fr', 
            gap: isMobile ? '40px' : '60px', 
            alignItems: 'start' 
          }}>
            <div>
              <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHAT YOU GET</div>
              <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : (isMobile ? '36px' : '42px'), fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                Everything a founder needs,<br className="hidden-mobile" />in one program.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 40, maxWidth: 600 }}>
                Capital, community, connections, and operational support — built into a structured 12-week journey designed for global scale.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
                {whatYouGet.map((w, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    style={{ backgroundColor: '#f5f7fc', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, padding: '20px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{w.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{w.desc}</p>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)' }}>{w.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Image with badge */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', height: isMobile ? 320 : 496 }}>
                <img src={imgGroupPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -15, right: -10, backgroundColor: 'var(--secondary)', borderRadius: 14, padding: '12px 20px', color: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>50+</div>
                <div style={{ fontSize: 10, fontWeight: 700 }}>Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · 12-WEEK PROGRAM ═══ */}
      <section aria-label="12-week accelerator program" style={{ backgroundColor: '#f5f7fc', padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: 48 }}>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>THE 12-WEEK JOURNEY</div>
            <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : '38px', fontWeight: 800, marginBottom: 12 }}>Our GRO8 Accelerator Program</h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 800, margin: isMobile ? '0 auto' : '0' }}>
              888vc × GRO8 AI-Enabled Venture Accelerator — integrating AI into daily startup operations.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), 
            gap: 22, 
            position: 'relative' 
          }}>
            {!isMobile && (
              <div style={{ position: 'absolute', top: 30, left: 100, right: 100, height: 2, backgroundColor: '#eb3a1b', opacity: 0.15 }} />
            )}
            {phases.map((p, i) => (
              <motion.div key={i} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 20, padding: 20, position: 'relative' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, marginBottom: 16, margin: isMobile ? '0 auto 16px' : '0 0 16px' }}>{i + 1}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>Weeks {p.weeks}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', opacity: 0.7 }}>{p.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 · WHO SHOULD JOIN ═══ */}
      <section aria-label="Selection criteria" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '620px 1fr', 
            gap: isMobile ? '40px' : '60px', 
            alignItems: 'start' 
          }}>
            <div>
              <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHO SHOULD JOIN</div>
              <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : (isMobile ? '36px' : '42px'), fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
                Built for founders ready<br className="hidden-mobile" />to go global.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32 }}>
                We back ambitious founders using technology to build companies with global potential.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
                {criteria.map((c, i) => (
                  <div key={i} style={{ backgroundColor: '#f5f7fc', borderRadius: 14, padding: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{c.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                ))}
              </div>

              <button className="primary-btn" style={{ padding: '16px 40px', width: isSmallMobile ? '100%' : 'auto', justifyContent: 'center' }}>Apply for Next Cohort →</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', gridRow: 'span 2' }}>
                <img src={imgRohitHeadshot} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 160 }}>
                <img src={imgDemoDay} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 160 }}>
                <img src={imgNetworking} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6 · INDUSTRIES ═══ */}
      <section aria-label="Industries we invest in" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '80px 0' : '100px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'white', opacity: 0.7, marginBottom: 12 }}>OUR COHORTS</div>
            <h2 style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, color: 'white' }}>Industries we back.</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'), 
            gap: isSmallMobile ? '12px' : '20px' 
          }}>
            {industries.map((ind, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: isSmallMobile ? '15px' : '20px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <ind.icon color="white" size={20} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{ind.title}</h3>
                <div style={{ fontSize: 11, color: 'white', opacity: 0.6 }}>{ind.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7 · PORTFOLIO ═══ */}
      <section aria-label="Portfolio companies" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary)', marginBottom: 12 }}>OUR PORTFOLIO</div>
            <h2 style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800, color: 'var(--primary)' }}>Startups we've helped scale.</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'), 
            gap: 16 
          }}>
            {portfolio.map((p, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 16, overflow: 'hidden' }}>
                <img src={p.img} alt="" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ padding: '12px 15px' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>{p.name}</h3>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.cat}</div>
                </div>
              </div>
            ))}
            <Link to="/portfolio" style={{ display: 'block', backgroundColor: 'var(--secondary)', borderRadius: 16, padding: '20px', color: 'white', textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>50+</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Companies →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 8 · TESTIMONIALS ═══ */}
      <section aria-label="Founder testimonials" style={{ backgroundColor: '#f5f7fc', padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: 40 }}>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>FOUNDER STORIES</div>
            <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800 }}>What our founders say.</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), 
            gap: 22 
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid rgba(29,47,111,0.1)', borderRadius: 20, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={t.avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{t.company}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--secondary)' }}>{t.cat}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 20 }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9 · VENTURE PARTNERS ═══ */}
      <section aria-label="Venture partners" style={{ padding: isMobile ? '80px 0' : '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: 40 }}>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>OUR VENTURE PARTNERS</div>
            <h2 className="text-navy" style={{ fontSize: isSmallMobile ? '30px' : '36px', fontWeight: 800 }}>World-class experts.</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? 'repeat(2, 1fr)' : (isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'), 
            gap: isSmallMobile ? '12px' : '20px' 
          }}>
            {venturePartners.map((vp, i) => (
              <div key={i} style={{ backgroundColor: '#f5f7fc', borderRadius: 16, overflow: 'hidden' }}>
                <img src={vp.img} alt="" style={{ width: '100%', height: isSmallMobile ? 140 : 180, objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ padding: '12px' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>{vp.name}</h3>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--secondary)' }}>{vp.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default StartupPage;
