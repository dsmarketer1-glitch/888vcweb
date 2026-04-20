import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Users, Target, FileText, UserPlus, Building, Briefcase, Award, TrendingUp, DollarSign, Handshake } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import useReducedMotion from '../hooks/useReducedMotion';

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
    const step = end / (2000 / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= end) { setDisplay(end); clearInterval(id); }
      else setDisplay(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, value, prefersReducedMotion]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

/* ─── Figma Assets ─── */
// Deco rings have been replaced with CSS
const imgAngel1 = '/assets/webimages/Investors/SUPER%20ANGELS/Akash%20Gupta.png';
const imgAngel2 = '/assets/webimages/Investors/SUPER%20ANGELS/Gaurav%20Mangla.png';
const imgAngel3 = '/assets/webimages/Investors/SUPER%20ANGELS/Dinesh%20Kumar.png';
const imgAngel4 = '/assets/webimages/Investors/SUPER%20ANGELS/Sripad%20Vaidya.png';

/* ─── Data ─── */
const statsStrip = [
  { value: '50', suffix: '+', label: 'STARTUPS INVESTED' },
  { value: '1', prefix: '$', suffix: 'Bn+', label: 'COMBINED VALUATION' },
  { value: '200', suffix: '+', label: 'SEED/EARLY VC FUNDS' },
  { value: '1000', suffix: '+', label: 'ANGELS & CXOS' },
  { value: '100', suffix: '+', label: 'CXOS FROM THE US' },
  { value: '50', suffix: '+', label: 'FAMILY OFFICES' },
];

const whyCards = [
  { title: 'US–India Ecosystem', desc: 'A true cross-border accelerator between India and the US — fast-tracking global transitions for Indian startups into the Silicon Valley ecosystem, with seed capital, mentorship, and infrastructure.', icon: Globe, dark: true },
  { title: 'CXO Network Access', desc: 'Our CXO Network connects founders with leaders and decision-makers across industries — delivering early access to talent, business partnerships, and market intelligence from 1000+ senior operators.', icon: Users, dark: false },
  { title: 'Quality Deal Flow', desc: 'Every startup in our pipeline is handpicked and undergoes initial due diligence by industry experts. You invest only in pre-vetted, high-conviction deals — not random inbound.', icon: Target, dark: false },
  { title: 'Syndicate SPV Structure', desc: 'Invest alongside a curated group through our Syndicate SPV model. Dollar-based Feeder Offshore Syndicate structure streamlines cross-border investments with clean documentation and governance.', icon: FileText, dark: false },
];

const steps = [
  { num: '01', title: 'Join the Network', desc: 'Apply to join as an investor. We review your profile and match you with deal flow relevant to your sector interests and ticket size.' },
  { num: '02', title: 'Access Deal Flow', desc: 'Receive curated pitch decks and DD summaries for pre-vetted startups. Attend exclusive pitch days with live Q&A and founder meetings.' },
  { num: '03', title: 'Invest via SPV', desc: 'Participate in deals through our clean Syndicate SPV structure. Dollar-based feeder syndicate available for cross-border participation.' },
  { num: '04', title: 'Track & Grow', desc: 'Monitor your portfolio with regular updates. Participate in follow-on rounds and secondary market access as the portfolio scales.' },
];

const investorTypes = [
  { title: 'Angel Investors', desc: 'First-time or seasoned angels looking for structured, co-invested deal flow. Benefit from our full due diligence infrastructure and group investing power.', tag: 'Min: $25K ticket', icon: UserPlus },
  { title: 'Family Offices', desc: "Access diversified early-stage exposure across India's most dynamic tech sectors with cross-border portfolio potential into US and UAE markets.", tag: 'Multi-deal exposure', icon: Building },
  { title: 'VC Funds', desc: "Seed and early-stage fund managers looking for co-investment opportunities, LP introductions, and access to India's most promising pre-IPO pipeline.", tag: 'Co-investment deals', icon: Briefcase },
  { title: 'CXOs & Operators', desc: "Senior operators who want to back founders with both capital and expertise. Our GRO8 Club is your community of India's most senior value-add investors.", tag: 'Value-add capital', icon: Award },
];

const sectors = ['Deep Tech', 'AI & ML', 'Consumer', 'Healthtech', 'Sustainability', 'Manufacturing', 'Fintech', 'SaaS / B2B'];

const testimonials = [
  { company: 'EcoRatings', quote: 'We are grateful to 888vc for investing in us and building our fund raise. They brought in much needed guidance and great connects through their network.', author: 'Aditi Balbir', role: 'Co-Founder, EcoRatings' },
  { company: 'getcrest.ai', quote: '888 not only provided us with funds but much needed mentorship and guidance. The team genuinely goes above and beyond for their portfolio companies.', author: 'Rahul Vishwakarma', role: 'Founder, getcrest.ai' },
  { company: 'PickMyWork', quote: 'We got the pleasure to meet 888vc, who assisted us by participating in our first round of fundraising and constructing the entire round for us.', author: 'Vidyarthi Baddireddy', role: 'Founder, PickMyWork' },
];

const angels = [
  { name: 'Akash Gupta', role: 'Co-Founder & CEO, Zypp Electric', img: imgAngel1 },
  { name: 'Gaurav Mangla', role: 'CEO & Co-Founder, Pickrr', img: imgAngel2 },
  { name: 'Dinesh Kumar', role: 'CEO, Ixigo Trains & Confirmtkt', img: imgAngel3 },
  { name: 'Sripad Vaidya', role: 'COO, Ixigo Trains & Confirmtkt', img: imgAngel4 },
];

const sectorColors = ['#eb3a1b', '#1d2f6f', '#2aa86b', '#e67e22', '#9b59b6', '#3498db', '#e74c3c', '#1abc9c'];

/* ═══════════════════════════════ COMPONENT ═══════════════════════════════ */

const InvestorsPage = () => {
  usePageTitle('For Investors — 888VC');
  const prefersReducedMotion = useReducedMotion();
  const pageRef = useRef(null);

  return (
    <main id="main-content" role="main" ref={pageRef} style={{ backgroundColor: 'white' }}>

      {/* ──────────────── 1 · HERO BANNER ──────────────── */}
      <section aria-label="Investor overview" style={{ backgroundColor: '#f0f4fb', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Deco Rings — decorative */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 520, height: 520, right: -40, top: -130, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 380, height: 380, right: 30, top: -60, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 220, height: 220, right: 110, top: 20, opacity: 0.1, border: '2px solid var(--secondary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 200, height: 200, left: -60, bottom: -40, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 480px', gap: '60px', alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ backgroundColor: 'rgba(235,58,27,0.1)', display: 'inline-block', padding: '6px 20px', borderRadius: 15, marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>INVEST IN INDIA'S NEXT WAVE</span>
            </div>

            {/* WCAG fix: merged duplicate H1 into single H1 with spans */}
            <h1 style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              <span style={{ color: 'var(--primary)', display: 'block' }}>Back the builders</span>
              <span style={{ color: 'var(--secondary)' }}>defining tomorrow.</span>
            </h1>

            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 668, marginBottom: 32 }}>
              Connect with enthusiastic innovators who are ambitious to break conformity and redesign the rules for the new world using tech — through 888vc's curated deal flow, co-investment infrastructure, and cross-border network.
            </p>

            <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
              <button className="primary-btn" style={{ padding: '12px 28px', fontSize: 15 }}>Join as Investor →</button>
              <button style={{ backgroundColor: '#eef1f9', color: 'var(--primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', minHeight: '44px' }}>
                Explore GRO8 Club
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ borderTop: '1px solid rgba(29,47,111,0.12)', paddingTop: 16 }}>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {['Syndicate SPV structure', 'India × US cross-border', 'Start from $25K per deal'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'var(--secondary)' }} aria-hidden="true" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Stat Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
            {[
              { val: '50', suf: '+', label: 'STARTUPS BACKED', color: 'var(--secondary)', accent: true, icon: TrendingUp },
              { val: '1', pre: '$', suf: 'Bn+', label: 'COMBINED VALUATION', color: 'var(--primary)', accent: false, icon: DollarSign },
              { val: '1000', suf: '+', label: 'ANGELS & CXOS', color: 'var(--primary)', accent: false, icon: Users },
              { val: '100', pre: '$', suf: 'Mn+', label: 'SYNDICATED DEALS', color: 'var(--primary)', accent: false, icon: Handshake },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(29,47,111,0.1)',
                  borderRadius: 18,
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {s.accent && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: 'var(--secondary)' }} aria-hidden="true" />}
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#f5f7fc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                  <s.icon color="var(--primary)" size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>
                    <CountUp value={s.val} prefix={s.pre} suffix={s.suf} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 2 · STATS STRIP ──────────────── */}
      <section aria-label="Key statistics" style={{ backgroundColor: 'var(--primary)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {statsStrip.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: 'center', flex: 1, minWidth: '100px' }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: 'white' }}>
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'white', marginTop: 4 }}>{s.label}</div>
              </div>
              {i < statsStrip.length - 1 && (
                <div style={{ width: 1, height: 92, backgroundColor: 'white', opacity: 0.1, flexShrink: 0 }} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ──────────────── 3 · WHY 888VC ──────────────── */}
      <section aria-label="Why invest with 888VC" style={{ padding: '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHY 888VC</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 48 }}>
            The edge every investor needs<br />in the India–US corridor.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {whyCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  backgroundColor: c.dark ? 'var(--primary)' : '#f5f7fc',
                  border: c.dark ? 'none' : '1px solid rgba(29,47,111,0.1)',
                  borderRadius: 20,
                  padding: '28px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.dark ? 'rgba(255,255,255,0.1)' : 'rgba(235,58,27,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                  <c.icon color={c.dark ? 'white' : 'var(--primary)'} size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.dark ? 'white' : 'var(--primary)', marginBottom: 8, margin: '0 0 8px 0' }}>{c.title}</h3>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: c.dark ? 'white' : '#000' }}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 4 · HOW IT WORKS ──────────────── */}
      <section aria-label="Investment process" style={{ backgroundColor: '#f5f7fc', padding: '60px 72px 80px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>THE PROCESS</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 48 }}>
            Simple, transparent, and structured<br />for serious investors.
          </h2>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingTop: 20 }}>
            {/* Connecting line */}
            <div style={{ position: 'absolute', top: 56, left: 64, right: 64, height: 2, backgroundColor: '#eb3a1b', opacity: 0.4 }} aria-hidden="true" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, position: 'relative' }}>
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Circle */}
                  <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', position: 'relative', zIndex: 2 }} aria-hidden="true">
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8, margin: '0 0 8px 0' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5 · INVESTOR TYPES ──────────────── */}
      <section aria-label="Types of investors we work with" style={{ backgroundColor: 'var(--primary)', padding: '80px 72px', position: 'relative', overflow: 'hidden' }}>
        {/* Vertical line texture — decorative */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.06, pointerEvents: 'none' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'white' }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 12 }}>WHO WE WORK WITH</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>
            Built for every kind<br />of serious capital.
          </h2>
          <p style={{ fontSize: 16, color: 'white', marginBottom: 48, maxWidth: 912 }}>
            Whether you're writing your first angel cheque or deploying from a fund, we have a structured entry point for you.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
            {investorTypes.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20,
                  padding: '20px',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }} aria-hidden="true">
                  <t.icon color="white" size={24} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 8, margin: '0 0 8px 0' }}>{t.title}</h3>
                <div style={{ fontSize: 13, color: 'white', lineHeight: 1.6, marginBottom: 24, minHeight: 82 }}>{t.desc}</div>
                <div style={{ backgroundColor: 'rgba(235,58,27,0.2)', display: 'inline-block', padding: '5px 12px', borderRadius: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 6 · SECTORS ──────────────── */}
      <section aria-label="Investment sectors" style={{ padding: '60px 72px 80px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHAT WE BACK</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Industries we back.</h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 720 }}>
            Sector-agnostic at heart — deeply focused on technology-led companies creating defensible competitive advantages.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
            {sectors.map((s, i) => (
              <div key={s} style={{
                backgroundColor: '#f5f7fc',
                border: '1px solid rgba(29,47,111,0.1)',
                borderRadius: 12,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: sectorColors[i % sectorColors.length] }} aria-hidden="true" />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Sector CTA Strip */}
          <div style={{
            backgroundColor: 'var(--primary)',
            borderRadius: 16,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'white', opacity: 0.85, maxWidth: 880 }}>
              We're sector-agnostic but technology-obsessed. If you're using tech to create a defensible moat, we want to hear from you.
            </p>
            <Link to="/portfolio" aria-label="View all portfolio companies">
              <button className="primary-btn" style={{ padding: '10px 24px', fontSize: 14, whiteSpace: 'nowrap' }}>
                View All Portfolio →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── 7 · TESTIMONIALS ──────────────── */}
      <section aria-label="Founder testimonials" style={{ backgroundColor: 'var(--primary)', padding: '80px 72px' }}>
        <div className="container">
          <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 12 }}>FOUNDER STORIES</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 48 }}>
            What our founders say about working with us.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 18,
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 8 }}>{t.company}</div>
                <blockquote style={{ margin: 0, padding: 0, border: 'none' }}>
                  <p style={{ fontSize: 13, color: 'white', lineHeight: 1.6, marginBottom: 20 }}>"{t.quote}"</p>
                </blockquote>
                <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: 'white', opacity: 0.75, marginTop: 2 }}><cite style={{ fontStyle: 'normal' }}>{t.role}</cite></div>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 8 · SUPER ANGELS ──────────────── */}
      <section aria-label="Super angels and CXO investors" style={{ backgroundColor: '#f5f7fc', padding: '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>OUR NETWORK</div>
          <h2 className="text-navy" style={{ fontSize: 32, fontWeight: 800, marginBottom: 48 }}>
            Super Angels & CXOs Investing With Us
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 22 }}>
            {angels.map((a, i) => (
              <motion.div
                key={i}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(29,47,111,0.1)',
                  borderRadius: 18,
                  padding: '20px 24px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px' }}>
                  <img src={a.img} alt={`Photo of ${a.name}, ${a.role}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{a.name}</h3>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--secondary)', marginTop: 4 }}>{a.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 9 · GET STARTED CTA ──────────────── */}
      <section aria-label="Get started as an investor" style={{ padding: '80px 72px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 568px', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>GET STARTED</div>
            <h2 className="text-navy" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3, marginBottom: 24 }}>
              Invest in an economy filled<br />with innovation.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 36, maxWidth: 560 }}>
              Connect with enthusiastic innovators who are ambitious to break conformity and redesign the rules of the new world using tech. Join our investor network today.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="primary-btn" style={{ padding: '12px 28px', fontSize: 15 }}>Join as Investor →</button>
              <button style={{
                backgroundColor: '#eef1f9',
                border: '1px solid rgba(29,47,111,0.15)',
                color: 'var(--primary)',
                padding: '12px 28px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                minHeight: '44px',
              }}>
                Explore GRO8 Club
              </button>
            </div>
          </div>

          {/* Right — Stats Card */}
          <div style={{
            backgroundColor: 'var(--primary)',
            borderRadius: 24,
            padding: '28px',
            display: 'grid',
            gridTemplateColumns: '1fr 240px',
            gap: 20,
            overflow: 'hidden',
            position: 'relative',
            minHeight: 296,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {[
                { val: '$100Mn+', label: 'Syndicated across deals' },
                { val: '50+', label: 'Portfolio companies' },
                { val: '200+', label: 'VC Fund partners' },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{ marginBottom: 4, marginTop: i > 0 ? 16 : 0 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{item.val}</div>
                    <div style={{ fontSize: 12, color: 'white', opacity: 0.75 }}>{item.label}</div>
                  </div>
                  {i < 2 && <div style={{ height: 1, backgroundColor: 'white', opacity: 0.1, margin: '12px 0 0' }} aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>

            <div style={{ borderRadius: 14, overflow: 'hidden' }}>
              <img
                src="/assets/webimages/Investors/GET%20STARTED%20CTA/Image%20Placeholder.jpg"
                alt="Team working together on investment strategy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvestorsPage;
