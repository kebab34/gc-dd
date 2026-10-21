'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { IntroContext, QuoteContext, ease } from './motion';
import { D_BACK, D_FRONT, LIME } from './Logo';
import Nav from './Nav';

export default function Shell({ children }) {
  const [introDone, setIntroDone] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [model, setModel] = useState('');
  const lenisRef = useRef(null);

  // L'intro ne se joue qu'une fois par visite (classe posée avant affichage dans layout.jsx)
  useEffect(() => {
    const seen = document.documentElement.classList.contains('skip-intro');
    try { sessionStorage.setItem('dd-intro-seen', '1'); } catch {}
    const t = setTimeout(() => setIntroDone(true), seen ? 0 : 2400);
    return () => clearTimeout(t);
  }, []);

  // Défilement fluide + liens d'ancre animés
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: x => 1 - Math.pow(1 - x, 4) });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el);
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const l = lenisRef.current;
    if (!introDone) { l?.stop(); document.documentElement.style.overflow = 'hidden'; }
    else { l?.start(); document.documentElement.style.overflow = ''; }
  }, [introDone]);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <QuoteContext.Provider value={{ model, setModel }}>
      <IntroContext.Provider value={introDone}>
        <AnimatePresence>
          {!introDone && (
            <motion.div className="intro" key="intro" initial={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={{ clipPath: 'inset(0% 0% 100% 0%)' }} transition={{ duration: 1, ease }}>
              <svg className="intro-mark" viewBox="0 0 102 105" aria-hidden="true">
                {[D_BACK, D_FRONT].map((d, i) => (
                  <motion.path key={i} d={d} fill="none" stroke={LIME} strokeWidth="8.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease, delay: i * 0.2 }} />
                ))}
              </svg>
              <div className="intro-word">
                {['DEKOR', '&', 'DESIGN'].map((w, i) => (
                  <span className="line-mask" key={w}>
                    <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.6 + i * 0.08 }}>{w}</motion.span>
                  </span>
                ))}
              </div>
              <motion.div className="intro-sub" initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.5em' }} transition={{ duration: 1.4, ease, delay: 1 }}>
                GARDE-CORPS
              </motion.div>
              {/* Reflet de lumière qui balaie l'écran, comme sur une vitre */}
              <motion.i className="intro-shine" initial={{ x: '-120%' }} animate={{ x: '120%' }} transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }} />
            </motion.div>
          )}
        </AnimatePresence>
        <Nav />
        {children}
        <a href="#devis" className={`mobile-cta ${pastHero ? 'show' : ''}`}>Devis gratuit →</a>
      </IntroContext.Provider>
    </QuoteContext.Provider>
  );
}
