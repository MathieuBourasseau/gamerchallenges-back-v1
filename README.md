# ⚙️ Gamer Challenges - API REST (Backend)

Bienvenue sur le dépôt Back-end de **Gamer Challenges**. Cette API fournit l'ensemble de la logique métier, la gestion des données et les services d'authentification pour la plateforme de défis consacrée aux jeux vidéo.

---

## 🛠️ Stack Technique

* **Environnement :** Node.js (Runtime)
* **Framework :** Express.js
* **Base de données :** PostgreSQL (SGBDR)
* **ORM :** Sequelize (Gestion des modèles, associations et migrations)
* **Tests :** Jest (Tests unitaires et contrôleurs)

---

## 🔒 Sécurité & Validation

L'API intègre plusieurs couches de protection pour garantir l'intégrité des données :
* **Authentification :** JSON Web Tokens (JWT) avec middleware de vérification.
* **Validation de Schémas :** Utilisation de **Joi** pour valider chaque entrée utilisateur (Payload) avant traitement.
* **Sécurisation des Mots de Passe :** Hachage robuste via **Argon2**.
* **Protection XSS :** Middleware `express-xss-sanitizer` pour nettoyer les entrées utilisateur.
* **CORS :** Configuration restrictive des origines autorisées.
* **Uploads :** Middleware de gestion pour le stockage sécurisé des avatars utilisateurs.

---

## 📂 Structure du Projet (Modèle MVC)

L'architecture est organisée de manière modulaire pour une séparation claire des responsabilités :

* **`/Controllers`** : Logique métier de l'application (Auth, Challenges, Votes, Rankings, etc.).
* **`/Models`** : Définition des schémas de données et configuration du client Sequelize.
* **`/Routers`** : Définition des points d'entrée (Endpoints) de l'API REST.
* **`/Middlewares`** : Fonctions de filtrage (Authentification, validation, upload d'avatars).
* **`/Schemas`** : Définitions des schémas Joi pour la validation rigoureuse des données entrantes.
* **`/Migrations`** : Scripts automatisés pour la création des tables et le remplissage initial (**Seeding**).
* **`/Docs`** : Documentation technique incluant le **MCD** (Modèle Conceptuel), le **MLD** (Logique) et le dictionnaire de données.
* **`/uploads`** : Stockage des ressources média (images de profil).
* **`/utils`** : Utilitaires globaux (ex: gestion centralisée des codes de statut HTTP).

---

## 🚀 Procédure de Déploiement & Initialisation

L'API est conçue pour être mise en service rapidement grâce aux scripts d'automatisation inclus dans le `package.json`.

### 1. Préparation de l'environnement
* Installer les dépendances : `npm install`
* Configurer le fichier `.env` à partir du modèle `.env.example` (identifiants PostgreSQL, Secret JWT, etc.).

### 2. Gestion de la base de données
Nous utilisons des scripts personnalisés pour piloter Sequelize et structurer la base de données PostgreSQL :

* **Création des tables** : `npm run db:create` (Exécute les scripts de définition des modèles).
* **Remplissage (Seed)** : `npm run db:seed` (Insère les données de test : jeux, défis, utilisateurs).
* **Réinitialisation complète** : `npm run db:reset` (Enchaîne la création et le seeding pour repartir sur une base propre).

### 3. Lancement du serveur
* **Mode Production** : `npm start`
* **Mode Développement** : `npm run dev` (Utilise l'option `--watch` de Node.js pour un rechargement automatique à chaque modification).

---

## 🧪 Tests & Qualité

La fiabilité du serveur est assurée par une suite de tests automatisés :
* **Configuration :** `jest.config.js`
* **Exécution :** `npm test`
* Les contrôleurs et routes critiques (ex: `game.controller.test.js`) sont couverts pour garantir l'absence de régression.

---

## 🔗 Lien vers le Frontend

Le client React consommant cette API est disponible ici : [Gamer Challenges - Frontend](https://github.com/MathieuBourasseau/gamerchallenges-front-v1)
