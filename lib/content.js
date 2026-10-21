// ============================================================
//  CONTENU DU SITE — Dekor & Design · Garde-corps
//  Source : catalogue fournisseur « Aluminium Glass Railing 2026 ».
//  « À COMPLÉTER » = provisoire.
// ============================================================

export const site = {
  name: 'Dekor & Design',
  product: 'Garde-corps',
  url: 'https://garde-corps.dekordesign.fr', // À COMPLÉTER : nom de domaine définitif
  phone: '06 86 16 64 09',
  phoneLink: '+33686166409',
  email: 'contact@dekordesign.fr',
  mainSite: 'https://dekordesign.fr',
};

export const showrooms = [
  { name: 'Showroom Cannes', address: '4 boulevard Étienne Astegiano', city: '06150 Cannes', hours: 'Lun – Jeu 9h30 – 18h30 · Ven 9h30 – 12h · Sam 9h30 – 18h30' },
  { name: 'Showroom & dépôt Le Muy', address: "2204 route d'Aix", city: '83490 Le Muy', hours: '2 200 m² de stock' },
  { name: 'Siège', address: '535 avenue André Ampère', city: '34170 Castelnau-le-Lez', hours: 'Hérault · Gard' },
];

// Familles de pose
export const families = [
  {
    id: 'sol', name: 'Profil au sol', short: 'Au sol',
    text: "Le profil se fixe sur la dalle et pince le verre en pied. La solution la plus courante pour balcons, terrasses et toitures.",
    render: 'grs-13', photo: 'grs-13',
  },
  {
    id: 'reglable', name: 'Profil réglable', short: 'Réglable',
    text: "Un sabot réglable rattrape les défauts de planéité et d'aplomb de la dalle : le verre reste parfaitement vertical.",
    render: 'grs-04', photo: 'grs-04',
  },
  {
    id: 'encastre', name: 'Profil encastré', short: 'Encastré',
    text: "Le profil disparaît dans la chape ou le carrelage. Seul le verre émerge du sol : l'effet le plus pur.",
    render: 'grs-19-a', photo: 'grs-19-a',
  },
  {
    id: 'lateral', name: 'Nez de dalle', short: 'Nez de dalle',
    text: "Fixé sur la tranche de la dalle, le profil libère toute la surface du balcon et souligne la façade.",
    render: 'grs-16', photo: 'grs-16',
  },
  {
    id: 'pinces', name: 'Pinces & spigots', short: 'Pinces',
    text: "Des pinces ponctuelles en aluminium tiennent chaque panneau. Idéal pour piscines, jardins et escaliers.",
    render: 'grs-07', photo: 'grs-07',
  },
  {
    id: 'murale', name: 'Fixation murale', short: 'Murale',
    text: "Des fixations à rotule tiennent le verre par le côté, sur un mur ou une trémie d'escalier.",
    render: 'grs-12', photo: 'grs-12',
  },
];

// Épaisseurs de verre feuilleté acceptées (mm)
const T4 = ['10–11,52', '12–13,52', '15–17,52', '19–21,52'];
const T3 = ['12–13,52', '15–17,52', '19–21,52'];
const TP = ['8–9,52', '10–11,52', '12–13,52'];
const TPM = ['10–11,52', '12–13,52', '15–17,52'];
const T16 = ['10,76–11,52', '12,76–13,52', '16,76–17,52'];
const T24 = ['16,76–17,52', '21,52', '24,52'];

// pose : 'plots' = profils de 15 et 30 cm espacés · 'continu' = profil filant sur toute la longueur
export const systems = [
  { ref: 'GRS-01', family: 'sol', pose: 'plots', thick: T4, note: 'Capots clipsés avant et arrière, finition très propre.' },
  { ref: 'GRS-01-L', family: 'sol', pose: 'continu', thick: T4, note: 'Version filante du GRS-01, pour les grandes longueurs.' },
  { ref: 'GRS-02', family: 'sol', pose: 'plots', thick: TP, note: 'Profil arrondi à l’avant, pour verres plus fins.' },
  { ref: 'GRS-02-L', family: 'sol', pose: 'continu', thick: TP, note: 'Version filante du profil arrondi GRS-02.' },
  { ref: 'GRS-03', family: 'sol', pose: 'continu', thick: ['12,76–13,52', '16,76–17,52'], note: 'Profil compact aux lignes droites.' },
  { ref: 'GRS-13', family: 'sol', pose: 'plots', thick: T4, note: 'Profil haut à capots, polyvalent.' },
  { ref: 'GRS-13-L', family: 'sol', pose: 'continu', thick: T4, note: 'Version filante du GRS-13.' },
  { ref: 'GRS-14', family: 'sol', pose: 'continu', thick: T16, note: 'Verre calé par joint coin, montage rapide.' },
  { ref: 'GRS-15', family: 'sol', pose: 'plots', thick: T16, note: 'Profil carré, capots avant et arrière.' },
  { ref: 'GRS-17', family: 'sol', pose: 'continu', thick: T16, note: 'Profil avec platine de fixation intégrée.' },
  { ref: 'GRS-18', family: 'sol', pose: 'plots', thick: T4, note: 'Profil large et robuste.' },
  { ref: 'GRS-18-L', family: 'sol', pose: 'continu', thick: T4, note: 'Version filante du GRS-18.' },
  { ref: 'GRS-19', family: 'sol', pose: 'plots', thick: T24, note: 'Profil haute résistance, jusqu’à 24,52 mm de verre.' },
  { ref: 'GRS-19-L', family: 'sol', pose: 'continu', thick: T24, note: 'Version filante du GRS-19.' },

  { ref: 'GRS-04', family: 'reglable', pose: 'plots', thick: T3, note: 'Sabot réglable pour rattraper l’aplomb.' },
  { ref: 'GRS-04-L', family: 'reglable', pose: 'continu', thick: T3, note: 'Version filante du GRS-04.' },
  { ref: 'GRS-04-S', family: 'reglable', pose: 'plots', thick: T4, note: 'Réglable, capots affleurants.' },
  { ref: 'GRS-04-S-L', family: 'reglable', pose: 'continu', thick: T4, note: 'Version filante du GRS-04-S.' },

  { ref: 'GRS-01-A', family: 'encastre', pose: 'plots', thick: T4, note: 'Version encastrée du GRS-01.' },
  { ref: 'GRS-15-A', family: 'encastre', pose: 'plots', thick: T16, note: 'Version encastrée du GRS-15.' },
  { ref: 'GRS-17-A', family: 'encastre', pose: 'continu', thick: T16, note: 'Version encastrée du GRS-17.' },
  { ref: 'GRS-19-A', family: 'encastre', pose: 'continu', thick: T24, note: 'Encastré haute résistance, jusqu’à 24,52 mm.' },

  { ref: 'GRS-16', family: 'lateral', pose: 'plots', thick: T16, note: 'Fixation en nez de dalle par plots.' },
  { ref: 'GRS-16-L', family: 'lateral', pose: 'continu', thick: T16, note: 'Version filante du GRS-16.' },
  { ref: 'GRS-20', family: 'lateral', pose: 'plots', thick: T24, note: 'Nez de dalle haute résistance, jusqu’à 24,52 mm.' },
  { ref: 'GRS-20-L', family: 'lateral', pose: 'continu', thick: T24, note: 'Version filante du GRS-20.' },

  { ref: 'GRS-05', family: 'pinces', pose: 'pince', thick: TP, note: 'Pince ronde, look discret.' },
  { ref: 'GRS-06', family: 'pinces', pose: 'pince', thick: TP, note: 'Pince carrée aux lignes nettes.' },
  { ref: 'GRS-07', family: 'pinces', pose: 'pince', thick: TPM, note: 'Pince ronde renforcée.' },
  { ref: 'GRS-08', family: 'pinces', pose: 'pince', thick: TPM, note: 'Pince carrée renforcée.' },
  { ref: 'GRS-08-E', family: 'pinces', pose: 'pince', thick: ['16,76–17,52'], note: 'Grande pince pour verres épais.' },
  { ref: 'GRS-08-EL', family: 'pinces', pose: 'pince', thick: ['16,76–17,52'], note: 'Grande pince à fixation latérale.' },
  { ref: 'GRS-09', family: 'pinces', pose: 'pince', thick: ['10–11,52', '12–13,72', '16,76–17,52'], note: 'Spigot sur platine, pour piscines et terrasses.' },
  { ref: 'GRS-10', family: 'pinces', pose: 'pince', thick: ['12,76–13,52', '16,76–17,52'], note: 'Grande pince galbée.' },
  { ref: 'GRS-11', family: 'pinces', pose: 'pince', thick: ['12,76–13,52', '16,76–17,52'], note: 'Grande pince à profil incliné.' },

  { ref: 'GRS-12', family: 'murale', pose: 'point', thick: ['10–11,52', '12–13,52', '15–17,52', '19–21,52', '24,52'], note: 'Fixation murale à rotule, pour escaliers et trémies.' },
].map(s => {
  const slug = s.ref.toLowerCase();
  return { ...s, slug, render: `/img/systemes/${slug}.webp`, photo: `/img/photos/${slug}.webp` };
});

// Photos sans visuel d'ambiance dans le catalogue
export const noPhoto = new Set(['grs-08-e', 'grs-08-el']);

export const poseLabel = {
  plots: 'Plots de 15 et 30 cm',
  continu: 'Profil filant',
  pince: 'Pinces ponctuelles',
  point: 'Fixations murales',
};

// Espacement des plots selon la hauteur du verre
export const spacing = [
  { h: '0 – 599 mm', glass: '10 · 12 · 16 · 20 mm', gap: '550 – 700 mm' },
  { h: '600 – 899 mm', glass: '10 · 12 · 16 · 20 mm', gap: '400 – 550 mm' },
  { h: '900 – 1 099 mm', glass: '16 · 20 mm', gap: '250 – 400 mm' },
  { h: '1 100 – 1 200 mm', glass: '16 · 20 mm', gap: '250 mm' },
];

// Finitions des profils. `filter` : teinte appliquée au rendu 3D pour l'aperçu
export const finishes = [
  { id: 'argent', name: 'Argent', detail: 'Anodisé brillant', color: '#d8dde3', filter: 'none' },
  { id: 'satine', name: 'Satiné', detail: 'Anodisé mat', color: '#e7e2d6', filter: 'grayscale(.4) brightness(1.08) contrast(.92)' },
  { id: 'bronze', name: 'Bronze', detail: 'Anodisé bronze', color: '#b9a688', filter: 'sepia(.85) saturate(1.1) hue-rotate(-8deg) brightness(.82)' },
  { id: 'bois', name: 'Effet bois', detail: 'Laquage décor bois', color: '#a8673a', filter: 'sepia(1) saturate(2.4) hue-rotate(-18deg) brightness(.62) contrast(1.15)' },
  { id: '7016', name: 'RAL 7016', detail: 'Gris anthracite', color: '#383e42', filter: 'grayscale(1) brightness(.42) contrast(1.35)' },
  { id: '9005', name: 'RAL 9005', detail: 'Noir foncé', color: '#16181b', filter: 'grayscale(1) brightness(.22) contrast(1.5)' },
];

export const uses = [
  { id: 'balcon', label: 'Balcons', photo: 'grs-01-l' },
  { id: 'terrasse', label: 'Terrasses & rooftops', photo: 'grs-13-l' },
  { id: 'piscine', label: 'Piscines', photo: 'grs-20' },
  { id: 'jardin', label: 'Jardins', photo: 'grs-04-s' },
  { id: 'facade', label: 'Façades', photo: 'grs-17' },
  { id: 'escalier', label: 'Escaliers', photo: 'grs-12' },
];

export const steps = [
  { title: 'Conseil', text: 'En showroom ou à distance, nous choisissons ensemble le système, le verre et la finition.' },
  { title: 'Prise de cotes', text: 'Longueurs, hauteur, type de support : chaque garde-corps est calculé pour votre projet.' },
  { title: 'Fabrication', text: 'Profils coupés à vos dimensions, verres feuilletés trempés sur mesure.' },
  { title: 'Livraison & pose', text: 'Livraison depuis notre dépôt du Muy, pose sur demande.' }, // À COMPLÉTER : confirmer l'offre de pose
];

export const specs = [
  { k: 'Profils', v: 'Aluminium extrudé selon EN 755, EN 755-9 et EN 12020' },
  { k: 'Joints', v: '100 % EPDM, intérieurs et extérieurs' },
  { k: 'Anodisation', v: '10 à 12 microns, brillant ou bronze' },
  { k: 'Thermolaquage', v: 'Toutes teintes RAL, peinture certifiée' },
  { k: 'Verre', v: 'Feuilleté de 8 à 24,52 mm selon le système' },
  { k: 'Main courante', v: 'Ronde ou carrée, recommandée pour protéger le chant du verre' },
];
