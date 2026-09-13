# Reda BTP — frontend

Maquette autonome Angular 19 du MVP « Salle de bain → Carrelage ».

Les données et règles de personnalisation sont actuellement statiques afin de
valider l'expérience utilisateur sans déployer le backend Spring Boot.

La maquette propose un mode France et un mode Maroc, quatre familles de pièces
et sept types de travaux : carrelage, plomberie, peinture, électricité,
ventilation, étanchéité et revêtement de sol. Les recommandations nationales
sont séparées du déroulement technique commun afin de faciliter leur maintenance.

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
