## Gamer Challenges BACKEND

## Présentation
Le backend constitue la partie serveur de l’application. Il permet de gérer les utilisateurs, les
challenges, ainsi que toutes les interactions avec la base de données PostgreSQL. Il expose une
API REST consommée par le frontend que vous pouvez trouver ici : https://github.com/MathieuBourasseau/gamerchallenges-front

## Technologies utilisées
- Node.js
- Express
- PostgreSQL
- Sequelize
  
## Installation
- Se placer dans le dossier backend puis installer les dépendances :
npm install

## Variables d’environnement
- Créer un fichier .env :
- DB_URL=postgresql://user:password@host:port/database
- PORT=3000
- JWT_SECRET=your_secret_key --> il faut mettre votre propre key

## Base de données
Connexion à PostgreSQL :
- psql -U postgres
- CREATE ROLE gamer WITH LOGIN PASSWORD 'gamer';
- CREATE DATABASE gamer OWNER gamer;
- Quitter avec \q

## Initialisation
npm run db:reset

## Lancement
npm run dev

## API
Exemple de routes :
- GET /users
- POST /users
- GET /users/:id/challenges

## Tests
- Le projet utilise Jest pour les tests :
npm run test

## Déploiement
Variables en production :
- DB_URL=postgresql://user:password@host:port/database
- PORT=3000
