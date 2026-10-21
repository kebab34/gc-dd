import Logo from './Logo';
import { site } from '@/lib/content';
import { lastUpdate } from '@/lib/legal';

// Gabarit commun aux pages légales : simple, lisible, sans animation
export default function LegalPage({ title, children }) {
  return (
    <div className="legal">
      <header className="legal-head">
        <div className="container legal-bar">
          <a href="/" aria-label="Retour à l'accueil"><Logo /></a>
          <a href="/" className="link-arrow legal-back"><span>←</span> Retour au site</a>
        </div>
      </header>
      <main className="container legal-body">
        <span className="eyebrow">Informations légales</span>
        <h1>{title}</h1>
        <p className="legal-date">Dernière mise à jour : {lastUpdate}</p>
        {children}
      </main>
      <footer className="legal-foot">
        <div className="container legal-bar">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <nav>
            <a href="/mentions-legales/">Mentions légales</a>
            <a href="/confidentialite/">Confidentialité & cookies</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
