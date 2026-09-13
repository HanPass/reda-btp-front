# Reda BTP — frontend

Maquette autonome Angular 19 du MVP « Salle de bain → Carrelage ».

Les données et règles de personnalisation sont actuellement statiques afin de
valider l'expérience utilisateur sans déployer le backend Spring Boot.

```bash
npm install
npm start
```

## Déploiement Cloudflare

Le projet est configuré pour Workers Static Assets :

```bash
npm run build
npx wrangler deploy
```

Le fichier `wrangler.jsonc` publie `dist/reda-btp-front` en mode SPA.
