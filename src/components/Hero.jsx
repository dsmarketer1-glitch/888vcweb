import React, { useState, useEffect, useCallback } from 'react';
import { SITE_CONTENT } from '../data/site-content';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';
import useIsMobile from '../hooks/useIsMobile';

export const Hero = () => {
  const { slides } = SITE_CONTENT.hero;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { motionEnabled } = useAccessibility();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, !motionEnabled ? 0 : 200]);
  const isSmallMobile = useIsMobile(768);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    // WCAG 2.2.1 — respect pause and reduced motion
    if (isPaused || !motionEnabled) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, motionEnabled]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      style={{
        padding: 0,
        height: isSmallMobile ? '500px' : '700px',
        backgroundColor: 'var(--primary)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={!motionEnabled ? {} : { opacity: 0 }}
            animate={{ 
              opacity: i === currentSlide ? 1 : 0,
              zIndex: i === currentSlide ? 1 : 0,
              pointerEvents: i === currentSlide ? 'auto' : 'none'
            }}
            transition={{ duration: !motionEnabled ? 0 : 1 }}
            aria-label={`Slide ${i + 1} of ${slides.length}`}
            aria-hidden={i !== currentSlide}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Parallax Background */}
            <motion.img 
              src={slide.bgImage}
              alt={slide.altText || ""}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: 0.4,
                y: y1
              }} 
            />

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(29, 47, 111, 0.45)',
              zIndex: 1
            }} aria-hidden="true" />

            <div style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 20px'
            }}>
              <motion.div
                initial={!motionEnabled ? {} : { opacity: 0, y: 30 }}
                animate={{ 
                  opacity: i === currentSlide ? 1 : 0, 
                  y: i === currentSlide ? 0 : 30 
                }}
                transition={{ delay: !motionEnabled ? 0 : 0.5, duration: !motionEnabled ? 0 : 0.8 }}
              >
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: '15px',
                  padding: '6px 20px',
                  display: 'inline-block',
                  marginBottom: '24px'
                }}>
                  <span className="text-xs" style={{ letterSpacing: '1px' }}>{slide.eyebrow}</span>
                </div>

                <p className="text-hero" style={{ maxWidth: '900px', margin: '0 auto 32px', fontSize: isSmallMobile ? '38px' : undefined }}>
                  {slide.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide Controls — WCAG 2.1.1 Keyboard, 2.5.8 Target Size, 4.1.2 Name/Role/Value */}
      <div style={{
        display: 'flex',
        gap: '12px',
        position: 'absolute',
        bottom: '40px',
        zIndex: 10,
        alignItems: 'center'
      }}>
        {/* WCAG 2.2.2 Pause/Stop/Hide — pause button */}
        <button
          className="carousel-pause-btn"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
        >
          {isPaused ? '▶' : '❚❚'}
        </button>

        <ul role="tablist" aria-label="Carousel slides" style={{ display: 'flex', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
          {slides.map((slide, i) => (
            <li key={i}>
              <button
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                onClick={() => goToSlide(i)}
                style={{
                  /* WCAG 2.5.8 — minimum 24×24px target */
                  width: '24px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: i === currentSlide ? 'var(--secondary)' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '4px',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 3
      }} aria-hidden="true">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={(isPaused || !motionEnabled) ? {} : { width: '100%' }}
          transition={{ duration: 5, ease: "linear" }}
          style={{
            height: '100%',
            backgroundColor: 'var(--secondary)'
          }}
        />
      </div>
    </section>
  );
};
