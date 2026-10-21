# Dekor & Design — Garde-corps

Site React (Next.js + Framer Motion), page unique, généré en statique.

## Lancer en local
```bash
npm install
npm run dev      # http://localhost:3000
```

## Modifier les contenus
Tout est dans **`lib/content.js`** : coordonnées, showrooms, les 36 systèmes (référence, famille,
épaisseurs de verre, description), finitions, tableau d'espacement, étapes.

Images : `public/img/systemes/` (rendus 3D transparents), `public/img/photos/` (ambiances),
nommées d'après la référence (`grs-04-s.webp`…).

## Mettre en ligne
`npm run build` crée le dossier `out/`. Sur Vercel : importer le dossier, aucun réglage.

## À compléter
- Nom de domaine (`site.url`)
- Confirmer l'offre de pose (étape 4 de « Votre projet »)

## Formulaire de devis (EmailJS)
Le formulaire envoie les demandes via EmailJS. Sans clés, il ouvre la messagerie du visiteur.

1. Créer un compte sur https://www.emailjs.com (offre gratuite : 200 emails / mois).
2. **Email Services** → *Add New Service* → connecter la boîte qui enverra les emails → noter le **Service ID**.
3. **Email Templates** → *Create New Template* :
   - **Subject** : `Devis garde-corps – {{modele}} – {{nom}}`
   - **To Email** : les adresses de réception, séparées par une virgule (toutes reçoivent chaque demande)
   - **Reply To** : `{{email}}` (pour répondre directement au client)
   - **Content** : coller le contenu de `docs/emailjs-modele.html` (bouton « Edit Content » → code)
   - noter le **Template ID**.
4. **Account** → **Public Key**.
5. Copier `.env.example` en `.env.local` et remplir les 3 valeurs, puis `npm run build`.
   Sur Vercel : *Settings → Environment Variables*, mêmes noms, puis redéployer.
6. Conseillé : dans EmailJS, *Account → Security* : limiter aux domaines du site.

Les adresses de réception sont dans EmailJS, pas dans le code : elles n'apparaissent pas sur le site.
