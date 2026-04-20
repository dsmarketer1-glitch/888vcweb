import React from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

export const StatsStrip = () => {
  const { statsStrip: stats } = SITE_CONTENT;
  const isMobile = useIsMobile(768);
  const isSmallMobile = useIsMobile(480);

  return (
    <section 
      style={{ 
        backgroundColor: '#f8f9fe', 
        padding: isMobile ? '40px 0' : '60px 0',
        borderBottom: '1px solid var(--border-muted)',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : (isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
            gap: isMobile ? '24px' : '40px',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative'
              }}
            >
              <div className="text-4xl text-navy" style={{ fontSize: isMobile ? '28px' : '36px' }}>
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted" style={{ fontWeight: 600 }}>{stat.label}</div>
              
              {/* Divider for desktop/tablet */}
              {!isSmallMobile && i < stats.length - 1 && i % (isMobile ? 2 : 4) !== (isMobile ? 1 : 3) && (
                <div 
                  className="hidden-mobile"
                  style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '15%',
                    height: '70%',
                    width: '1px',
                    backgroundColor: 'rgba(29, 47, 111, 0.1)'
                  }} 
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ValueProps = () => {
  const { title, cards: items } = SITE_CONTENT.valueProps;
  const isMobile = useIsMobile(768);

  return (
    <section style={{ backgroundColor: 'white' }}>
      <div className="container">
        <h2 className="text-4xl text-navy" style={{ marginBottom: isMobile ? '40px' : '80px', textAlign: 'center' }}>{title}</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: isMobile ? '32px' : '60px' 
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover-lift"
              style={{
                padding: isMobile ? '32px' : '40px',
                borderRadius: '24px',
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid transparent',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', height: '180px' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 className="text-xl text-navy" style={{ marginBottom: '16px' }}>{item.title}</h3>
              <p className="text-base text-muted" style={{ lineHeight: '1.7', flex: 1, marginBottom: '24px' }}>{item.description}</p>
              <Link to={item.href} style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '15px' }}>{item.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
