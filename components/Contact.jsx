'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp, Lines, useQuote } from './motion';
import Logo, { Monogram } from './Logo';
import { finishes, showrooms, site, systems } from '@/lib/content';

// Identifiants EmailJS. La clé publique est faite pour être visible côté navigateur ;
// les variables d'environnement (.env.local / Vercel) permettent de les changer sans toucher au code.
const EMAILJS = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_r5p9t69',
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_34c1fq7',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'qVWjs3dzUQ4nAyCyb',
};
const emailjsReady = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.publicKey);

const projets = ['Balcon', 'Terrasse / rooftop', 'Piscine', 'Escalier', 'Jardin', 'Autre'];

export function Quote() {
  const { model, setModel } = useQuote();
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (!model) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1600);
    return () => clearTimeout(t);
  }, [model]);

  const [status, setStatus] = useState('idle'); // idle · sending · sent · error

  // Envoi via EmailJS : les destinataires sont réglés dans le modèle EmailJS (pas dans le code).
  // Sans clés EmailJS (voir .env.local), on retombe sur la messagerie du visiteur.
  const onSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get('site_web')) return; // champ piège : rempli uniquement par les robots
    const params = {
      nom: d.get('nom'), telephone: d.get('tel'), email: d.get('email') || 'non renseigné',
      modele: d.get('modele') || 'à conseiller', projet: d.get('projet'), finition: d.get('finition'),
      longueur: d.get('longueur') || '?', hauteur: d.get('hauteur') || '?', ville: d.get('ville') || 'non renseignée',
      message: d.get('message') || '—',
    };
    if (!emailjsReady) {
      const body = Object.entries(params).map(([k, v]) => `${k} : ${v}`).join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Devis garde-corps – ${params.modele}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(EMAILJS.service, EMAILJS.template, params, { publicKey: EMAILJS.publicKey });
      setStatus('sent');
      form.reset();
      setModel('');
    } catch (err) {
      console.error('EmailJS', err);
      setStatus('error');
    }
  };

  return (
    <section className="section quote" id="devis">
      <div className="container quote-grid">
        <div>
          <span className="eyebrow">Devis gratuit</span>
          <Lines lines={['Parlons de', 'votre projet.']} />
          <FadeUp as="p" className="lead">Quelques mesures suffisent : nous vous rappelons avec une proposition chiffrée.</FadeUp>
          <FadeUp as="ul" className="contact-list">
            <li><span>Téléphone</span><a href={`tel:${site.phoneLink}`}>{site.phone}</a></li>
            <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </FadeUp>
          <div className="showrooms">
            {showrooms.map((s, i) => (
              <FadeUp className="showroom" key={s.name} delay={i * 0.08}>
                <b>{s.name}</b>
                <span>{s.address}, {s.city}</span>
                <em>{s.hours}</em>
              </FadeUp>
            ))}
          </div>
        </div>
        <FadeUp as="form" className="form" onSubmit={onSubmit} delay={0.1}>
          <div className={`field ${flash ? 'flash' : ''}`}>
            <select id="modele" name="modele" value={model} onChange={e => setModel(e.target.value)}>
              <option value="">Je ne sais pas encore, conseillez-moi</option>
              {systems.map(s => <option key={s.ref} value={s.ref}>{s.ref}</option>)}
            </select>
            <label htmlFor="modele">Modèle</label>
          </div>
          <div className="row">
            <div className="field">
              <select id="projet" name="projet" defaultValue={projets[0]}>{projets.map(p => <option key={p}>{p}</option>)}</select>
              <label htmlFor="projet">Type de projet</label>
            </div>
            <div className="field">
              <select id="finition" name="finition" defaultValue={finishes[0].name}>
                {finishes.map(f => <option key={f.id}>{f.name}</option>)}
                <option>Autre RAL</option>
              </select>
              <label htmlFor="finition">Finition</label>
            </div>
          </div>
          <div className="row">
            <div className="field"><input id="longueur" name="longueur" type="number" min="0" step="0.1" inputMode="decimal" placeholder=" " /><label htmlFor="longueur">Longueur (m)</label></div>
            <div className="field"><input id="hauteur" name="hauteur" type="number" min="0" inputMode="numeric" placeholder=" " /><label htmlFor="hauteur">Hauteur (cm)</label></div>
          </div>
          <div className="row">
            <div className="field"><input id="nom" name="nom" placeholder=" " required autoComplete="name" /><label htmlFor="nom">Nom et prénom *</label></div>
            <div className="field"><input id="tel" name="tel" type="tel" placeholder=" " required autoComplete="tel" /><label htmlFor="tel">Téléphone *</label></div>
          </div>
          <div className="row">
            <div className="field"><input id="email" name="email" type="email" placeholder=" " autoComplete="email" /><label htmlFor="email">Email</label></div>
            <div className="field"><input id="ville" name="ville" placeholder=" " autoComplete="address-level2" /><label htmlFor="ville">Ville du chantier</label></div>
          </div>
          <div className="field"><textarea id="message" name="message" rows={3} placeholder=" " /><label htmlFor="message">Précisions (support, accès, délai…)</label></div>
          <input className="hp" name="site_web" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className={`btn btn-lime ${status === 'sending' ? 'is-sending' : ''}`} type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'} <span className="arrow">{status === 'sending' ? <i className="spin" /> : '→'}</span>
          </button>
          <AnimatePresence mode="wait">
            {status === 'sent' && (
              <motion.p key="ok" className="form-status ok" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <b>✓ Demande envoyée.</b> Merci, nous vous recontactons sous 48 h ouvrées.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p key="ko" className="form-status ko" role="alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <b>L'envoi n'a pas abouti.</b> Réessayez, ou appelez-nous au <a href={`tel:${site.phoneLink}`}>{site.phone}</a>.
              </motion.p>
            )}
          </AnimatePresence>
          <p className="form-note">Réponse sous 48 h ouvrées. Devis gratuit et sans engagement.</p>
        </FadeUp>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 0]);
  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>Garde-corps en verre et aluminium sur mesure : balcons, terrasses, piscines, escaliers. Côte d'Azur, Var, Hérault et Gard.</p>
          </div>
          <div>
            <h4>Garde-corps</h4>
            <a href="#poses">Types de pose</a>
            <a href="#catalogue">Catalogue</a>
            <a href="#finitions">Finitions</a>
            <a href="#technique">Technique</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.mainSite} target="_blank" rel="noopener">dekordesign.fr ↗</a>
          </div>
        </div>
        <motion.div className="footer-mark" style={{ y, rotate }} aria-hidden="true"><Monogram color="rgba(155,238,55,.18)" stroke={4} /></motion.div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name} · Tous droits réservés</span>
          <a href="#">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}
