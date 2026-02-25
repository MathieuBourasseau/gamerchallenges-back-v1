# Dictionnaire de Données

## 1. Table : user
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant unique de l'utilisateur |
| username | VARCHAR(50) | - | Nom d'utilisateur / Pseudonyme |
| email | VARCHAR(255) | - | Adresse e-mail de contact |
| password | VARCHAR(255) | - | Mot de passe sécurisé |
| avatar | TEXT | - | Lien vers l'image de profil |
| favourite game | VARCHAR(50) | - | Jeu préféré de l’utilisateur |
| social1 | TEXT | - | Lien vers réseau social de l’utilisateur |
| social2 | TEXT | - | Lien vers réseau social de l’utilisateur |
| social3 | TEXT | - | Lien vers réseau social de l’utilisateur |
| role | VARCHAR(50) | - | Rôle ou niveau d'accès (ex: admin, player) |

## 2. Table : game
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant unique du jeu |
| title | VARCHAR(50) | - | Titre complet du jeu |
| genre | VARCHAR(50) | - | Catégorie ou genre du jeu |
| release_year | DATE | - | Année ou date de sortie officielle |
| cover | TEXT | - | URL de l'image de couverture |
| description | TEXT | - | Synopsis ou détails du jeu |

## 3. Table : challenge
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant unique du challenge |
| name | VARCHAR(50) | - | Nom du défi |
| description | TEXT | - | Détails et règles du défi |
| user_id | INT | FK (user), NOT NULL | Créateur du challenge |
| game_id | INT | FK (game), NOT NULL | Jeu associé au challenge |

## 4. Table : participation
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant unique de la participation |
| title | VARCHAR(100) | - | Titre de la soumission de l'utilisateur |
| url | TEXT | - | Lien vers la preuve de réussite (vidéo/image) |
| challenge_id | INT | FK (challenge), NOT NULL | Challenge concerné |

## 5. Table : note_participation
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant de la note |
| user_id | INT | FK (user), NOT NULL | Utilisateur ayant voté |
| participation_id | INT | FK (participation), NOT NULL | Participation cible |

## 6. Table : note_challenge
| Champ | Type | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| id | INT | PK | Identifiant de la note |
| user_id | INT | FK (user), NOT NULL | Utilisateur ayant voté |
| challenge_id | INT | FK (challenge), NOT NULL | Challenge cible |

