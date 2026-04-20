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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={!motionEnabled ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={!motionEnabled ? {} : { opacity: 0 }}
          transition={{ duration: !motionEnabled ? 0 : 1 }}
          aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Parallax Background */}
          <motion.div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${slides[currentSlide].bgImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            y: y1
          }} aria-hidden="true" />

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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: !motionEnabled ? 0 : 0.5, duration: !motionEnabled ? 0 : 0.8 }}
            >
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '15px',
                padding: '6px 20px',
                display: 'inline-block',
                marginBottom: '24px'
              }}>
                <span className="text-xs" style={{ letterSpacing: '1px' }}>{slides[currentSlide].eyebrow}</span>
              </div>

              <h1 className="text-hero" style={{ maxWidth: '900px', margin: '0 auto 32px', fontSize: isSmallMobile ? '38px' : undefined }}>
                {slides[currentSlide].title}
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

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

        <div role="tablist" aria-label="Carousel slides" style={{ display: 'flex', gap: '12px' }}>
          {slides.map((slide, i) => (
            <button
              key={i}
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
          ))}
        </div>
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
