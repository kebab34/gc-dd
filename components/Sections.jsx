'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ease, FadeUp, Lines, RevealImage, useQuote } from './motion';
import { families, finishes, noPhoto, poseLabel, spacing, specs, steps, systems, uses } from '@/lib/content';

const famName = Object.fromEntries(families.map(f => [f.id, f.name]));

/* ---------- Manifeste : les mots s'allument au défilement ---------- */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span className="word" style={{ opacity }}>{children}</motion.span>;
}

export function Manifesto() {
  const text = "Un garde-corps doit protéger sans jamais cacher. Verre feuilleté, aluminium extrudé, joints EPDM : nous l'avons choisi invisible, solide et fait pour durer.";
  const words = text.split(' ');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  return (
    <section className="section manifesto">
      <div className="container">
        <span className="eyebrow">Dekor & Design · Garde-corps</span>
        <p className="statement" ref={ref}>
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>
    </section>
  );
}

/* ---------- Types de pose : rendu collant qui change selon la famille ---------- */
export function Poses({ onPick }) {
  const [active, setActive] = useState(0);
  const f = families[active];
  const count = id => systems.filter(s => s.family === id).length;
  return (
    <section className="section poses" id="poses">
      <div className="container">
        <div className="head head-split">
          <div>
            <span className="eyebrow">Types de pose</span>
            <Lines lines={['Six façons', 'de tenir le verre.']} />
          </div>
          <FadeUp as="p" className="lead">Sur la dalle, dans la dalle, sur sa tranche ou par points : chaque support a son système.</FadeUp>
        </div>
        <div className="poses-grid">
          <div className="poses-stage">
            <div className="stage-glow" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={f.id}
                src={`/img/systemes/${f.render}.webp`}
                alt={f.name}
                className="stage-render"
                initial={{ opacity: 0, y: 60, rotateY: -25, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, rotateY: 20, scale: 0.95 }}
                transition={{ duration: 0.9, ease }}
              />
            </AnimatePresence>
            <i className="shine" key={`s-${f.id}`} />
            <div className="stage-meta">
              <span>0{active + 1} / 0{families.length}</span>
              <b>{f.name}</b>
            </div>
          </div>
          <div className="poses-list">
            {families.map((fam, i) => (
              <motion.article key={fam.id} className={`pose ${i === active ? 'on' : ''}`} onViewportEnter={() => setActive(i)} viewport={{ margin: '-45% 0% -45% 0%' }} onMouseEnter={() => setActive(i)}>
                <div className="pose-photo"><RevealImage src={`/img/photos/${fam.photo}.webp`} alt={fam.name} strength={6} /></div>
                <span className="pose-n">0{i + 1}</span>
                <h3>{fam.name}</h3>
                <p>{fam.text}</p>
                <button className="link-arrow" onClick={() => onPick(fam.id)}>{count(fam.id)} système{count(fam.id) > 1 ? 's' : ''} <span>→</span></button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Catalogue filtrable + fiche produit ---------- */
function Tilt({ children, className, onClick }) {
  const rx = useSpring(0, { stiffness: 180, damping: 16 });
  const ry = useSpring(0, { stiffness: 180, damping: 16 });
  const onMove = e => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  return (
    <motion.button className={className} style={{ rotateX: rx, rotateY: ry }} onPointerMove={onMove} onPointerLeave={() => { rx.set(0); ry.set(0); }} onClick={onClick}>
      {children}
    </motion.button>
  );
}

function Drawer({ sys, onClose, onQuote }) {
  const [finish, setFinish] = useState(finishes[0]);
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    window.__lenis?.stop();
    return () => { window.removeEventListener('keydown', k); window.__lenis?.start(); };
  }, [onClose]);
  const hasPhoto = !noPhoto.has(sys.slug);
  return (
    <motion.div className="drawer-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
      <motion.aside className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.7, ease }} onClick={e => e.stopPropagation()} role="dialog" aria-label={sys.ref}>
        <button className="drawer-close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="drawer-render">
          <motion.img src={sys.render} alt={sys.ref} initial={{ opacity: 0, scale: 0.9, rotateY: -20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }} />
        </div>
        <div className="drawer-body">
          <span className="eyebrow">{famName[sys.family]}</span>
          <h3>{sys.ref}</h3>
          <p className="drawer-note">{sys.note}</p>
          <dl className="drawer-specs">
            <div><dt>Pose</dt><dd>{poseLabel[sys.pose]}</dd></div>
            <div><dt>Verre feuilleté</dt><dd className="chips">{sys.thick.map(t => <span key={t}>{t} mm</span>)}</dd></div>
            <div>
              <dt>Finitions disponibles</dt>
              <dd className="swatches">
                {finishes.map(fi => (
                  <button key={fi.id} className={fi.id === finish.id ? 'on' : ''} style={{ '--c': fi.color }} onClick={() => setFinish(fi)} aria-label={fi.name} title={fi.name} />
                ))}
                <em>{finish.name} · {finish.detail}</em>
              </dd>
            </div>
          </dl>
          {hasPhoto && <div className="drawer-photo"><img src={sys.photo} alt={`${sys.ref} posé`} loading="lazy" /></div>}
          <button className="btn btn-lime" onClick={() => onQuote(sys.ref)}>Demander un devis pour {sys.ref} <span className="arrow">→</span></button>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export function Catalogue({ filter, setFilter }) {
  const { setModel } = useQuote();
  const [open, setOpen] = useState(null);
  const list = systems.filter(s => filter === 'all' || s.family === filter);
  const quote = ref => {
    setModel(ref);
    setOpen(null);
    // On attend la fermeture de la fiche (qui bloque le défilement) avant de descendre au formulaire
    setTimeout(() => {
      const el = document.getElementById('devis');
      if (window.__lenis) { window.__lenis.start(); window.__lenis.scrollTo(el, { offset: -20 }); } else el.scrollIntoView({ behavior: 'smooth' });
    }, 780);
  };
  return (
    <section className="section catalogue" id="catalogue">
      <div className="container">
        <div className="head head-split">
          <div>
            <span className="eyebrow">Catalogue 2026</span>
            <Lines lines={[`${systems.length} systèmes,`, 'un seul verre.']} />
          </div>
          <FadeUp as="p" className="lead">Touchez un modèle pour voir ses épaisseurs de verre, ses finitions et demander un devis.</FadeUp>
        </div>
        <FadeUp className="filters">
          {[['all', 'Tous', systems.length], ...families.map(f => [f.id, f.short, systems.filter(s => s.family === f.id).length])].map(([id, label, n]) => (
            <button key={id} className={`filter ${filter === id ? 'on' : ''}`} onClick={() => setFilter(id)}>
              {filter === id && <motion.span layoutId="filter-pill" className="pill" transition={{ duration: 0.5, ease }} />}
              {label} <sup>{n}</sup>
            </button>
          ))}
        </FadeUp>
        <motion.div className="grid" layout>
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => (
              <motion.div key={s.ref} layout initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.6, ease, delay: Math.min(i, 8) * 0.03 }}>
                <Tilt className="card" onClick={() => setOpen(s)}>
                  <span className="card-fam">{famName[s.family]}</span>
                  <div className="card-render"><img src={s.render} alt={s.ref} loading="lazy" /><i className="shine" /></div>
                  <div className="card-foot">
                    <div><b>{s.ref}</b><small>{poseLabel[s.pose]}</small></div>
                    <span className="card-thick">{s.thick[0].split('–')[0]}–{s.thick[s.thick.length - 1].split('–').pop()} mm</span>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>{open && <Drawer sys={open} onClose={() => setOpen(null)} onQuote={quote} />}</AnimatePresence>
    </section>
  );
}

/* ---------- Usages : défilement horizontal piloté par le défilement vertical ---------- */
export function Uses() {
  const ref = useRef(null);
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, p => {
    const el = track.current;
    return el ? -p * Math.max(el.scrollWidth - window.innerWidth, 0) : 0;
  });
  return (
    <section className="uses" ref={ref}>
      <div className="uses-sticky">
        <div className="container">
          <span className="eyebrow">Inspirations</span>
          <Lines lines={['Partout où', 'la vue compte.']} />
        </div>
        <motion.div className="uses-track" ref={track} style={{ x }}>
          {uses.map((u, i) => (
            <figure className="use" key={u.id}>
              <img src={`/img/photos/${u.photo}.webp`} alt={u.label} loading="lazy" />
              <figcaption><span>0{i + 1}</span>{u.label}</figcaption>
            </figure>
          ))}
        </motion.div>
        <div className="container"><div className="uses-progress"><motion.span style={{ scaleX: scrollYProgress }} /></div></div>
      </div>
    </section>
  );
}

/* ---------- Finitions : aperçu teinté du profil ---------- */
export function Finishes() {
  const [f, setF] = useState(finishes[0]);
  return (
    <section className="section section-dark finishes" id="finitions">
      <div className="container finishes-grid">
        <div>
          <span className="eyebrow">Finitions</span>
          <Lines lines={['Votre façade,', 'votre couleur.']} />
          <FadeUp as="p" className="lead">Anodisé argent, satiné ou bronze, effet bois, ou thermolaqué dans toute la palette RAL. Choisissez une teinte pour la voir sur le profil.</FadeUp>
          <FadeUp className="finish-list">
            {finishes.map(fi => (
              <button key={fi.id} className={fi.id === f.id ? 'on' : ''} onClick={() => setF(fi)} onMouseEnter={() => setF(fi)}>
                <i style={{ background: fi.color }} />
                <b>{fi.name}</b>
                <span>{fi.detail}</span>
              </button>
            ))}
            <div className="finish-ral">+ toutes teintes <b>RAL</b> sur demande</div>
          </FadeUp>
        </div>
        <div className="finish-stage">
          <motion.div className="finish-disc" animate={{ background: `radial-gradient(circle at 50% 60%, ${f.color}55, transparent 62%)` }} transition={{ duration: 0.8 }} />
          {/* Deux calques : le verre reste intact, seul le profil (bas de l'image) est teinté */}
          <div className="finish-render">
            <img src="/img/systemes/grs-01.webp" alt="" aria-hidden="true" />
            <motion.img src="/img/systemes/grs-01.webp" alt={`Profil finition ${f.name}`} className="tinted" animate={{ filter: f.filter }} transition={{ duration: 0.7 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={f.id} className="finish-tag" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <b>{f.name}</b><span>{f.detail}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Technique : verre feuilleté animé, espacements, matériaux ---------- */
export function Technique() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const spread = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const layers = [0, 1, 2, 3, 4];
  return (
    <section className="section technique" id="technique">
      <div className="container">
        <div className="head head-split">
          <div>
            <span className="eyebrow">Technique</span>
            <Lines lines={['Pensé pour', 'durer.']} />
          </div>
          <FadeUp as="p" className="lead">Des matériaux sélectionnés et un dimensionnement adapté à la hauteur et à l'usage de chaque garde-corps.</FadeUp>
        </div>
        <div className="tech-grid">
          <div className="glass-explode" ref={ref}>
            {/* Les couches s'écartent dans leur propre zone ; la légende reste en dessous, hors de portée */}
            <div className="ply-stage">
            {layers.map(l => {
              const film = l % 2 === 1;
              return (
                <motion.div
                  key={l}
                  className={`ply ${film ? 'film' : 'pane'}`}
                  style={{ x: useTransform(spread, [0, 1], [0, (l - 2) * 46]), y: useTransform(spread, [0, 1], [0, (l - 2) * -18]) }}
                />
              );
            })}
            </div>
            <div className="ply-legend">
              <span><i className="pane" />Verre trempé</span>
              <span><i className="film" />Film PVB</span>
            </div>
            <p className="ply-caption">Verre feuilleté : même brisé, il reste en place.</p>
          </div>
          <div>
            <FadeUp as="h3" className="tech-h">Espacement des plots selon la hauteur du verre</FadeUp>
            <div className="tech-table" role="table">
              <div className="tr th" role="row"><span>Hauteur du verre</span><span>Épaisseur</span><span>Entraxe</span></div>
              {spacing.map((r, i) => (
                <motion.div key={r.h} className="tr" role="row" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.08 }}>
                  <b>{r.h}</b><span>{r.glass}</span><span>{r.gap}</span>
                </motion.div>
              ))}
            </div>
            <p className="tech-note">La hauteur et l'épaisseur du verre sont déterminées selon le bâtiment et l'usage.</p>
            <dl className="spec-list">
              {specs.map((s, i) => (
                <FadeUp key={s.k} delay={i * 0.05}><dt>{s.k}</dt><dd>{s.v}</dd></FadeUp>
              ))}
            </dl>
          </div>
        </div>
        <div className="handrails">
          {[['main-courante-ronde', 'Main courante ronde'], ['main-courante-carree', 'Main courante carrée'], ['coude', 'Coudes & angles'], ['embout', 'Embouts de finition']].map(([img, label], i) => (
            <FadeUp key={img} className="handrail" delay={i * 0.08}>
              <img src={`/img/site/${img}.webp`} alt={label} loading="lazy" />
              <span>{label}</span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Méthode ---------- */
export function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  return (
    <section className="section section-dark steps-sec">
      <div className="container">
        <div className="head">
          <span className="eyebrow">Votre projet</span>
          <Lines lines={['Du croquis', 'à la pose.']} />
        </div>
        <div className="steps" ref={ref}>
          <div className="steps-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
          {steps.map((s, i) => (
            <FadeUp className="step" key={s.title} delay={i * 0.1}>
              <span className="step-n">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
