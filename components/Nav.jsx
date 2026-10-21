'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease } from './motion';
import Logo from './Logo';
import { site } from '@/lib/content';

const links = [
  ['#poses', 'Types de pose'],
  ['#catalogue', 'Catalogue'],
  ['#finitions', 'Finitions'],
  ['#technique', 'Technique'],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.85);
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${solid && !open ? 'solid' : ''} ${hidden && !open ? 'hidden' : ''}`}>
        <div className="nav-inner">
          <a href="#accueil" className="logo" aria-label="Dekor & Design – Garde-corps" onClick={() => setOpen(false)}><Logo /></a>
          <nav className="nav-links">
            {links.map(([href, label]) => <a key={href} href={href}><span data-text={label}>{label}</span></a>)}
          </nav>
          <div className="nav-right">
            <a href={`tel:${site.phoneLink}`} className="nav-phone">{site.phone}</a>
            <a href="#devis" className="btn btn-small nav-cta">Devis gratuit</a>
            <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><i /><i /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: 'inset(0% 0% 100% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={{ clipPath: 'inset(0% 0% 100% 0%)' }} transition={{ duration: 0.8, ease }}>
            {[...links, ['#devis', 'Devis gratuit']].map(([href, label], i) => (
              <span className="line-mask" key={href}>
                <motion.a href={href} onClick={() => setOpen(false)} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}>
                  <em>0{i + 1}</em>{label}
                </motion.a>
              </span>
            ))}
            <a className="mobile-phone" href={`tel:${site.phoneLink}`}>{site.phone}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
