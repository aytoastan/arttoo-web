'use client';
import { useRef } from 'react';
import About from './components/About';
import Artworks from './components/Artworks';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Learn from './components/LearnV0';
import Header from './components/Header';
import { useScroll, useTransform } from 'framer-motion';
// import LazyLoadComponent from './components/LazyLoading';

const LandingPage = () => {
  const main = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });
  // const navbarTextColor = useTransform(
  //   scrollYProgress,
  //   [0, 0.9, 0.99, 1],
  //   ["#FFFFFF", "#FFFFFF", "#000000", "#000000"]
  // );

  const navbarBgColor = useTransform(
    scrollYProgress,
    [0, 0.02, 0.99, 1],
    ['transparent', 'FFFFFF00', '#FFFFFFEE', '#FFFFFFEE']
  );
  const navImageFilter = useTransform(
    scrollYProgress,
    [0, 0.02, 0.99, 1],
    ['invert(0%)', 'invert(100%)', 'invert(100%)', 'invert(100%)']
  );

  return (
    <main ref={main} className='flex flex-col gap-8 '>
      <Header
        // textColor={navbarTextColor}
        navImg={navImageFilter}
        navbarBgColor={navbarBgColor}
      />
      <Hero />
      <div ref={heroRef} className='flex flex-col gap-8 bg-white z-50'>
        <Artworks />
        <Learn />
        <About />
        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
