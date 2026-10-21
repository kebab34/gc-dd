import { Outfit, Inter, Josefin_Sans } from 'next/font/google';
import { site, systems } from '@/lib/content';
import './globals.css';

const display = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const brand = Josefin_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-brand', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: 'Garde-corps en verre & aluminium sur mesure | Dekor & Design',
  description: `Dekor & Design : ${systems.length} systèmes de garde-corps vitrés pour balcons, terrasses, piscines et escaliers. Pose au sol, encastrée, en nez de dalle ou sur pinces. Showrooms à Cannes et au Muy. Devis gratuit.`,
  keywords: ['garde-corps verre', 'garde-corps aluminium', 'garde-corps balcon', 'garde-corps piscine', 'garde-corps terrasse', 'garde-corps Cannes', 'garde-corps Var', 'rambarde verre', 'balustrade verre'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'fr_FR', title: 'Garde-corps en verre – Dekor & Design', description: 'La vue, sans limite.', images: ['/img/photos/grs-01-a.webp'] },
  icons: { icon: '/favicon.svg' },
};

export const viewport = { themeColor: '#0b0d0e' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeGoodsStore',
  name: `${site.name} – Garde-corps`,
  url: site.url,
  telephone: site.phoneLink,
  email: site.email,
  address: { '@type': 'PostalAddress', streetAddress: '4 boulevard Étienne Astegiano', postalCode: '06150', addressLocality: 'Cannes', addressCountry: 'FR' },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Garde-corps en verre', itemListElement: systems.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: `Garde-corps ${s.ref}` } })) },
};

// Avant affichage : l'intro du logo ne se joue qu'une fois par visite
const introScript = `try{if(sessionStorage.getItem('dd-intro-seen'))document.documentElement.classList.add('skip-intro')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${brand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
