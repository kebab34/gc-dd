// ============================================================
//  INFORMATIONS LÉGALES — Mentions légales & politique de confidentialité
//  Source : registre national des entreprises (recherche-entreprises.api.gouv.fr).
//  « À COMPLÉTER » = information obligatoire encore manquante.
// ============================================================

export const company = {
  name: 'DEKOR ET DESIGN',
  brand: 'Dekor & Design',
  form: 'Société par actions simplifiée (SAS)',
  capital: 'À COMPLÉTER', // ex. « 10 000 € »
  siren: '929 726 941',
  siret: '929 726 941 00016',
  rcs: 'RCS Montpellier 929 726 941',
  vat: 'FR58929726941',
  naf: '46.73A – Commerce de gros de bois et de matériaux de construction',
  address: '535 avenue André Ampère, 34170 Castelnau-le-Lez, France',
  publisher: 'À COMPLÉTER', // directeur de la publication : nom et prénom du représentant légal (obligatoire)
  mediator: 'À COMPLÉTER', // médiateur de la consommation : nom, site web (obligatoire pour la vente aux particuliers)
};

export const host = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
  site: 'https://vercel.com',
};

export const processors = [
  { name: 'Vercel Inc.', role: 'Hébergement du site', where: 'États-Unis (serveurs mondiaux)' },
  { name: 'EmailJS Pte. Ltd.', role: "Transmission des demandes envoyées par le formulaire", where: 'Singapour, serveurs aux États-Unis' },
  { name: 'Hostinger International Ltd.', role: 'Messagerie électronique de réception des demandes', where: 'Chypre (Union européenne)' },
];

export const lastUpdate = '21 octobre 2026';
