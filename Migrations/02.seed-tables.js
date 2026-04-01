import {
    User,
    Challenge,
    Participation,
    Game,
    sequelize,
} from "../Models/index.js";
import argon2 from "argon2";

/**
 * SEEDING SCRIPT
 * This script populates the database with initial functional data.
 * It uses local paths for assets to ensure compatibility across environments.
 */

console.log("🚧 Inserting seed data into tables...");

// Default avatar path stored in the local uploads directory
const DEFAULT_AVATAR = "uploads/avatars/default-avatar.png";

// --- USERS CREATION ---
// Passwords are hashed using Argon2 for security.
// Roles and ban status are manually set for testing purposes.
const user1 = await User.create({
    username: "alice",
    email: "alice@example.com",
    password: await argon2.hash("Password1!"),
    role: "admin",
    avatar: DEFAULT_AVATAR,
});

const user2 = await User.create({
    username: "bob",
    email: "bob@example.com",
    password: await argon2.hash("Password2@"),
    avatar: DEFAULT_AVATAR,
    youtube: "https://www.youtube.com/",
    twitch: "https://www.twitch.tv/",
    discord: "https://discord.com/",
});

const user3 = await User.create({
    username: "charlie",
    email: "charlie@example.com",
    password: await argon2.hash("Password3#"),
    isBanned: true,
    avatar: DEFAULT_AVATAR,
});

const user4 = await User.create({
    username: "david",
    email: "david@example.com",
    password: await argon2.hash("Password4$"),
    avatar: DEFAULT_AVATAR,
});

const user5 = await User.create({
    username: "elena",
    email: "elena@example.com",
    password: await argon2.hash("Password5%"),
    avatar: DEFAULT_AVATAR,
});

const user6 = await User.create({
    username: "franck",
    email: "franck@example.com",
    password: await argon2.hash("Password6^"),
    avatar: DEFAULT_AVATAR,
});

const user7 = await User.create({
    username: "gina",
    email: "gina@example.com",
    password: await argon2.hash("Password7&"),
    avatar: DEFAULT_AVATAR,
});

// Storing users in an array to simplify relationship mapping
const allUsers = [user1, user2, user3, user4, user5, user6, user7];

// --- GAMES CREATION ---
const game1 = await Game.create({
    title: "CYBERPUNK 2077",
    description: "An open-world, action-adventure story set in Night City.",
    genre: "Action-RPG, Open World",
    release_year: new Date("2020"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaam3.webp",
});
const game2 = await Game.create({
    title: "GTA VI",
    description: "The next chapter in the Grand Theft Auto series.",
    genre: "Action-Adventure",
    release_year: new Date("2026"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9rwo.webp",
});
const game3 = await Game.create({
    title: "ANIMAL CROSSING: NEW HORIZONS",
    description: "Escape to a deserted island and create your own paradise.",
    genre: "Life Simulation",
    release_year: new Date("2020"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wls.webp",
});
const game4 = await Game.create({
    title: "MARIO KART 8",
    description: "The ultimate racing game for all ages.",
    genre: "Racing, Multiplayer",
    release_year: new Date("2023"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co213q.webp",
});
const game5 = await Game.create({
    title: "RED DEAD REDEMPTION 2",
    description: "An epic tale of life in America’s unforgiving heartland.",
    genre: "Action-Adventure",
    release_year: new Date("2018"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp",
});
const game6 = await Game.create({
    title: "DAYS GONE",
    description: "Ride and fight into a deadly, post-pandemic America.",
    genre: "Action-Adventure, Survival",
    release_year: new Date("2019"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co94bn.webp",
});
const game7 = await Game.create({
    title: "NARUTO SHIPPUDEN: ULTIMATE NINJA STORM",
    description: "Experience the Naruto story like never before.",
    genre: "Fighting, Action",
    release_year: new Date("2008"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u9d.webp",
});
const game8 = await Game.create({
    title: "TEKKEN 8",
    description: "The legendary fighting game series returns.",
    genre: "Fighting",
    release_year: new Date("2024"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7lbb.webp",
});
const game9 = await Game.create({
    title: "Dofus",
    description: "A tactical turn-based MMORPG.",
    genre: "MMORPG, Strategy, Adventure",
    release_year: new Date("2004"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co93i0.webp",
});
const game10 = await Game.create({
    title: "DISNEY DREAMLIGHT VALLEY",
    description: "A hybrid between a life-sim and an adventure game.",
    genre: "Life Simulation, Adventure",
    release_year: new Date("2023"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4p0c.webp",
});
const game11 = await Game.create({
    title: "FAR CRY 6",
    description: "Ignite the fight for freedom in a modern-day guerrilla revolution.",
    genre: "FPS, Action-Adventure",
    release_year: new Date("2021"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2npg.webp",
});
const game12 = await Game.create({
    title: "THE LEGEND OF ZELDA: TEARS OF THE KINGDOM",
    description: "An epic adventure across the land and skies of Hyrule.",
    genre: "Action-Adventure, Open World",
    release_year: new Date("2023"),
    cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp",
});

// --- CHALLENGES CREATION ---
// Challenges are created and manually linked to specific Games and Users.
const challenge1 = await Challenge.create({ name: "Survivant des 10 minutes", description: "Tiens-toi en vie pendant au moins 10 minutes sans mourir.", game_id: game1.id, user_id: user1.id });
const challenge2 = await Challenge.create({ name: "Tir parfait", description: "Réussis 10 tirs à la tête consécutifs.", game_id: game2.id, user_id: user1.id });
const challenge3 = await Challenge.create({ name: "Sans utiliser de soins", description: "Termine un niveau sans utiliser de soins ni boucliers.", game_id: game3.id, user_id: user1.id });
const challenge4 = await Challenge.create({ name: "Vitesse éclair", description: "Termine une mission en moins de 5 minutes.", game_id: game4.id, user_id: user2.id });
const challenge5 = await Challenge.create({ name: "Pacifiste", description: "Complète un niveau sans éliminer le moindre ennemi.", game_id: game5.id, user_id: user2.id });
const challenge6 = await Challenge.create({ name: "Tireur d'élite", description: "Termine une mission uniquement avec des armes à longue portée.", game_id: game6.id, user_id: user2.id });
const challenge7 = await Challenge.create({ name: "Mode furtif", description: "Infiltre une zone entière sans te faire repérer.", game_id: game7.id, user_id: user3.id });
const challenge8 = await Challenge.create({ name: "Combat au corps-à-corps", description: "Termine une mission uniquement avec des attaques de mêlée.", game_id: game8.id, user_id: user3.id });
const challenge9 = await Challenge.create({ name: "Zéro dégât", description: "Finis un niveau sans subir le moindre dégât.", game_id: game9.id, user_id: user3.id });
const challenge10 = await Challenge.create({ name: "Récolteur expert", description: "Collecte 100 ressources dans une seule session de jeu.", game_id: game10.id, user_id: user3.id });
const challenge11 = await Challenge.create({ name: "Maître des combos", description: "Réalise une série de 20 coups sans interruption.", game_id: game11.id, user_id: user4.id });
const challenge12 = await Challenge.create({ name: "Explorateur complet", description: "Découvre 100% de la carte dans un niveau.", game_id: game12.id, user_id: user4.id });
const challenge13 = await Challenge.create({ name: "Course contre la montre", description: "Bats un boss en moins de 2 minutes.", game_id: game1.id, user_id: user4.id });
const challenge14 = await Challenge.create({ name: "Aucun objet", description: "Termine une mission sans utiliser le moindre objet.", game_id: game2.id, user_id: user4.id });
const challenge15 = await Challenge.create({ name: "Champion des défis", description: "Accomplis 5 défis secondaires en une seule partie.", game_id: game3.id, user_id: user4.id });
const challenge16 = await Challenge.create({ name: "Zigzag infernal", description: "Esquive 50 attaques ennemies sans te faire toucher.", game_id: game4.id, user_id: user4.id });
const challenge17 = await Challenge.create({ name: "Survivant ultime", description: "Survis à 10 vagues d’ennemis sans mourir.", game_id: game5.id, user_id: user4.id });
const challenge18 = await Challenge.create({ name: "Sans alarme", description: "Termine une mission d’infiltration sans déclencher d’alarme.", game_id: game6.id, user_id: user4.id });
const challenge19 = await Challenge.create({ name: "Coureur infatigable", description: "Parcours 10 km dans le jeu sans utiliser de véhicule.", game_id: game7.id, user_id: user4.id });
const challenge20 = await Challenge.create({ name: "Maître stratège", description: "Remporte une mission difficile en solo.", game_id: game8.id, user_id: user4.id });

const challengesArray = [
    challenge1, challenge2, challenge3, challenge4, challenge5,
    challenge6, challenge7, challenge8, challenge9, challenge10,
    challenge11, challenge12, challenge13, challenge14, challenge15,
    challenge16, challenge17, challenge18, challenge19, challenge20,
];

// --- MASSIVE PARTICIPATION & VOTE LOGIC ---
console.log("🚀 Generating participations and votes simulation...");

const videoSamples = [
    "https://www.youtube.com/watch?v=lUhcwRuyEr4",
    "https://www.youtube.com/watch?v=PicaaV-UpEQ",
    "https://www.youtube.com/watch?v=QCxaK0I2ijU",
    "https://www.youtube.com/watch?v=A3ozugTuAZU",
];

for (const [index, challenge] of challengesArray.entries()) {
    // Each challenge gets 12 participations to fill the UI
    for (let i = 1; i <= 12; i++) {
        const baseUrl = videoSamples[i % videoSamples.length];

        const p = await Participation.create({
            title: `${challenge.name} - Run ${i}`,
            url: `${baseUrl}&t=${challenge.id}_${i}`,
            challenge_id: challenge.id,
            user_id: allUsers[i % allUsers.length].id,
        });

        // VOTE SYSTEM SIMULATION: Forcing a leaderboard for the first 3 challenges
        let voteCount = 0;
        if (index === 0 && i === 1) voteCount = 7;      // Rank 1
        else if (index === 1 && i === 1) voteCount = 6; // Rank 2
        else if (index === 2 && i === 1) voteCount = 5; // Rank 3
        else voteCount = Math.floor(Math.random() * 2); // Others get low engagement

        // Applying votes via the many-to-many relationship
        if (voteCount > 0) {
            await p.addVoters(allUsers.slice(0, voteCount));
        }
    }
}

console.log("✅ Seed data insertion successful.");
await sequelize.close();