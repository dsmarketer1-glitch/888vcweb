import React, { useRef } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import useIsMobile from '../hooks/useIsMobile';

export const Portfolio = () => {
  const { tag, title, items } = SITE_CONTENT.portfolio;
  const ref = useRef(null);
  const { motionEnabled } = useAccessibility();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isMobile = useIsMobile(1024);
  const isSmallMobile = useIsMobile(768);
  const y = useTransform(scrollYProgress, [0, 1], !motionEnabled ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} aria-label="Portfolio companies">
      <motion.div className="container" style={{ y }}>
        <div className="responsive-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: '40px', gap: isMobile ? '16px' : '0' }}>
          <motion.div
            initial={!motionEnabled ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
            <h2 className="text-4xl text-navy" style={{ maxWidth: '900px', fontSize: isSmallMobile ? '32px' : undefined }}>{title}</h2>
          </motion.div>
          <Link to="/portfolio" aria-label="View all portfolio companies" className="text-navy font-bold text-lg" style={{ marginBottom: isMobile ? '0' : '10px' }}>View All →</Link>
        </div>

        <div className="mobile-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={!motionEnabled ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: !motionEnabled ? 0 : i * 0.1 }}
              whileHover={!motionEnabled ? {} : { scale: 1.02 }}
              style={{
                backgroundColor: 'var(--bg-soft)',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(29, 47, 111, 0.05)'
              }}
            >
              <div
                role="img"
                aria-label={`${item.name} — ${item.category}`}
                style={{
                  height: '140px',
                  backgroundImage: `url("${item.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                {/* Floating Founder Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '15px',
                  width: '100px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  padding: '8px',
                  zIndex: 2,
                  textAlign: 'center'
                }}>
                  {/* Portrait (Rectangle) */}
                  <div style={{
                    width: '100%',
                    height: '84px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <img src={item.founderPhoto} alt={`Photo of ${item.founderName}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* Name (Just the name) */}
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', lineHeight: '1.2', wordBreak: 'break-word' }}>
                    {item.founderName}
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 20px 20px', backgroundColor: 'white', position: 'relative' }}>
                <h3 className="text-base text-navy font-bold" style={{ fontWeight: 700, marginBottom: '4px' }}>{item.name}</h3>
                <p className="text-xs text-muted" style={{ fontWeight: 500 }}>{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const Team = () => {
  const { tag, title, founder, members } = SITE_CONTENT.team;
  const ref = useRef(null);
  const { motionEnabled } = useAccessibility();
  const isSmallMobile = useIsMobile(768);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], !motionEnabled ? [0, 0] : [40, -40]);

  return (
    <section ref={ref} aria-label="Team members" style={{ backgroundColor: 'var(--bg-soft)' }}>
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
        <h2 className="text-4xl text-navy" style={{ marginBottom: '60px', fontSize: isSmallMobile ? '32px' : undefined }}>{title}</h2>

        {/* Founder Card */}
        <motion.div
          initial={!motionEnabled ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={!motionEnabled ? {} : { y: -5, boxShadow: '0 20px 40px rgba(29, 47, 111, 0.1)' }}
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(29, 47, 111, 0.05)',
            flexWrap: 'wrap'
          }}
        >
          <img
            src={founder.image}
            alt={`Photo of ${founder.name}, Founder & CEO of 888VC`}
            className="mobile-grid-1"
            style={{
              width: isSmallMobile ? '100%' : '260px',
              minHeight: '250px',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block'
            }}
          />
          <div style={{ padding: '40px', flex: 1, minWidth: '280px' }}>
            <h3 className="text-2xl text-navy" style={{ fontSize: '28px' }}>{founder.name}</h3>
            <div className="text-orange text-sm" style={{ margin: '12px 0 20px', letterSpacing: '1px' }}>{founder.role}</div>
            <p className="text-lg text-muted" style={{ lineHeight: '1.7', fontSize: '17px' }}>{founder.bio}</p>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <div className="mobile-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px'
        }}>
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={!motionEnabled ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: !motionEnabled ? 0 : i * 0.1 }}
              whileHover={!motionEnabled ? {} : { y: -8 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(29, 47, 111, 0.03)'
              }}
            >
              <img
                src={member.image}
                alt={`Photo of ${member.name}`}
                style={{ width: '100%', height: '180px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              <div style={{ padding: '20px' }}>
                <h3 className="text-lg text-navy font-bold">{member.name}</h3>
                <p className="text-xs text-orange" style={{ marginTop: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
