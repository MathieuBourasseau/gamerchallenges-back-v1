import { User, Challenge, Participation, Game, sequelize } from "../app/models/index.js";
import argon2 from "argon2";

console.log("🚧 Insertion des données de seed dans les tables");

// Users creation
const user1 = await User.create({
    username: "alice",
    mail: "alice@example.com",
    password: await argon2.hash("password1"),
    role: "admin",
    avatar : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flepassetempsderose.l.e.pic.centerblog.net%2Fo%2Faed26788.jpg&f=1&nofb=1&ipt=dcdddae0fc7ca8ba1ecbab1ddb781f74146d86320a8c3c9d0f322f168c2ef69e"
});
const user2 = await User.create({
    username: "bob",
    mail: "bob@example.com",
    password: await argon2.hash("password2"),
    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fdropthespotlight.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fundertaker.jpg%3Ffit%3D960%2C960%26ssl%3D1&f=1&nofb=1&ipt=45e1f3a51c6b2de757328c1a113837158609da227d68b8ad53e2d664c3c671c3",
    youtube: "https://www.youtube.com/",
    twitch: "https://www.twitch.tv/",
    discord: "https://discord.com/"

});
const user3 = await User.create({
    username: "charlie",
    mail: "charlie@example.com",
    password: await argon2.hash("password3"),
    isBanned: true,
    avatar : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstaticg.sportskeeda.com%2Feditor%2F2023%2F04%2F5a0bc-16823053913430-1920.jpg&f=1&nofb=1&ipt=cf54f2619dae66f5d9df9d4863327807f248782c2307ec1e1c8a8a701b750cdd"
});
const user4 = await User.create({
    username: "david",
    mail: "david@example.com",
    password: await argon2.hash("password4"),
    avatar : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmario.wiki.gallery%2Fimages%2F1%2F15%2FPlay_Nintendo_Mario_Profile.png&f=1&nofb=1&ipt=23e580afb4f05a902b75840aae4373eae24833972e1e8688515452c854b1ae8b",
    
});

// Games creation
const game1 = await Game.create({
    title: "CYBERPUNK 2077",
    description: "Cyberpunk 2077 est un jeu vidéo de rôle et d’action en monde ouvert développé par CD Projekt Red, situé dans la mégalopole futuriste de Night City, le joueur incarne V, un mercenaire à la recherche d’un implant unique qui pourrait offrir l’immortalité, le jeu propose des quêtes principales et secondaires, un système de personnalisation avancé du personnage, des choix moraux impactant l’histoire, et des combats mêlant armes à feu, piratage et capacités cybernétiques.",
    genre: "Action-RPG, monde ouvert",
    release_year: new Date('2020'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaam3.webp"
});
const game2 = await Game.create({
    title: "GTA VI",
    description: "Plongez dans l'univers de Grand Theft Auto VI, la dernière itération de la saga emblématique de Rockstar Games. Situé dans l'État fictif de Leonida, inspiré de la Floride, le jeu vous invite à explorer des environnements variés, allant des plages animées de Vice City aux marais mystérieux des Leonida Key",
    genre: "Action-aventure",
    release_year: new Date('2026'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rwo.webp"
});
const game3 = await Game.create({
    title: "ANIMAL CROSSING: NEW HORIZONS",
    description: "Dans Animal Crossing: New Horizons, le joueur incarne un personnage qui emménage sur une île déserte, avec pour objectif de créer et personnaliser son village idéal. Le jeu propose un cycle jour/nuit et saisons dynamiques, des interactions avec des villageois animaux, la pêche, la chasse aux insectes, la décoration et la gestion des ressources. Grâce à son rythme relaxant et sa liberté totale, le jeu offre une expérience immersive et créative, idéale pour les joueurs de tous âges.",
    genre: "Simulation de vie",
    release_year: new Date('2020'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wls.webp"
});
const game4 = await Game.create({
    title: "MARIO KART 8",
    description: "Mario Kart est un jeu de course emblématique où les personnages de l’univers Nintendo s’affrontent sur des circuits hauts en couleur. Les joueurs peuvent utiliser des objets spéciaux pour ralentir leurs adversaires ou se propulser en tête de course, rendant chaque partie imprévisible et dynamique. Avec de nombreux circuits, modes de jeu variés et un mode multijoueur en ligne ou local, Mario Kart offre une expérience accessible, compétitive et divertissante pour tous les âges.",
    genre: "Course, multijoueur",
    release_year: new Date('2023'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co213q.webp"
});
const game5 = await Game.create({
    title: "RED DEAD REDEMPTION 2",
    description: "Red Dead Redemption 2 plonge le joueur dans l’Ouest américain à la fin du XIXᵉ siècle. Vous incarnez Arthur Morgan, membre du gang de Dutch van der Linde, naviguant entre loyauté et survie dans un monde ouvert vivant et immersif. Le jeu propose des quêtes principales et secondaires, des interactions riches avec les personnages, des activités variées (chasse, pêche, équitation) et un scénario profond mêlant action, drame et exploration. L’expérience combine liberté, réalisme et narration cinématographique, offrant une immersion totale dans l’univers du Far West.",
    genre: "Action-aventure",
    release_year: new Date('2018'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp"
});
const game6 = await Game.create({
    title: "DAYS GONE",
    description: "Dans Days Gone, vous incarnez Deacon St. John, un ancien membre d’un gang de motards, qui tente de survivre dans un monde post-apocalyptique ravagé par une pandémie transformant les humains en créatures appelées “Freakers”. Le jeu propose un vaste monde ouvert à explorer, des combats contre les Freakers et d’autres survivants, ainsi que la gestion de ressources et de véhicules. Avec son atmosphère immersive, son scénario centré sur la survie et ses choix moraux, Days Gone offre une expérience intense et cinématographique dans un environnement hostile et impitoyable.",
    genre: "Action-aventure, survie",
    release_year: new Date('2019'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co94bn.webp"
});
const game7 = await Game.create({
    title: "NARUTO SHIPPUDEN: ULTIMATE NINJA STORM",
    description: "Naruto Shippuden: Ultimate Ninja Storm est un jeu de combat qui plonge le joueur dans l’univers du célèbre manga Naruto. Incarnez Naruto, Sasuke et d’autres personnages emblématiques et participez à des combats dynamiques en 3D, fidèles aux techniques et jutsus de la série. Le jeu propose des modes solo et multijoueur, des cinématiques immersives racontant les arcs principaux du manga, et un gameplay mêlant stratégie, vitesse et combos spectaculaires. Grâce à ses graphismes colorés et son ambiance fidèle à l’anime, Naruto Storm offre une expérience divertissante pour les fans de la saga et les amateurs de jeux de combat.",
    genre: "Combat, action",
    release_year: new Date('2008'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u9d.webp"
});
const game8 = await Game.create({
    title: "TEKKEN 8",
    description: "Tekken 8 marque le retour triomphal de la saga emblématique de jeux de combat en 3D. Développé sur Unreal Engine 5, le jeu offre des graphismes époustouflants et des animations fluides, mettant en valeur les combats intenses et les personnages détaillés. L'histoire poursuit la tragique saga des Mishima, centrée sur le face-à-face entre Jin Kazama et Kazuya Mishima, avec des rebondissements inattendus et des révélations familiales. Le gameplay introduit le système Heat, amplifiant l'agressivité et la stratégie en combat, tout en conservant les mécaniques classiques qui ont fait le succès de la série. Avec plus de 32 personnages jouables, dont des retours iconiques et de nouveaux venus, Tekken 8 promet une expérience de jeu riche et dynamique, que ce soit en solo ou en ligne.",
    genre: "Combat",
    release_year: new Date('2024'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7lbb.webp"
});
const game9 = await Game.create({
    title: "Dofus",
    description: "Dofus est un jeu de rôle massivement multijoueur en ligne (MMORPG) se déroulant dans le monde fantastique du Krosmoz. Les joueurs incarnent des personnages de différentes classes et races, chacun avec ses compétences uniques, et partent à l’aventure pour retrouver les légendaires œufs de dragon appelés Dofus. Le jeu combine exploration, quêtes, combats tactiques au tour par tour et interactions sociales avec d’autres joueurs. Avec ses graphismes en 2D colorés et son univers riche, Dofus offre une expérience immersive, stratégique et communautaire, adaptée aux fans de jeux de rôle et d’aventure.",
    genre: "MMORPG, stratégie, aventure",
    release_year: new Date('2004'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co93i0.webp"
});
const game10 = await Game.create({
    title: "DISNEY DREAMLIGHT VALLEY",
    description: "Disney Dreamlight Valley est un jeu hybride mêlant simulation de vie et aventure, où les joueurs sont invités à restaurer un vallon magique envahi par des ronces malveillantes. Incarnez un personnage personnalisable et explorez des royaumes inspirés des univers Disney et Pixar, tels que La Belle et la Bête, Inside Out, Peter Pan et Aladdin. Au fil de l'aventure, vous rencontrerez des personnages emblématiques, résoudrez des énigmes et participerez à des quêtes captivantes pour redonner vie à la vallée.",
    genre: "Simulation de vie, aventure",
    release_year: new Date('2023'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4p0c.webp"
});
const game11 = await Game.create({
    title: "FAR CRY 6",
    description: "Far Cry 6 transporte les joueurs dans le pays fictif de Yara, inspiré de Cuba, où ils incarnent Dani Rojas, un guérillero luttant contre le régime oppressif du dictateur Antón Castillo, interprété par Giancarlo Esposito. Le jeu propose un vaste monde ouvert à explorer, avec des environnements variés allant des plages tropicales aux jungles denses et aux villes animées. Les joueurs peuvent utiliser une variété d'armes, de véhicules et de compétences pour mener des missions, recruter des alliés et participer à des combats intenses contre les forces gouvernementales. Avec son scénario captivant, ses personnages mémorables et son gameplay dynamique, Far Cry 6 offre une expérience immersive et palpitante dans un cadre exotique.",
    genre: "FPS, action-aventure",
    release_year: new Date('2021'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2npg.webp"
});
const game12 = await Game.create({
    title: "THE LEGEND OF ZELDA: TEARS OF THE KINGDOM",
    description: "The Legend of Zelda: Tears of the Kingdom est un jeu d'action-aventure en monde ouvert développé par Nintendo, suite directe de Breath of the Wild. Le jeu se déroule à Hyrule, où Link doit explorer des environnements variés, résoudre des énigmes complexes et combattre des ennemis redoutables pour sauver la princesse Zelda et restaurer la paix dans le royaume. Avec des graphismes époustouflants, une bande-son immersive et un gameplay innovant, Tears of the Kingdom offre une expérience riche en exploration, en aventure et en découverte.",
    genre: "Action-aventure, monde ouvert",
    release_year: new Date('2023'),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp"
});


// Challenges creation
const challenge1 = await Challenge.create({
    name: "Survivant des 10 minutes",
    description: "Tiens-toi en vie pendant au moins 10 minutes sans mourir.",
});

const challenge2 = await Challenge.create({
    name: "Tir parfait",
    description: "Montre ta précision ultime : réussis 10 tirs à la tête consécutifs sans en manquer un seul. La moindre erreur te ramènera à zéro — calme, précision et timing seront essentiels.",
});

const challenge3 = await Challenge.create({
    name: "Sans utiliser de soins",
    description: "Termine un niveau complet sans utiliser de soins ni de boucliers. Chaque erreur pourrait être fatale, donc anticipe, esquive et économise tes ressources pour survivre jusqu’à la fin.",

});

const challenge4 = await Challenge.create({
    name: "Vitesse éclair",
    description: "Termine une mission en moins de 5 minutes. Optimise ton itinéraire, ne perds pas de temps à combattre inutilement et prouve que la rapidité est ton meilleur atout.",
});

const challenge5 = await Challenge.create({
    name: "Pacifiste",
    description: "Complète un niveau sans éliminer le moindre ennemi. Utilise la furtivité, la diversion et l’intelligence pour progresser sans jamais déclencher le combat.",
});

const challenge6 = await Challenge.create({
    name: "Tireur d'élite",
    description: "Termine une mission en utilisant uniquement des armes à longue portée. Chaque tir doit être réfléchi et précis : pas de fusils d’assaut, pas de grenades, juste ton œil et ton fusil.",
});

const challenge7 = await Challenge.create({
    name: "Mode furtif",
    description: "Infiltre une zone entière sans te faire repérer une seule fois. Reste dans l’ombre, neutralise discrètement, et atteins ton objectif sans déclencher d’alarme.",
});

const challenge8 = await Challenge.create({
    name: "Combat au corps-à-corps",
    description: "Termine une mission uniquement avec des attaques de mêlée. Pas d’armes à feu, pas de projectiles : montre ta maîtrise du combat rapproché et ton sang-froid.",
});

const challenge9 = await Challenge.create({
    name: "Zéro dégât",
    description: "Finis un niveau sans subir le moindre dégât. Tu devras esquiver, anticiper et jouer à la perfection : une seule erreur, et tout est à recommencer.",
});

const challenge10 = await Challenge.create({
    name: "Récolteur expert",
    description: "Collecte 100 ressources dans une seule session de jeu. Explore chaque recoin, fouille les coffres et surveille ton inventaire pour atteindre ce score impressionnant.",
});

const challenge11 = await Challenge.create({
    name: "Maître des combos",
    description: "Réalise une série de 20 coups sans interruption. Le timing et la maîtrise des enchaînements seront la clé pour maintenir ta série intacte.",
});

const challenge12 = await Challenge.create({
    name: "Explorateur complet",
    description: "Découvre 100% de la carte dans un niveau. Laisse aucun endroit inexploré et révèle tous les secrets cachés de la zone.",
});

const challenge13 = await Challenge.create({
    name: "Course contre la montre",
    description: "Bats un boss en moins de 2 minutes. Utilise tes meilleures compétences et inflige un maximum de dégâts sans relâche pour vaincre avant la fin du chrono.",
});

const challenge14 = await Challenge.create({
    name: "Aucun objet",
    description: "Termine une mission sans utiliser le moindre objet ou compétence spéciale. Seules tes capacités de base feront la différence entre la victoire et la défaite.",
});

const challenge15 = await Challenge.create({
    name: "Champion des défis",
    description: "Accomplis 5 défis secondaires en une seule partie. Planifie ton itinéraire, optimise ton temps et montre que rien ne t’arrête.",
});

const challenge16 = await Challenge.create({
    name: "Zigzag infernal",
    description: "Esquive 50 attaques ennemies sans te faire toucher. Tes réflexes et ton anticipation seront mis à rude épreuve — reste mobile et imprévisible.",
});

const challenge17 = await Challenge.create({
    name: "Survivant ultime",
    description: "Survis à 10 vagues d’ennemis sans mourir ni te cacher. C’est un test d’endurance, de gestion des ressources et de concentration absolue.",
});

const challenge18 = await Challenge.create({
    name: "Sans alarme",
    description: "Termine une mission d’infiltration sans déclencher une seule alarme. La moindre erreur sera fatale : planifie chaque pas et observe tes adversaires.",
});

const challenge19 = await Challenge.create({
    name: "Coureur infatigable",
    description: "Parcours une distance totale de 10 km dans le jeu sans utiliser de véhicule ni repos. Montre ton endurance et ta détermination.",
});

const challenge20 = await Challenge.create({
    name: "Maître stratège",
    description: "Remporte une mission difficile en mode solo sans subir de pertes ni gaspiller de munitions. Chaque balle compte, chaque décision aussi.",
});



// Participation creation
const participation1 = await Participation.create({
    title: "video 1",
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});
const participation2 = await Participation.create({
    title: "video 2",
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});
const participation3 = await Participation.create({
    title: "video 3",
    url: "https://www.youtube.com/watch?v=EfG2Evfgp2o"
});


// Vote added to challenges
await user2.addVotedParticipations(participation2);
await user3.addVotedParticipations([participation2, participation3]);
await user1.addVotedParticipations([participation1, participation2, participation3]);
await user4.addVotedParticipations(participation2);


console.log("✅ Insertion des données de seed terminée");
await sequelize.close();