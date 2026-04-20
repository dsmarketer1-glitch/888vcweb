import React, { useRef } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

export const Gro8Platform = () => {
  const { tag, title, features } = SITE_CONTENT.gro8;
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} aria-label="GRO8 Platform features">
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
        <h2 className="text-4xl text-navy" style={{ maxWidth: '720px', marginBottom: '60px' }}>{title}</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { y: -5, boxShadow: '0 10px 30px rgba(29, 47, 111, 0.05)' }}
              style={{
                backgroundColor: 'var(--bg-soft)',
                borderRadius: '18px',
                padding: '32px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'white',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: 'var(--secondary)'
              }} aria-hidden="true">◈</div>
              <h3 className="text-lg text-navy font-bold" style={{ marginBottom: '16px' }}>{feature.title}</h3>
              <p className="text-base text-muted" style={{ lineHeight: '1.7' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const Testimonials = () => {
  const { tag, title, description, items } = SITE_CONTENT.testimonials;
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, -40]);

  return (
    <section ref={ref} aria-label="Founder testimonials" style={{ backgroundColor: 'var(--primary)', color: 'white', overflow: 'hidden' }}>
      <motion.div className="container" style={{ y }}>
        <div className="text-sm" style={{ color: 'var(--bg-soft)', marginBottom: '12px', letterSpacing: '1px' }}>{tag}</div>
        <h2 className="text-4xl" style={{ marginBottom: '16px', fontSize: window.innerWidth < 768 ? '28px' : '40px' }}>{title}</h2>
        <p className="text-lg" style={{ opacity: 0.85, marginBottom: window.innerWidth < 768 ? '32px' : '60px', maxWidth: '750px', lineHeight: '1.6', fontSize: window.innerWidth < 768 ? '16px' : '18px' }}>{description}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { y: -8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div className="text-xs font-bold" style={{ marginBottom: '24px', color: 'var(--secondary)', letterSpacing: '1px' }}>{item.company.toUpperCase()}</div>
              {/* WCAG semantic — blockquote for testimonials */}
              <blockquote style={{ flex: 1, marginBottom: '32px', margin: 0, padding: 0, border: 'none' }}>
                <p className="text-lg" style={{ fontStyle: 'italic', lineHeight: '1.7', opacity: 0.9 }}>"{item.quote}"</p>
              </blockquote>
              <footer style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={`Founder ${item.author}`} 
                    style={{ 
                      width: '56px', 
                      height: '56px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.2)'
                    }} 
                  />
                )}
                <div>
                  <div className="text-base font-bold" style={{ fontSize: '18px' }}>{item.author}</div>
                  <div className="text-sm" style={{ opacity: 0.7, marginTop: '2px' }}><cite style={{ fontStyle: 'normal' }}>{item.role}</cite></div>
                </div>
              </footer>
            </motion.div>

          ))}
        </div>
      </motion.div>
    </section>
  );
};
