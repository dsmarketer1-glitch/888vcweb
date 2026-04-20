import React, { useEffect, useState, useRef } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import useReducedMotion from '../hooks/useReducedMotion';

const CountUp = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, prefersReducedMotion]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

export const StatsStrip = () => {
  return (
    <section
      aria-label="Key statistics"
      style={{
        backgroundColor: 'var(--primary)',
        padding: window.innerWidth < 1024 ? '40px 0' : '48px 0',
        color: 'white',
        zIndex: 5
      }}
    >
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : (window.innerWidth < 1024 ? 'repeat(3, 1fr)' : `repeat(${SITE_CONTENT.statsStrip.length}, 1fr)`),
        alignItems: 'center',
        gap: window.innerWidth < 768 ? '32px 16px' : '16px'
      }}>
        {SITE_CONTENT.statsStrip.map((stat, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: window.innerWidth < 768 ? '32px' : '42px', 
                fontWeight: 800, 
                marginBottom: '8px' 
              }}>
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div style={{ 
                fontSize: '10px', 
                opacity: 0.85, 
                fontWeight: 600, 
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>{stat.label}</div>
            </motion.div>
            {(window.innerWidth >= 1024 && i < SITE_CONTENT.statsStrip.length - 1) && (
              <div style={{ 
                position: 'absolute',
                left: `${((i + 1) / SITE_CONTENT.statsStrip.length) * 100}%`,
                width: '1px', 
                height: '60px', 
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateX(-50%)' 
              }} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export const ValueProps = () => {
  const { tag, title, description, cards } = SITE_CONTENT.valueProps;
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [50, -50]);

  return (
    <section ref={ref} aria-label="Value propositions" style={{ backgroundColor: 'var(--bg-soft)', overflow: 'hidden' }}>
      <motion.div className="container" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-orange text-sm" style={{ marginBottom: '12px' }}>{tag}</div>
          <h2 className="text-4xl text-navy" style={{ maxWidth: '650px', marginBottom: '24px' }}>{title}</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '680px', marginBottom: '60px' }}>{description}</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={prefersReducedMotion ? {} : { y: -10, scale: 1.02 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(29, 47, 111, 0.05)'
              }}
            >
              <div
                role="img"
                aria-label={card.title + ' illustration'}
                style={{
                  height: '200px',
                  backgroundImage: `url("${card.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div style={{ padding: '32px' }}>
                <h3 className="text-xl text-navy" style={{ marginBottom: '16px' }}>{card.title}</h3>
                <p className="text-base text-muted" style={{ marginBottom: '24px', lineHeight: '1.7' }}>{card.description}</p>
                <Link to={card.href} aria-label={`${card.cta} — ${card.title}`} className="text-orange font-bold text-base" style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {card.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
