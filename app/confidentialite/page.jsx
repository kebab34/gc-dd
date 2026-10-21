import LegalPage from '@/components/LegalPage';
import { company, processors } from '@/lib/legal';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Politique de confidentialité & cookies | Dekor & Design – Garde-corps',
  description: 'Comment Dekor & Design traite les données envoyées par le formulaire de devis, vos droits RGPD et notre usage des cookies.',
  alternates: { canonical: '/confidentialite/' },
};

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité & cookies">
      <p>Nous attachons une grande importance à la protection de vos données. Cette page explique, conformément au Règlement général sur la protection des données (RGPD, UE 2016/679) et à la loi « Informatique et Libertés », quelles données nous collectons, pourquoi, et quels sont vos droits.</p>

      <h2>1. Responsable du traitement</h2>
      <p>{company.name} ({company.brand}), {company.form}, {company.address}, {company.rcs}. Contact : <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phoneLink}`}>{site.phone}</a>.</p>

      <h2>2. Données collectées</h2>
      <p>Nous ne collectons que les données que vous saisissez dans le <b>formulaire de devis</b> :</p>
      <ul>
        <li>nom et prénom, téléphone (obligatoires) ;</li>
        <li>email, ville du chantier (facultatifs) ;</li>
        <li>informations sur votre projet : modèle, type de projet, finition, longueur, hauteur, précisions.</li>
      </ul>
      <p>Aucune donnée n'est collectée à votre insu : le site ne contient ni outil de mesure d'audience, ni publicité, ni bouton de réseau social.</p>

      <h2>3. Finalités et base légale</h2>
      <table className="legal-table">
        <thead><tr><th>Finalité</th><th>Base légale</th><th>Durée de conservation</th></tr></thead>
        <tbody>
          <tr><td>Répondre à votre demande et établir un devis</td><td>Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)</td><td>3 ans après notre dernier échange</td></tr>
          <tr><td>Suivi de la relation si vous devenez client</td><td>Exécution du contrat (art. 6.1.b)</td><td>Durée du contrat, puis 5 ans (prescription)</td></tr>
          <tr><td>Obligations comptables (factures)</td><td>Obligation légale (art. 6.1.c)</td><td>10 ans</td></tr>
        </tbody>
      </table>
      <p>Vos données ne sont jamais vendues ni utilisées à des fins publicitaires.</p>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>Vos données sont destinées uniquement aux équipes commerciales de {company.brand}. Pour fonctionner, le site fait appel aux prestataires suivants, qui agissent pour notre compte :</p>
      <table className="legal-table">
        <thead><tr><th>Prestataire</th><th>Rôle</th><th>Localisation</th></tr></thead>
        <tbody>{processors.map(p => <tr key={p.name}><td>{p.name}</td><td>{p.role}</td><td>{p.where}</td></tr>)}</tbody>
      </table>

      <h2>5. Transferts hors de l'Union européenne</h2>
      <p>L'hébergeur du site et le service de transmission du formulaire traitent des données aux États-Unis. Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne et, le cas échéant, par le Data Privacy Framework UE–États-Unis.</p>

      <h2>6. Vos droits</h2>
      <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Pour les exercer, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou par courrier au siège social, en précisant votre demande. Nous répondons sous un mois.</p>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL : <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">cnil.fr/fr/plaintes</a>.</p>

      <h2>7. Sécurité</h2>
      <p>Le site est servi exclusivement en HTTPS. Les demandes sont transmises de façon chiffrée et ne sont pas stockées sur le site lui-même.</p>

      <h2 id="cookies">8. Cookies et traceurs</h2>
      <p><b>Ce site ne dépose aucun cookie publicitaire, de mesure d'audience ou de réseau social.</b> C'est pourquoi aucun bandeau de consentement ne vous est présenté : il n'y a rien à accepter ni à refuser.</p>
      <p>Seul un élément strictement nécessaire est utilisé, exempté de consentement selon les lignes directrices de la CNIL :</p>
      <table className="legal-table">
        <thead><tr><th>Nom</th><th>Type</th><th>Finalité</th><th>Durée</th></tr></thead>
        <tbody>
          <tr><td>dd-intro-seen</td><td>Stockage de session du navigateur (sessionStorage)</td><td>Ne pas rejouer l'animation d'ouverture à chaque page</td><td>Supprimé à la fermeture de l'onglet</td></tr>
        </tbody>
      </table>
      <p>Les polices de caractères et les images sont hébergées sur nos propres serveurs : aucune donnée n'est transmise à Google ou à un tiers lors de votre visite. Comme tout hébergeur, Vercel enregistre des journaux techniques (adresse IP, date, page demandée) pour la sécurité et le bon fonctionnement du service.</p>
      <p>Si nous ajoutions un jour des outils de mesure d'audience ou des contenus tiers, un bandeau vous permettrait de les accepter ou de les refuser, et cette page serait mise à jour.</p>

      <h2>9. Modifications</h2>
      <p>Cette politique peut évoluer. La date de dernière mise à jour figure en haut de la page.</p>
    </LegalPage>
  );
}
