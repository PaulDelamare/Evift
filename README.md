# Evift

Bienvenue sur Evift. Evift a pour ambition de faciliter les organisations d'événement familiaux ou avec ses amis en simplifiant la gestion de l'événement et des cadeaux comme pour les anniversaires ou Noël. En simplifiant l'organisation, Evift a pour objectif de rapprocher les familles et amis qui n'osent pas se voir à cause de la difficulté d'organisation générale.

Ceci est une première version. De nombreuses améliorations et nouveautés seront ajoutées dans le futur pour améliorer au mieux l'expérience utilisateur et la gestion des événements.

Ce projet a été réalisé dans le cadre d'un projet scolaire.

## Prérequis

- Posséder git pour récupérer le projet

- Posséder node pour avoir accès à la commande npm

## Récupérer le projet

Récupérer le projet à l'aide de la commande :

```bash
git clone https://github.com/PaulDelamare/Evift.git
```

Puis ensuite rentrer dans le projet avec :

```bash
cd evift
```

## Installer les dépendances

Pour le bon fonctionnement du site, il faut tout d'abord installer les dépendances sinon il se produira des erreurs. Faites le avec la commande :

```bash
npm install
```

## Ajouter le .env

Il ne faut pas oublier non plus d'ajouter le .env dans le projet. Ce fichier regroupe les informations importantes et secrètes du projet. Vous pouvez retrouver un exemple de ce qu'il faut remplir dans se .env dans le .env.exemple. Il faut donc ensuite adapter les données avec vos informations.

> Le projet utilise le système de Google pour éviter les robots. Il faut donc que vous alliez chercher votre clef sur https://www.google.com/recaptcha/about/

## Lancer le site

Une fois, toutes ces étapes réalisées (si vous avez également récupéré l'api) il ne vous reste plus qu'à lancer le site avec la commande :

```bash
npm run dev
```

Le site se lancera sur l'URL : http://localhost:5173/
