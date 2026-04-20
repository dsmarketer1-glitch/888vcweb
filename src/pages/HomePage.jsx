import React from 'react';
import { Hero } from '../components/Hero';
import { StatsStrip, ValueProps } from '../components/Sections';
import { Portfolio, Team } from '../components/TeamPortfolio';
import { Gro8Platform, Testimonials } from '../components/Gro8Testimonials';
import { SuperAngels, News, CTABanner, PartnersMarquee } from '../components/AdditionalSections';
import usePageTitle from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('888VC — Backing Those Who Dare to Build Beyond Limits');

  return (
    <main id="main-content" role="main">
      <Hero />
      <StatsStrip />
      <ValueProps />
      <Portfolio />
      <Team />
      <Gro8Platform />
      <Testimonials />
      <SuperAngels />
      <PartnersMarquee />
      <News />
      <CTABanner />
    </main>
  );
};

export default HomePage;
