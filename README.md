# Evift

> Plateforme de gestion d’événements et de listes de cadeaux pour familles et amis.

---

## Sommaire

- [Evift](#evift)
	- [Sommaire](#sommaire)
	- [Présentation](#présentation)
	- [Prérequis](#prérequis)
	- [Installation et configuration](#installation-et-configuration)
	- [Structure du projet](#structure-du-projet)
	- [Scripts npm utiles](#scripts-npm-utiles)
	- [Lancement en développement](#lancement-en-développement)
	- [Tests](#tests)
	- [Build et mise en production](#build-et-mise-en-production)
	- [Déploiement sur NAS avec Docker \& Portainer](#déploiement-sur-nas-avec-docker--portainer)
	- [Bonnes pratiques \& conseils](#bonnes-pratiques--conseils)

---

## Présentation

Evift vise à simplifier l’organisation d’événements (anniversaires, Noël, etc.) et la gestion des cadeaux, pour rapprocher familles et amis. Ce projet a été initié dans le cadre d’un projet scolaire et continue d’évoluer.

## Prérequis

- [Git](https://git-scm.com/) pour cloner le projet
- [Node.js](https://nodejs.org/) >= 18 (testé avec 20.x)
- [npm](https://www.npmjs.com/) >= 9.8.1
- [Docker](https://www.docker.com/) (pour la production)
- Accès à [Portainer](https://www.portainer.io/) (pour le déploiement sur NAS)

## Installation et configuration

1. **Cloner le projet**
	```bash
	git clone https://github.com/PaulDelamare/Evift.git
	cd evift
	```

2. **Installer les dépendances**
	```bash
	npm install
	```

3. **Configurer les variables d’environnement**
	- Copier `.env.exemple` en `.env` et compléter les valeurs nécessaires :
	  ```bash
	  cp .env.exemple .env
	  # puis éditer .env
	  ```
	- Les clés Google reCAPTCHA sont obligatoires (voir https://www.google.com/recaptcha/about/)

## Structure du projet

```
evift/
├── build/                # Fichiers générés pour la prod (après build)
│   ├── client/           # Fichiers statiques pour le client
│   ├── server/           # Code serveur compilé
│   └── ...
├── src/                  # Code source principal
│   ├── app.html          # Template HTML principal
│   ├── app.d.ts          # Types globaux
│   ├── app.postcss       # Config PostCSS
│   ├── evift.ts          # Entrée principale
│   ├── hooks.server.ts   # Hooks SvelteKit
│   ├── lib/              # Librairies, composants, modèles, stores, etc.
│   │   ├── components/   # Composants Svelte réutilisables
│   │   ├── driver/       # Intégration de driver.js (tours interactifs)
│   │   ├── functions/    # Fonctions utilitaires
│   │   ├── models/       # Modèles TypeScript (User, Event, Gift...)
│   │   ├── server/       # Fonctions côté serveur (API, auth...)
│   │   ├── stores/       # Stores Svelte
│   │   └── validationSchema/ # Schémas de validation Zod
│   └── routes/           # Pages et endpoints SvelteKit
│       ├── auth/         # Authentification, invitations, gifts, events...
│       ├── evift/        # Pages principales de l'app
│       ├── cgu/ legal/ privacy/ error/ # Pages légales et erreurs
│       └── ...
├── static/               # Fichiers statiques accessibles publiquement
├── tests/                # Tests Playwright/Vitest
├── Dockerfile            # Image Docker pour la prod
├── package.json          # Dépendances et scripts
├── vite.config.ts        # Config Vite
├── svelte.config.js      # Config SvelteKit
├── tsconfig.json         # Config TypeScript
└── ...
```

## Scripts npm utiles

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Générer le build de production
- `npm run preview` : Prévisualiser le build localement
- `npm run test` : Lancer tous les tests (Playwright + Vitest)
- `npm run lint` : Vérifier le linting
- `npm run format` : Formatter le code
- `npm run docker:linux` : Builder l’image Docker pour Linux/amd64
- `npm run docker:tar` : Exporter l’image Docker en archive tar

## Lancement en développement

```bash
npm run dev
```
Le site sera accessible sur [http://localhost:5173/](http://localhost:5173/)

## Tests

- **Tests end-to-end** :
  ```bash
  npm run test:integration
  ```
  (Lance Playwright sur le build local)

- **Tests unitaires** :
  ```bash
  npm run test:unit
  ```

## Build et mise en production

1. **Générer le build**
	```bash
	npm run build
	```

2. **Créer l’image Docker (Linux/amd64)**
	```bash
	npm run docker:linux
	```

3. **Exporter l’image Docker en tar**
	```bash
	npm run docker:tar
	```

## Déploiement sur NAS avec Docker & Portainer

1. Se connecter à l’interface Portainer de votre NAS.
2. Aller dans la section « Images » puis « Importer ».
3. Uploader le fichier `image-linux.tar` généré précédemment.
4. Une fois l’image importée, aller dans « Stacks » et mettre à jour la stack correspondante à Evift pour utiliser la nouvelle image.
5. Redémarrer la stack si besoin.


## Bonnes pratiques & conseils

- **Sécurité :** Ne jamais versionner le fichier `.env` avec des secrets.
- **Mises à jour :** Après chaque modification majeure, relancer un build et mettre à jour l’image sur le NAS.
- **Tests :** Toujours lancer les tests avant un déploiement.
- **Logs :** Surveillez les logs de la stack via Portainer pour détecter d’éventuels problèmes.
- **Support :** Pour toute question, ouvrir une issue sur le [repo GitHub](https://github.com/PaulDelamare/Evift).

---

© Projet Evift – Paul Delamare
