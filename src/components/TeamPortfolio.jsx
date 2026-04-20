import React, { useRef } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import useReducedMotion from '../hooks/useReducedMotion';

export const Portfolio = () => {
  const { tag, title, items } = SITE_CONTENT.portfolio;
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} aria-label="Portfolio companies">
      <motion.div className="container" style={{ y }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
            <h2 className="text-4xl text-navy" style={{ maxWidth: '900px' }}>{title}</h2>
          </motion.div>
          <Link to="/portfolio" aria-label="View all portfolio companies" className="text-navy font-bold text-lg" style={{ marginBottom: '10px' }}>View All →</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
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
                  backgroundPosition: 'center'
                }}
              />
              <div style={{ padding: '20px', backgroundColor: 'white', marginTop: '-12px', borderRadius: '14px 14px 0 0', position: 'relative' }}>
                <h3 className="text-base text-navy font-bold" style={{ fontWeight: 700 }}>{item.name}</h3>
                <p className="text-xs text-muted" style={{ marginTop: '4px', fontWeight: 500 }}>{item.category}</p>
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, -40]);

  return (
    <section ref={ref} aria-label="Team members" style={{ backgroundColor: 'var(--bg-soft)' }}>
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
        <h2 className="text-4xl text-navy" style={{ marginBottom: '60px' }}>{title}</h2>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={prefersReducedMotion ? {} : { y: -5, boxShadow: '0 20px 40px rgba(29, 47, 111, 0.1)' }}
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
          <div
            role="img"
            aria-label={`Photo of ${founder.name}, ${founder.role}`}
            style={{
              width: window.innerWidth < 768 ? '100%' : '260px',
              minHeight: '250px',
              backgroundImage: `url("${founder.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          />
          <div style={{ padding: window.innerWidth < 768 ? '24px' : '40px', flex: 1, minWidth: '280px' }}>
            <h3 className="text-2xl text-navy" style={{ fontSize: window.innerWidth < 768 ? '24px' : '28px' }}>{founder.name}</h3>
            <div className="text-orange text-sm" style={{ margin: '12px 0 20px', letterSpacing: '1px' }}>{founder.role}</div>
            <p className="text-lg text-muted" style={{ lineHeight: '1.7', fontSize: window.innerWidth < 768 ? '16px' : '17px' }}>{founder.bio}</p>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 480 ? '1fr' : (window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))'),
          gap: '20px'
        }}>
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { y: -8 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(29, 47, 111, 0.03)'
              }}
            >
              <img
                src={member.image}
                alt={`Photo of ${member.name}, ${member.role}`}
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
