import LegalPage from '@/components/LegalPage';
import { company, host } from '@/lib/legal';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Mentions légales | Dekor & Design – Garde-corps',
  description: "Mentions légales du site garde-corps de Dekor & Design : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: '/mentions-legales/' },
};

// Information pas encore fournie : mention neutre en attendant (la valeur se règle dans lib/legal.js)
const Missing = ({ v }) => (v.startsWith('À COMPLÉTER') ? <em className="legal-pending">Information en cours de mise à jour</em> : v);

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <p>Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations relatives au site <b>{site.url.replace('https://', '')}</b>.</p>

      <h2>Éditeur du site</h2>
      <dl className="legal-dl">
        <dt>Raison sociale</dt><dd>{company.name} (nom commercial : {company.brand})</dd>
        <dt>Forme juridique</dt><dd>{company.form}</dd>
        <dt>Capital social</dt><dd><Missing v={company.capital} /></dd>
        <dt>Siège social</dt><dd>{company.address}</dd>
        <dt>SIREN / SIRET</dt><dd>{company.siren} / {company.siret}</dd>
        <dt>Immatriculation</dt><dd>{company.rcs}</dd>
        <dt>TVA intracommunautaire</dt><dd>{company.vat}</dd>
        <dt>Activité (NAF)</dt><dd>{company.naf}</dd>
        <dt>Téléphone</dt><dd><a href={`tel:${site.phoneLink}`}>{site.phone}</a></dd>
        <dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
        <dt>Directeur de la publication</dt><dd><Missing v={company.publisher} /></dd>
      </dl>

      <h2>Hébergeur</h2>
      <p>{host.name}, {host.address} — <a href={host.site} target="_blank" rel="noopener">{host.site.replace('https://', '')}</a></p>

      <h2>Propriété intellectuelle</h2>
      <p>La structure du site, ses textes, son graphisme et le logo {company.brand} sont protégés par le droit de la propriété intellectuelle. Les visuels des produits restent la propriété de leurs auteurs respectifs. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite.</p>

      <h2>Informations sur les produits</h2>
      <p>Les rendus, photos et caractéristiques présentés sont donnés à titre indicatif et ne constituent pas une offre contractuelle. Le choix du système, de l'épaisseur du verre et de la hauteur est validé au moment du devis, selon votre projet et la réglementation applicable. Les prix et conditions de vente figurent sur chaque devis.</p>

      <h2>Médiation de la consommation</h2>
      <p>Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige non résolu avec notre service client, le consommateur peut recourir gratuitement au médiateur de la consommation suivant : <Missing v={company.mediator} />. Il peut également utiliser la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>

      <h2>Données personnelles et cookies</h2>
      <p>Le traitement des données transmises par le formulaire de devis et l'utilisation des cookies sont décrits dans notre <a href="/confidentialite/">politique de confidentialité & cookies</a>.</p>

      <h2>Droit applicable</h2>
      <p>Les présentes mentions sont régies par le droit français. Tout litige relève de la compétence des tribunaux français.</p>
    </LegalPage>
  );
}
