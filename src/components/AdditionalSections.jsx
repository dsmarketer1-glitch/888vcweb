import React, { useRef, useState } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import useReducedMotion from '../hooks/useReducedMotion';

export const SuperAngels = () => {
  const angels = [
    { name: "Akash Gupta", role: "Co-Founder & CEO, Zypp Electric", company: "Zypp", image: "/assets/webimages/Homepage/SuperAngels/Akash%20Gupta.png" },
    { name: "Gaurav Mangla", role: "CEO & Co-Founder, Pickrr", company: "Pickrr", image: "/assets/webimages/Homepage/SuperAngels/Gaurav%20Mangla.png" },
    { name: "Dinesh Kumar", role: "CEO, Ixigo Trains & Confirmtkt", company: "ixigo", image: "/assets/webimages/Homepage/SuperAngels/Dinesh%20Kumar.png" },
    { name: "Sripad Vaidya", role: "COO, Ixigo Trains & Confirmtkt", company: "ixigo", image: "/assets/webimages/Homepage/SuperAngels/Sripad%20Vaidya.png" }
  ];

  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} aria-label="Super Angels and CXOs">
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>OUR NETWORK</div>
        <h2 className="text-4xl text-navy" style={{ marginBottom: '60px' }}>Super Angels & CXOs Investing With Us</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          {angels.map((angel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { y: -8, boxShadow: '0 15px 35px rgba(29, 47, 111, 0.08)' }}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '40px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 25px rgba(29, 47, 111, 0.04)',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src={angel.image}
                alt={`Photo of ${angel.name}, ${angel.role}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  margin: '0 auto 24px',
                  display: 'block',
                  border: '4px solid var(--bg-soft)'
                }}
              />
              <h3 className="text-lg text-navy font-bold" style={{ fontSize: '19px' }}>{angel.name}</h3>
              <p className="text-xs text-orange" style={{ margin: '12px 0 24px', fontWeight: 600, letterSpacing: '0.5px' }}>{angel.role}</p>
              <div style={{
                backgroundColor: '#f0f2f8',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-block'
              }}>
                <span className="text-sm text-muted font-bold">{angel.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const PartnersMarquee = () => {
  const partners = [
    { name: '3one4 Capital', logo: '/assets/webimages/About%20Us/PartnersMarquee/3one4%20Capital.png' },
    { name: 'Bluehill', logo: '/assets/webimages/About%20Us/PartnersMarquee/Bluehill.png' },
    { name: 'Blume Ventures', logo: '/assets/webimages/About%20Us/PartnersMarquee/Blume%20Ventures.png' },
    { name: 'Capital A', logo: '/assets/webimages/About%20Us/PartnersMarquee/Capital%20A.png' },
    { name: 'Chiratae Ventures', logo: '/assets/webimages/About%20Us/PartnersMarquee/Chiratae%20Ventures.png' },
    { name: 'IPV Ventures', logo: '/assets/webimages/About%20Us/PartnersMarquee/IPV%20Ventures.png' },
    { name: 'IvyCap Ventures', logo: '/assets/webimages/About%20Us/PartnersMarquee/IvyCap%20Ventures.png' },
    { name: 'Speciale Venture', logo: '/assets/webimages/About%20Us/PartnersMarquee/Speciale%20Venture.png' },
    { name: 'Venture Catalysts', logo: '/assets/webimages/About%20Us/PartnersMarquee/Venture%20Catalysts.png' }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Partners" style={{ backgroundColor: 'white', padding: '80px 0' }}>
      <div className="container" style={{ marginBottom: '50px' }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>PARTNERS</div>
        <h2 className="text-3xl text-navy">An Active Ecosystem of Partners</h2>
      </div>
      <div
        style={{
          backgroundColor: '#eef1f9',
          padding: '40px 0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <motion.div
          animate={(isPaused || prefersReducedMotion) ? {} : { x: [0, -1500] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{
            display: 'flex',
            gap: '100px',
            whiteSpace: 'nowrap',
            paddingLeft: '40px',
            alignItems: 'center'
          }}
          aria-hidden="true"
        >
          {partners.concat(partners).concat(partners).map((partner, i) => (
            <img 
              key={i} 
              src={partner.logo} 
              alt={partner.name} 
              style={{ 
                height: '45px', 
                width: 'auto', 
                filter: 'grayscale(100%) opacity(0.7)',
                transition: 'filter 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) opacity(1)'}
              onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) opacity(0.7)'}
            />
          ))}
        </motion.div>

        {/* Screen reader accessible partner list */}
        <ul className="visually-hidden">
          {partners.map((partner, i) => (
            <li key={i}>{partner.name}</li>
          ))}
        </ul>

        {/* WCAG 2.2.2 Pause button */}
        <button
          className="marquee-pause-btn"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Play partner marquee' : 'Pause partner marquee'}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(29, 47, 111, 0.1)',
            color: 'var(--primary)',
            border: '1px solid rgba(29, 47, 111, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {isPaused ? '▶' : '❚❚'}
        </button>
      </div>
    </section>
  );
};


export const News = () => {
  const { tag, title, featured, list } = SITE_CONTENT.news;
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} aria-label="News and updates" style={{ backgroundColor: 'var(--bg-soft)' }}>
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
        <h2 className="text-4xl text-navy" style={{ marginBottom: '60px' }}>{title}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Featured News */}
          <motion.article
            whileHover={prefersReducedMotion ? {} : { y: -8 }}
            style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
          >
            <div
              role="img"
              aria-label={featured.title}
              style={{ height: '320px', backgroundImage: `url("${featured.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div style={{ padding: '40px' }}>
              <div className="text-xs text-orange font-bold" style={{ marginBottom: '16px', letterSpacing: '1px' }}>{featured.category}</div>
              <h3 className="text-2xl text-navy" style={{ marginBottom: '20px', lineHeight: '1.4' }}>{featured.title}</h3>
              <div className="text-sm text-muted" style={{ marginBottom: '24px', fontWeight: 500 }}>
                <time>{featured.date}</time>  ·  {featured.readTime}
              </div>

            </div>
          </motion.article>

          {/* News List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {list.map((item, i) => (
              <motion.article
                key={i}
                whileHover={prefersReducedMotion ? {} : { x: 10, backgroundColor: '#fff' }}
                style={{ backgroundColor: 'white', borderRadius: '20px', display: 'flex', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}
              >
                <div
                  role="img"
                  aria-label={item.title}
                  style={{ width: '160px', minWidth: '160px', backgroundImage: `url("${item.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div style={{ padding: '24px', flex: 1 }}>
                  <div className="text-xs text-orange font-bold" style={{ marginBottom: '10px' }}>{item.category}</div>
                  <h3 className="text-base text-navy font-bold" style={{ marginBottom: '12px', lineHeight: '1.4' }}>{item.title}</h3>
                  <div className="text-xs text-muted" style={{ fontWeight: 500 }}><time>{item.date}</time></div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const CTABanner = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Call to action" style={{ backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Decals */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h2 className="text-4xl" style={{ marginBottom: '24px', fontSize: '48px' }}>Be part of our ecosystem of change-makers!</h2>
        <p className="text-lg" style={{ opacity: 0.85, marginBottom: '50px', maxWidth: '850px', margin: '0 auto 50px', lineHeight: '1.7', fontSize: '20px' }}>
          Whether you're building or investing — join the 888vc community where ambition meets capital.
        </p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/startup" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={{ scale: 0.95 }} className="primary-btn" style={{ padding: '16px 40px', fontSize: '16px' }}>Apply as Startup →</motion.button>
          </Link>
          <Link to="/investors" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={prefersReducedMotion ? {} : { scale: 1.05, borderColor: 'white' }} whileTap={{ scale: 0.95 }} className="secondary-btn" style={{ padding: '16px 40px', fontSize: '16px' }}>Join as Investor</motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => (
  <footer role="contentinfo" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '100px 72px 40px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '80px' }}>
      <div>
        <Link to="/" aria-label="888VC Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '28px' }}>
          <div style={{ backgroundColor: 'white', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/logo.svg" alt="888VC Logo" style={{ height: '36px', width: 'auto' }} />
          </div>
        </Link>
        <p className="text-base" style={{ opacity: 0.85, lineHeight: '1.8', fontSize: '15px', maxWidth: '300px' }}>
          Backing Those Who Dare to Build Beyond Limits. Early-stage venture capital, India × US.
        </p>
      </div>
      <div>
        <h4 className="text-sm text-orange" style={{ marginBottom: '28px', letterSpacing: '1px' }}>PAGES</h4>
        <nav aria-label="Footer navigation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
            {[
              { label: 'About Us', path: '/about' },
              { label: 'Investors', path: '/investors' },
              { label: 'Startup', path: '/startup' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: 'Events', path: '#' },
              { label: 'Blogs', path: '#' },
              { label: 'Join GRO8', path: '#' }
            ].map(link => (
              <Link key={link.label} to={link.path} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div>
        <h4 className="text-sm text-orange" style={{ marginBottom: '28px', letterSpacing: '1px' }}>CONTACT</h4>
        <address style={{ fontStyle: 'normal', lineHeight: '2', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>NETWORK888 ACCELERATOR LLP</p>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>Whitefield, Bengaluru 560066</p>
          <a href="tel:+919731227263" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>+91 97312 27263</a>
          <a href="mailto:info@888vc.co" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>info@888vc.co</a>
        </address>
      </div>
      <div>
         <h4 className="text-sm text-orange" style={{ marginBottom: '28px', letterSpacing: '1px' }}>FOLLOW</h4>
         <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { name: 'LinkedIn', url: '#' },
              { name: 'Twitter', url: '#' },
              { name: 'Instagram', url: '#' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                aria-label={`Follow 888VC on ${social.name}`}
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
              >
                {social.name}
              </a>
            ))}
         </div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 500, flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ color: 'rgba(255,255,255,0.85)' }}>© 2025 888 VC. All rights reserved.</div>
      <div style={{ display: 'flex', gap: '32px' }}>
        <a href="#" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Terms of Service</a>
      </div>
    </div>
  </footer>
);
