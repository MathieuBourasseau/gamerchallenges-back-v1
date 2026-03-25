import {
	User,
	Challenge,
	Participation,
	Game,
	sequelize,
} from "../Models/index.js";
import argon2 from "argon2";

console.log("🚧 Insertion des données de seed dans les tables");

// Users creation
const user1 = await User.create({
	username: "alice",
	email: "alice@example.com",
	password: await argon2.hash("Password1!"),
	role: "admin",
	avatar:
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flepassetempsderose.l.e.pic.centerblog.net%2Fo%2Faed26788.jpg&f=1&nofb=1&ipt=dcdddae0fc7ca8ba1ecbab1ddb781f74146d86320a8c3c9d0f322f168c2ef69e",
});

const user2 = await User.create({
	username: "bob",
	email: "bob@example.com",
	password: await argon2.hash("Password2@"),
	avatar:
		"https://i2.wp.com/dropthespotlight.com/wp-content/uploads/2020/05/undertaker.jpg?fit=960,960&ssl=1",
	youtube: "https://www.youtube.com/",
	twitch: "https://www.twitch.tv/",
	discord: "https://discord.com/",
});

const user3 = await User.create({
	username: "charlie",
	email: "charlie@example.com",
	password: await argon2.hash("Password3#"),
	isBanned: true,
	avatar:
		"https://staticg.sportskeeda.com/editor/2023/04/5a0bc-16823053913430-1920.jpg",
});

const user4 = await User.create({
	username: "david",
	email: "david@example.com",
	password: await argon2.hash("Password4$"),
	avatar:
		"https://mario.wiki.gallery/images/1/15/Play_Nintendo_Mario_Profile.png",
});

const user5 = await User.create({
	username: "elena",
	email: "elena@example.com",
	password: await argon2.hash("Password5%"),
	avatar:
		"https://mario.wiki.gallery/images/1/15/Play_Nintendo_Mario_Profile.png",
});

const user6 = await User.create({
	username: "franck",
	email: "franck@example.com",
	password: await argon2.hash("Password6^"),
	avatar:
		"https://mario.wiki.gallery/images/1/15/Play_Nintendo_Mario_Profile.png",
});

const user7 = await User.create({
	username: "gina",
	email: "gina@example.com",
	password: await argon2.hash("Password7&"),
	avatar:
		"https://mario.wiki.gallery/images/1/15/Play_Nintendo_Mario_Profile.png",
});

// Create an array for all users to facilitate relationships
const allUsers = [user1, user2, user3, user4, user5, user6, user7];

// Games creation
const game1 = await Game.create({
	title: "CYBERPUNK 2077",
	description: "Description courte...",
	genre: "Action-RPG, monde ouvert",
	release_year: new Date("2020"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaam3.webp",
});
const game2 = await Game.create({
	title: "GTA VI",
	description: "Description courte...",
	genre: "Action-aventure",
	release_year: new Date("2026"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rwo.webp",
});
const game3 = await Game.create({
	title: "ANIMAL CROSSING: NEW HORIZONS",
	description: "Description courte...",
	genre: "Simulation de vie",
	release_year: new Date("2020"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wls.webp",
});
const game4 = await Game.create({
	title: "MARIO KART 8",
	description: "Description courte...",
	genre: "Course, multijoueur",
	release_year: new Date("2023"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co213q.webp",
});
const game5 = await Game.create({
	title: "RED DEAD REDEMPTION 2",
	description: "Description courte...",
	genre: "Action-aventure",
	release_year: new Date("2018"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp",
});
const game6 = await Game.create({
	title: "DAYS GONE",
	description: "Description courte...",
	genre: "Action-aventure, survie",
	release_year: new Date("2019"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co94bn.webp",
});
const game7 = await Game.create({
	title: "NARUTO SHIPPUDEN: ULTIMATE NINJA STORM",
	description: "Description courte...",
	genre: "Combat, action",
	release_year: new Date("2008"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u9d.webp",
});
const game8 = await Game.create({
	title: "TEKKEN 8",
	description: "Description courte...",
	genre: "Combat",
	release_year: new Date("2024"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7lbb.webp",
});
const game9 = await Game.create({
	title: "Dofus",
	description: "Description courte...",
	genre: "MMORPG, stratégie, aventure",
	release_year: new Date("2004"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co93i0.webp",
});
const game10 = await Game.create({
	title: "DISNEY DREAMLIGHT VALLEY",
	description: "Description courte...",
	genre: "Simulation de vie, aventure",
	release_year: new Date("2023"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4p0c.webp",
});
const game11 = await Game.create({
	title: "FAR CRY 6",
	description: "Description courte...",
	genre: "FPS, action-aventure",
	release_year: new Date("2021"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2npg.webp",
});
const game12 = await Game.create({
	title: "THE LEGEND OF ZELDA: TEARS OF THE KINGDOM",
	description: "Description courte...",
	genre: "Action-aventure, monde ouvert",
	release_year: new Date("2023"),
	cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp",
});

// Challenges creation
const challenge1 = await Challenge.create({
	name: "Survivant des 10 minutes",
	description: "Tiens-toi en vie pendant au moins 10 minutes sans mourir.",
	game_id: game1.id,
	user_id: user1.id,
});

const challenge2 = await Challenge.create({
	name: "Tir parfait",
	description: "Réussis 10 tirs à la tête consécutifs.",
	game_id: game2.id,
	user_id: user1.id,
});

const challenge3 = await Challenge.create({
	name: "Sans utiliser de soins",
	description: "Termine un niveau sans utiliser de soins ni boucliers.",
	game_id: game3.id,
	user_id: user1.id,
});

const challenge4 = await Challenge.create({
	name: "Vitesse éclair",
	description: "Termine une mission en moins de 5 minutes.",
	game_id: game4.id,
	user_id: user2.id,
});

const challenge5 = await Challenge.create({
	name: "Pacifiste",
	description: "Complète un niveau sans éliminer le moindre ennemi.",
	game_id: game5.id,
	user_id: user2.id,
});

const challenge6 = await Challenge.create({
	name: "Tireur d'élite",
	description: "Termine une mission uniquement avec des armes à longue portée.",
	game_id: game6.id,
	user_id: user2.id,
});

const challenge7 = await Challenge.create({
	name: "Mode furtif",
	description: "Infiltre une zone entière sans te faire repérer.",
	game_id: game7.id,
	user_id: user3.id,
});

const challenge8 = await Challenge.create({
	name: "Combat au corps-à-corps",
	description: "Termine une mission uniquement avec des attaques de mêlée.",
	game_id: game8.id,
	user_id: user3.id,
});

const challenge9 = await Challenge.create({
	name: "Zéro dégât",
	description: "Finis un niveau sans subir le moindre dégât.",
	game_id: game9.id,
	user_id: user3.id,
});

const challenge10 = await Challenge.create({
	name: "Récolteur expert",
	description: "Collecte 100 ressources dans une seule session de jeu.",
	game_id: game10.id,
	user_id: user3.id,
});

const challenge11 = await Challenge.create({
	name: "Maître des combos",
	description: "Réalise une série de 20 coups sans interruption.",
	game_id: game11.id,
	user_id: user4.id,
});

const challenge12 = await Challenge.create({
	name: "Explorateur complet",
	description: "Découvre 100% de la carte dans un niveau.",
	game_id: game12.id,
	user_id: user4.id,
});

const challenge13 = await Challenge.create({
	name: "Course contre la montre",
	description: "Bats un boss en moins de 2 minutes.",
	game_id: game1.id,
	user_id: user4.id,
});

const challenge14 = await Challenge.create({
	name: "Aucun objet",
	description: "Termine une mission sans utiliser le moindre objet.",
	game_id: game2.id,
	user_id: user4.id,
});

const challenge15 = await Challenge.create({
	name: "Champion des défis",
	description: "Accomplis 5 défis secondaires en une seule partie.",
	game_id: game3.id,
	user_id: user4.id,
});

const challenge16 = await Challenge.create({
	name: "Zigzag infernal",
	description: "Esquive 50 attaques ennemies sans te faire toucher.",
	game_id: game4.id,
	user_id: user4.id,
});

const challenge17 = await Challenge.create({
	name: "Survivant ultime",
	description: "Survis à 10 vagues d’ennemis sans mourir.",
	game_id: game5.id,
	user_id: user4.id,
});

const challenge18 = await Challenge.create({
	name: "Sans alarme",
	description: "Termine une mission d’infiltration sans déclencher d’alarme.",
	game_id: game6.id,
	user_id: user4.id,
});

const challenge19 = await Challenge.create({
	name: "Coureur infatigable",
	description: "Parcours 10 km dans le jeu sans utiliser de véhicule.",
	game_id: game7.id,
	user_id: user4.id,
});

const challenge20 = await Challenge.create({
	name: "Maître stratège",
	description: "Remporte une mission difficile en solo.",
	game_id: game8.id,
	user_id: user4.id,
});

// Link challenges to games
await challenge1.setGame(game1);
await challenge2.setGame(game2);
await challenge3.setGame(game3);
await challenge4.setGame(game4);
await challenge5.setGame(game5);
await challenge6.setGame(game6);
await challenge7.setGame(game7);
await challenge8.setGame(game8);
await challenge9.setGame(game9);
await challenge10.setGame(game10);
await challenge11.setGame(game11);
await challenge12.setGame(game12);
await challenge13.setGame(game1);
await challenge14.setGame(game2);
await challenge15.setGame(game3);
await challenge16.setGame(game4);
await challenge17.setGame(game5);
await challenge18.setGame(game6);
await challenge19.setGame(game7);
await challenge20.setGame(game8);

// Link users to challenges
await user1.addChallenge(challenge1);
await user1.addChallenge(challenge2);
await user1.addChallenge(challenge3);
await user1.addChallenge(challenge4);
await user1.addChallenge(challenge5);
await user2.addChallenge(challenge6);
await user2.addChallenge(challenge7);
await user2.addChallenge(challenge8);
await user2.addChallenge(challenge9);
await user2.addChallenge(challenge10);
await user3.addChallenge(challenge11);
await user3.addChallenge(challenge12);
await user3.addChallenge(challenge13);
await user3.addChallenge(challenge14);
await user3.addChallenge(challenge15);
await user4.addChallenge(challenge16);
await user4.addChallenge(challenge17);
await user4.addChallenge(challenge18);
await user4.addChallenge(challenge19);
await user4.addChallenge(challenge20);

const challengesArray = [
	challenge1,
	challenge2,
	challenge3,
	challenge4,
	challenge5,
	challenge6,
	challenge7,
	challenge8,
	challenge9,
	challenge10,
	challenge11,
	challenge12,
	challenge13,
	challenge14,
	challenge15,
	challenge16,
	challenge17,
	challenge18,
	challenge19,
	challenge20,
];

// Massive Participation creation
console.log("🚀 Creating participations and votes...");

const videoSamples = [
	"https://www.youtube.com/watch?v=lUhcwRuyEr4",
	"https://www.youtube.com/watch?v=PicaaV-UpEQ",
	"https://www.youtube.com/watch?v=QCxaK0I2ijU",
	"https://www.youtube.com/watch?v=A3ozugTuAZU",
];

for (const [index, challenge] of challengesArray.entries()) {
	for (let i = 1; i <= 12; i++) {
		const baseUrl = videoSamples[i % videoSamples.length];

		const p = await Participation.create({
			title: `${challenge.name} - Run ${i}`,
			url: `${baseUrl}&t=${challenge.id}_${i}`,
			challenge_id: challenge.id,
			user_id: allUsers[i % allUsers.length].id,
		});

		// LOGIQUE DE VOTE : On force le podium sur les 3 premiers challenges du tableau
		let voteCount = 0;

		if (index === 0 && i === 1)
			voteCount = 7; // Top 1 (Challenge 1)
		else if (index === 1 && i === 1)
			voteCount = 6; // Top 2 (Challenge 2)
		else if (index === 2 && i === 1)
			voteCount = 5; // Top 3 (Challenge 3)
		else voteCount = Math.floor(Math.random() * 2); // Les autres ont 0 ou 1 vote

		if (voteCount > 0) {
			await p.addVoters(allUsers.slice(0, voteCount));
		}
	}
}

console.log("✅ Insertion des données de seed terminée");
await sequelize.close();
