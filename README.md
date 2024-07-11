# Evift

Bienvenue sur Evift. Evift a pour ambition de faciliter les organsations d'événement familiiaux ou avec ses amis en simplifiant la gestion de l'événement et des cadeaux comme pour les anniversaire ou noël. En simplifiant l'organisation, Evift a pour objectif de rapprocher les familles et amis qui n'ose pas se voir à cause de la difficulté d'organisation générale.

Ceci est une première version. de nombreuse amélioration et nouveautés seront ajouté dans le futur pour améliorer au mieux l'expérience utilisateur et la gestion des événement.

Ce projet a été réalisé dans le cadre d'un projet scolaire.

## Prérequis

- Posséder git pour récupérer le projet

- Posséder node pour avoir accès à la commande npm

## Récupérer le projet

Récupérer le projet à l'aide de la commande :

```bash
git clone https://github.com/PaulDelamare/Evift.git
```

puis ensuite rentrer dans le projet avec :

```bash
cd evift
```

## Installer les dépendances

Pour le bon fonctionnement du site, il faut tout d'abord installer les dépendance sinon il se produira des erreurs. Faites le avec la commande :

```bash
npm install
```

## Ajouter le .env

Il ne faut pas oublier non plus d'ajouter le .env dans le projet. Ce fichier regroupe les informations importantes et secrète du projet. Vous pouvez retrouvez un exemple de ce qu'il faut remplir dans ce .env dans le .env.exemple. Il faut donc ensuite adapter les données avec vos informations.

> Le projet utilise le système de google pour éviter les robots. Il faut donc que vous alliez chercher votre clef sur https://www.google.com/recaptcha/about/

## Lancer le site

Une fois toutes ces étapes faites (si vous avez également récupérer l'api) il ne vous reste plus qu'à lancer le site avec le commande : 

```bash
npm run dev
```

Le site se lancera sur l'url : http://localhost:5173/