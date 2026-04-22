import React, { useRef } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';
import useIsMobile from '../hooks/useIsMobile';

export const Gro8Platform = () => {
  const { tag, title, features } = SITE_CONTENT.gro8;
  const ref = useRef(null);
  const { motionEnabled } = useAccessibility();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], !motionEnabled ? [0, 0] : [30, -30]);
  const isSmallMobile = useIsMobile(768);

  return (
    <section ref={ref} aria-label="GRO8 Platform features">
      <motion.div className="container" style={{ y }}>
        <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
        <h2 className="text-4xl text-navy" style={{ maxWidth: '720px', marginBottom: '60px', fontSize: isSmallMobile ? '32px' : undefined }}>{title}</h2>

        <div className="mobile-grid-1" style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={!motionEnabled ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: !motionEnabled ? 0 : i * 0.1 }}
              whileHover={!motionEnabled ? {} : { y: -5, boxShadow: '0 10px 30px rgba(29, 47, 111, 0.05)' }}
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
  const { motionEnabled } = useAccessibility();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], !motionEnabled ? [0, 0] : [40, -40]);
  const isSmallMobile = useIsMobile(768);

  return (
    <section ref={ref} aria-label="Founder testimonials" style={{ backgroundColor: 'var(--primary)', color: 'white', overflow: 'hidden' }}>
      <motion.div className="container" style={{ y }}>
        <div className="text-sm" style={{ color: 'var(--bg-soft)', marginBottom: '12px', letterSpacing: '1px' }}>{tag}</div>
        <h2 className="text-4xl" style={{ marginBottom: '16px', fontSize: isSmallMobile ? '32px' : undefined }}>{title}</h2>
        <p className="text-lg" style={{ opacity: 0.85, marginBottom: '60px', maxWidth: '750px', lineHeight: '1.6', fontSize: isSmallMobile ? '16px' : '18px' }}>{description}</p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={!motionEnabled ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: !motionEnabled ? 0 : i * 0.1 }}
              whileHover={!motionEnabled ? {} : { y: -8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                borderRadius: '32px',
                padding: isSmallMobile ? '32px' : '48px',
                display: 'flex',
                flexDirection: isSmallMobile ? 'column' : 'row',
                alignItems: isSmallMobile ? 'center' : 'stretch',
                gap: isSmallMobile ? '32px' : '48px',
                transition: 'background-color 0.3s ease',
                textAlign: isSmallMobile ? 'center' : 'left'
              }}
            >
              {/* Photo Side */}
              <div style={{ flexShrink: 0 }}>
                {item.image && (
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={item.image} 
                      alt={`Founder ${item.author}`} 
                      style={{ 
                        width: isSmallMobile ? '120px' : '180px', 
                        height: isSmallMobile ? '120px' : '220px', 
                        borderRadius: '24px', 
                        objectFit: 'cover',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                      }} 
                    />
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      borderRadius: '24px', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      pointerEvents: 'none' 
                    }} />
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                <div className="text-xs font-bold" style={{ marginBottom: '16px', color: 'white', letterSpacing: '2px' }}>{item.company.toUpperCase()}</div>
                <blockquote style={{ flex: 1, marginBottom: '24px', margin: 0, padding: 0, border: 'none' }}>
                  <p className="text-lg" style={{ 
                    fontStyle: 'normal', 
                    lineHeight: '1.6', 
                    opacity: 0.95, 
                    fontSize: isSmallMobile ? '18px' : '22px',
                    fontWeight: 500
                  }}>"{item.quote}"</p>
                </blockquote>
                <footer>
                  <div className="text-base font-bold" style={{ fontSize: '20px', marginBottom: '4px' }}>{item.author}</div>
                  <div className="text-sm" style={{ opacity: 0.7 }}><cite style={{ fontStyle: 'normal' }}>{item.role}</cite></div>
                </footer>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
