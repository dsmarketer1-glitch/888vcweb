import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, CheckCircle, Clock, UserCheck, Building, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import usePageTitle from '../hooks/usePageTitle';
import useIsMobile from '../hooks/useIsMobile';

/* ─── Data ─── */

const whyAccreditation = [
  {
    title: 'SEBI Regulatory Compliance',
    desc: 'Under SEBI\'s revised Angel Fund regulations (September 2025), accreditation is now mandatory for investing through the AIF route. Stay compliant and invest with confidence.',
    icon: ShieldCheck,
    dark: true
  },
  {
    title: 'Investor Protection',
    desc: 'Accreditation verifies that investors meet eligibility norms and understand the risks of private market investing — ensuring informed and responsible capital deployment.',
    icon: UserCheck,
    dark: false
  },
  {
    title: 'Access Premium Deals',
    desc: 'As an accredited investor, you gain access to exclusive early-stage deal flow, structured SPV investments, and co-investment opportunities across 888vc\'s curated portfolio.',
    icon: FileText,
    dark: false
  },
  {
    title: 'Seamless Process',
    desc: '888vc facilitates the entire accreditation journey through a SEBI-recognized third-party agency — from eligibility checks and documentation to filing and follow-ups.',
    icon: CheckCircle,
    dark: false
  }
];

const accreditationSteps = [
  { num: '01', title: 'Eligibility Check', desc: 'We review your financial profile against SEBI\'s criteria and determine if you qualify as an accredited investor under current regulations.' },
  { num: '02', title: 'Document Review', desc: 'Our team guides you through the required documentation — income proofs, net worth certificates, and identity verification.' },
  { num: '03', title: 'Application Submission', desc: 'We submit your application through a SEBI-recognized accreditation agency on your behalf, ensuring accurate and compliant filing.' },
  { num: '04', title: 'Verification & Certificate', desc: 'After verification, you receive a 2-year accreditation certificate — unlocking your ability to invest via Angel Funds and AIFs.' }
];

const eligibilityCategories = [
  {
    title: 'Individual Investors',
    subtitle: 'Including NRIs, OCIs, Family Trusts & Sole Proprietorships',
    criteria: [
      'Annual income of ₹2 crore or more',
      'Net worth of ₹7.5 crore or more (excluding primary residence)',
      'Annual income ≥ ₹1 crore + Net worth ≥ ₹5 crore (excluding primary residence)'
    ],
    icon: UserCheck,
    color: 'var(--secondary)'
  },
  {
    title: 'Body Corporates',
    subtitle: 'LLP, Pvt. Ltd. & Trusts',
    criteria: [
      'Minimum net worth of ₹50 crore'
    ],
    icon: Building,
    color: 'var(--primary)'
  },
  {
    title: 'HUF (Hindu Undivided Family)',
    subtitle: 'Karta-based qualification',
    criteria: [
      'The Karta (head of family) must individually meet the eligibility criteria for Individual Investors listed above'
    ],
    icon: Users,
    color: '#e67e22'
  }
];

const supportFeatures = [
  'End-to-end assistance through the accreditation process',
  'Dedicated relationship manager for documentation',
  'Filing through SEBI-recognized accreditation agencies',
  'Regular status updates and follow-ups',
  'Post-accreditation onboarding to 888vc deal flow',
  '2-year certificate validity with renewal support'
];

/* ═══════════════════════════════ COMPONENT ═══════════════════════════════ */

const AccreditedInvestorPage = () => {
  usePageTitle('888VC — Become an Accredited Angel Investor');
  const { motionEnabled } = useAccessibility();
  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], !motionEnabled ? [1, 1] : [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], !motionEnabled ? [0, 0] : [0, 50]);

  return (
    <main id="main-content" role="main" ref={pageRef} style={{ backgroundColor: 'white' }}>

      {/* ══════════ 1 · HERO BANNER ══════════ */}
      <section aria-label="Accredited Angel Investor overview" style={{ backgroundColor: '#f0f4fb', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 520, height: 520, right: -40, top: -130, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 380, height: 380, right: 30, top: -60, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 220, height: 220, right: 110, top: 20, opacity: 0.1, border: '2px solid var(--secondary)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', width: 200, height: 200, left: -60, bottom: -40, opacity: 0.05, border: '2px solid var(--primary)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
          {/* Left */}
          <motion.div style={{ opacity: heroOpacity, y: heroY }}>
            <span aria-hidden="true" className="text-orange text-sm font-bold" style={{
              backgroundColor: 'rgba(235, 58, 27, 0.1)',
              padding: '6px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '24px'
            }}>
              SEBI ACCREDITATION · ANGEL INVESTING
            </span>

            <h1 style={{ fontSize: isSmallMobile ? '38px' : (isMobile ? '48px' : '60px'), fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
              <span style={{ color: 'var(--primary)', display: 'block' }}>Become an Accredited</span>
              <span style={{ color: 'var(--secondary)' }}>Angel Investor.</span>
            </h1>

            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 620, marginBottom: 32 }}>
              SEBI now mandates accreditation for angel fund investments. 888vc makes the process simple, compliant, and fully assisted — so you can focus on backing the next generation of builders.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              <a href="https://forms.gle/RNPwKDHfkdeaffvo7" target="_blank" rel="noopener noreferrer" className="primary-btn" aria-label="Start Accreditation Process" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Start Accreditation →
              </a>
              <Link to="/investors" aria-label="Learn more about investing with 888VC" style={{ textDecoration: 'none', borderRadius: '12px', padding: '14px 28px', backgroundColor: '#eef1f9', color: 'var(--primary)', fontWeight: 600, fontSize: 14, display: 'inline-block' }}>
                Learn About Investing
              </Link>
            </div>

            {/* Trust Badges */}
            <div style={{ borderTop: '1px solid rgba(29,47,111,0.12)', paddingTop: 16 }}>
              <ul className="a11y-list features" role="list" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
                {['SEBI-recognized process', '2-year certificate', 'Fully assisted'].map((t, i) => (
                  <li key={i}>
                    <div className="feature-tag" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: 0, cursor: 'default' }}>
                      <div className="feature-icon" style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'var(--secondary)' }} aria-hidden="true" />
                      <span className="feature-text" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{t}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — Key Info Card */}
          <div className="mobile-grid-1" style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 10 }}>
            <motion.div
              initial={!motionEnabled ? {} : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: 'var(--primary)',
                borderRadius: 20,
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div aria-hidden="true" style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, border: '2px solid rgba(255,255,255,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                    <AlertTriangle color="white" size={22} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>IMPORTANT DEADLINE</span>
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>
                  September 2026
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20 }}>
                  All angel investors must be accredited by September 2026 to continue investing through AIF structures. Start now to avoid service interruptions.
                </p>
                <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 20 }} aria-hidden="true" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Mandatory for AIF-route investments', 'Certificate valid for 2 years', '888vc handles the entire process'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle color="var(--secondary)" size={16} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 2 · WHY ACCREDITATION ══════════ */}
      <section aria-label="Why accreditation matters" style={{ padding: isMobile ? '60px 0' : '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>WHY ACCREDITATION</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 48 }}>
            Why accreditation matters<br />for angel investors.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {whyAccreditation.map((c, i) => (
              <motion.div
                key={i}
                className="info-card"
                initial={!motionEnabled ? {} : { opacity: 0, y: 20 }}
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
                  textAlign: 'left',
                  cursor: 'default',
                  width: '100%'
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.dark ? 'rgba(255,255,255,0.1)' : 'rgba(235,58,27,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                  <c.icon color={c.dark ? 'white' : 'var(--primary)'} size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.dark ? 'white' : 'var(--primary)', marginBottom: 8, margin: '0 0 8px 0' }}>{c.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: c.dark ? 'white' : '#000', margin: 0 }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3 · ACCREDITATION PROCESS ══════════ */}
      <section aria-label="Accreditation process" style={{ backgroundColor: '#f5f7fc', padding: '60px 72px 80px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>THE PROCESS</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 48 }}>
            Simple, compliant, and<br />fully assisted.
          </h2>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingTop: 20 }}>
            {/* Connecting line */}
            {!isMobile && <div style={{ position: 'absolute', top: 56, left: 64, right: 64, height: 2, backgroundColor: '#eb3a1b', opacity: 0.4 }} aria-hidden="true" />}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, position: 'relative' }}>
              {accreditationSteps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={!motionEnabled ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Circle */}
                  <div
                    aria-label={`Step ${s.num}`}
                    style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', position: 'relative', zIndex: 2 }}
                  >
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

      {/* ══════════ 4 · ELIGIBILITY CRITERIA ══════════ */}
      <section aria-label="Eligibility criteria for accreditation" style={{ backgroundColor: 'var(--primary)', padding: isMobile ? '60px 0' : '80px 72px', position: 'relative', overflow: 'hidden' }}>
        {/* Vertical line texture — decorative */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.06, pointerEvents: 'none' }} aria-hidden="true">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} style={{ width: 1, height: '100%', backgroundColor: 'white' }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 12 }}>ELIGIBILITY CRITERIA</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>
            Who can become an<br />accredited investor?
          </h2>
          <p style={{ fontSize: 16, color: 'white', opacity: 0.7, marginBottom: 48, maxWidth: 740 }}>
            SEBI defines clear financial thresholds for accreditation. Check which category applies to you.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {eligibilityCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={!motionEnabled ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!motionEnabled ? {} : { y: -8 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20,
                  padding: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                    <cat.icon color="white" size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', margin: 0 }}>{cat.title}</h3>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{cat.subtitle}</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cat.criteria.map((c, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle color={cat.color} size={16} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: 'white', lineHeight: 1.5 }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 5 · WHAT 888VC OFFERS ══════════ */}
      <section aria-label="What 888VC offers for accreditation" style={{ padding: isMobile ? '60px 0' : '80px 72px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
            {/* Left — Text */}
            <div>
              <div className="text-sm text-orange" style={{ marginBottom: 12 }}>888VC SUPPORT</div>
              <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 20 }}>
                We make accreditation<br />effortless.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 32, maxWidth: 560 }}>
                From the initial eligibility check to receiving your certificate, 888vc's dedicated team manages every step. We work with SEBI-recognized agencies to ensure a smooth, compliant, and stress-free process.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="https://forms.gle/RNPwKDHfkdeaffvo7" target="_blank" rel="noopener noreferrer" className="primary-btn" aria-label="Begin Accreditation" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Begin Accreditation →
                </a>
              </div>
            </div>

            {/* Right — Features checklist */}
            <motion.div
              initial={!motionEnabled ? {} : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: '#f5f7fc',
                border: '1px solid rgba(29,47,111,0.1)',
                borderRadius: 24,
                padding: '36px',
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 24, margin: '0 0 24px 0' }}>What's included</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {supportFeatures.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(235,58,27,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                      <CheckCircle color="var(--secondary)" size={14} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 6 · DEADLINE CTA STRIP ══════════ */}
      <section aria-label="Accreditation deadline notice" style={{ backgroundColor: '#f5f7fc', padding: '0 72px 80px' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--primary)',
            borderRadius: 20,
            padding: isMobile ? '28px 24px' : '36px 40px',
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 24,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Clock color="var(--secondary)" size={20} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary)' }}>DEADLINE APPROACHING</span>
              </div>
              <h3 style={{ fontSize: isSmallMobile ? 20 : 24, fontWeight: 800, color: 'white', margin: '0 0 8px 0' }}>
                Don't wait until September 2026.
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: 600 }}>
                Complete your accreditation early and avoid last-minute service interruptions. The process takes 2–4 weeks on average.
              </p>
            </div>
            <a href="https://forms.gle/RNPwKDHfkdeaffvo7" target="_blank" rel="noopener noreferrer" className="primary-btn" aria-label="Get Accredited Now" style={{ textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Get Accredited Now →
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ 7 · FAQ ══════════ */}
      <section aria-label="Frequently asked questions" style={{ padding: isMobile ? '60px 0' : '80px 72px' }}>
        <div className="container">
          <div className="text-sm text-orange" style={{ marginBottom: 12 }}>FAQ</div>
          <h2 className="text-navy" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.3, marginBottom: 48 }}>
            Frequently asked questions.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 800 }}>
            {[
              { q: 'What is an Accredited Investor?', a: 'An Accredited Investor is an individual or entity that meets specific financial criteria set by SEBI, qualifying them to invest in Angel Funds and Alternative Investment Funds (AIFs). This designation ensures investors understand the risks of early-stage private market investing.' },
              { q: 'Why has SEBI mandated accreditation?', a: 'SEBI\'s revised Angel Fund regulations (September 2025) require all investors in Angel Funds/AIFs to be accredited. This is to ensure investor protection and that participants meet minimum financial eligibility thresholds.' },
              { q: 'How long does the accreditation process take?', a: 'The typical process takes 2–4 weeks, depending on the completeness of documentation and verification timelines. 888vc\'s team works to expedite the process wherever possible.' },
              { q: 'How long is the accreditation certificate valid?', a: 'The accreditation certificate is valid for 2 years from the date of issuance. 888vc provides renewal reminders and support when your certificate approaches expiry.' },
              { q: 'What happens if I don\'t get accredited by the deadline?', a: 'Without accreditation, you will not be able to make new investments through AIF/Angel Fund structures after the September 2026 deadline. Existing investments are not affected, but new commitments will require accreditation.' },
              { q: 'Does 888vc charge for accreditation assistance?', a: '888vc facilitates the accreditation process at no additional service charge for investors in our network. Standard accreditation agency fees may apply as per the SEBI-recognized third-party provider.' }
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={!motionEnabled ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  backgroundColor: '#f5f7fc',
                  border: '1px solid rgba(29,47,111,0.1)',
                  borderRadius: 16,
                  padding: 0,
                  overflow: 'hidden'
                }}
              >
                <summary style={{
                  padding: '20px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}>
                  {faq.q}
                  <ArrowRight size={16} style={{ flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden="true" />
                </summary>
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 8 · GET STARTED CTA ══════════ */}
      <section aria-label="Get started with accreditation" style={{ padding: isMobile ? '60px 0' : '80px 72px' }}>
        <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 568px', gap: isMobile ? '40px' : 60, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="text-sm text-orange" style={{ marginBottom: 12 }}>GET STARTED</div>
            <h2 className="text-navy" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3, marginBottom: 24 }}>
              Ready to become an<br />accredited investor?
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 36, maxWidth: 560 }}>
              Join 888vc's investor network and let us handle your accreditation end-to-end. Start investing in India's most promising early-stage startups with full regulatory compliance.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="https://forms.gle/RNPwKDHfkdeaffvo7" target="_blank" rel="noopener noreferrer" className="primary-btn" aria-label="Start Accreditation Process CTA" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Start Accreditation →
              </a>
              <Link to="/investors" aria-label="Explore Investor Network" style={{ textDecoration: 'none', display: 'inline-block', backgroundColor: '#eef1f9', border: '1px solid rgba(29,47,111,0.15)', color: 'var(--primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                Explore Investor Network
              </Link>
            </div>
          </div>

          {/* Right — Stats Card */}
          <div className="responsive-stack" style={{
            backgroundColor: 'var(--primary)',
            borderRadius: 24,
            padding: '28px',
            display: 'grid',
            gridTemplateColumns: isSmallMobile ? '1fr' : '1fr',
            gap: 20,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {[
                { val: '2 Years', label: 'Certificate validity' },
                { val: '2–4 Weeks', label: 'Average processing time' },
                { val: '100%', label: 'Assistance — zero hassle' },
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
          </div>
        </div>
      </section>

    </main>
  );
};

export default AccreditedInvestorPage;
