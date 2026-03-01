# GamerChallenges – Brainstorming / Journal de bord / KoiKonFait ? 😉😉 "clin d'œil, clin d'œil"

## Journal de bord

> Notes quotidiennes : tâches réalisées, difficultés, décisions, questions, idées.  
> **À chaque fin de journée : ne pas oublier de mettre à jour le Trello.**

### 27/02/2026

- ## **Tâches réalisées :**

* Analyse du backend et vérification des routes (`/challenges`, `/games`, `/users`)
* Correction du seeding : association systématique des challenges aux jeux via `setGame()`

- ## **Difficultés rencontrées :**

* Lier le Front et le Back

---

### 01/03/2026

- ## **Tâches réalisées :**

Sur une nouvelle branche `feat/my-challenges` mise en place d'un fichier `user.controller.js` avec deux méthodes pour le moment `getChallengesByUser` et `getParticipationsByUser`, un autre pour les routes `user.router.js` et de deux nouvelles routes dans celui-ci obtenir les challenges crées par un user et les participations d'un user .
Un peu de seeding aussi pour associer quelques paricipations à certains users..

j'ai bien mis les routes dans le `index.js` du dossier `Routers` pour que ça soit pris en compte. Et pareil pour les controllers.
