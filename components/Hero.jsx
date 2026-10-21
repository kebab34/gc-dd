'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Counter, ease, useIntroDone } from './motion';
import { systems } from '@/lib/content';

const SLIDES = [
  { src: '/img/photos/grs-01-a.webp', label: 'Balcon vue mer' },
  { src: '/img/photos/grs-20.webp', label: 'Piscine à débordement' },
  { src: '/img/photos/grs-13.webp', label: 'Terrasse panoramique' },
  { src: '/img/photos/grs-15-a.webp', label: 'Rooftop urbain' },
];
const DURATION = 6000;

export default function Hero() {
  const start = useIntroDone();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Rendu 3D qui s'incline selon la souris
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const onMove = e => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setI(n => (n + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, start]);

  const show = start ? { opacity: 1, y: 0 } : {};
  return (
    <section className="hero" id="accueil" ref={ref} onMouseMove={onMove}>
      <motion.div className="hero-media" style={{ scale }}>
        <AnimatePresence initial={false}>
          <motion.div key={SLIDES[i].src} className="hero-slide" initial={{ clipPath: 'inset(0% 100% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={{ opacity: 1, transition: { duration: 1.3 } }} transition={{ duration: 1.3, ease }}>
            <motion.img src={SLIDES[i].src} alt={SLIDES[i].label} initial={{ scale: 1.2 }} animate={{ scale: 1.02 }} transition={{ duration: DURATION / 1000 + 1.5, ease: 'linear' }} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: fade }}>
        <div className="container hero-grid">
          <div>
            <motion.p className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={show} transition={{ duration: 1, ease, delay: 0.1 }}>
              <i /> Garde-corps en verre & aluminium
            </motion.p>
            <h1 className="hero-title">
              {['La vue,', 'sans limite.'].map((l, n) => (
                <span className="line-mask" key={l}>
                  <motion.span className={n ? 'accent' : undefined} initial={{ y: '110%' }} animate={start ? { y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 0.2 + n * 0.1 }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="hero-lead" initial={{ opacity: 0, y: 30 }} animate={show} transition={{ duration: 1.1, ease, delay: 0.6 }}>
              Balcons, terrasses, piscines et escaliers : {systems.length} systèmes de garde-corps vitrés, fabriqués sur mesure, au sol, encastrés, en nez de dalle ou sur pinces.
            </motion.p>
            <motion.div className="hero-ctas" initial={{ opacity: 0, y: 30 }} animate={show} transition={{ duration: 1.1, ease, delay: 0.75 }}>
              <a href="#catalogue" className="btn btn-lime">Voir le catalogue <span className="arrow">→</span></a>
              <a href="#devis" className="btn btn-glass">Devis gratuit</a>
            </motion.div>
          </div>

          <motion.div className="hero-object" initial={{ opacity: 0, y: 60 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.4, ease, delay: 0.5 }}>
            <motion.div className="hero-object-inner" style={{ rotateX: rx, rotateY: ry }}>
              <img src="/img/systemes/grs-04-s.webp" alt="Profil de garde-corps en verre en coupe" />
              <i className="shine" />
            </motion.div>
            <span className="hero-object-tag">GRS-04-S · profil réglable</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={start ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1 }}>
        <div className="container hero-stats-inner">
          <div><b><Counter value={systems.length} /></b><span>systèmes</span></div>
          <div><b>24,52</b><span>mm de verre max.</span></div>
          <div><b><Counter value={6} /></b><span>finitions + tout RAL</span></div>
          <div className="hero-dots">
            {SLIDES.map((s, n) => (
              <button key={s.src} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={s.label} style={{ '--dur': `${DURATION}ms` }}>
                <span key={n === i ? `on-${i}` : 'off'} />
              </button>
            ))}
            <em>{SLIDES[i].label}</em>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
