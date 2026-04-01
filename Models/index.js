import { Challenge } from "./challenge.model.js";
import { Game } from "./game.model.js";
import { Participation } from "./participation.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";

/**
 * CHALLENGE - USER RELATIONSHIP (One-to-Many)
 * A User can create multiple Challenges.
 * A Challenge is created by a single User (aliased as 'creator').
 */
User.hasMany(Challenge, { foreignKey: "user_id", as: "challenges" }); 
Challenge.belongsTo(User, { foreignKey: "user_id", as: "creator" });

/**
 * CHALLENGE - GAME RELATIONSHIP (One-to-Many)
 * A Game can host several Challenges.
 * A Challenge is linked to one specific Game.
 */
Challenge.belongsTo(Game, { foreignKey: "game_id", as: "game" });
Game.hasMany(Challenge, { foreignKey: "game_id", as: "challenges" });

/**
 * PARTICIPATION - USER RELATIONSHIP (One-to-Many)
 * A User (player) can submit multiple entries/participations.
 * Each Participation belongs to one User (aliased as 'player').
 */
Participation.belongsTo(User, { foreignKey: "user_id", as: "player" });
User.hasMany(Participation, { foreignKey: "user_id", as: "participations" });

/**
 * PARTICIPATION - CHALLENGE RELATIONSHIP (One-to-Many)
 * A Challenge can receive many Participations from different users.
 * Each Participation is tied to one specific Challenge.
 */
Participation.belongsTo(Challenge, { foreignKey: "challenge_id", as: "challenge" });
Challenge.hasMany(Participation, { foreignKey: "challenge_id", as: "participations" });

/**
 * VOTE SYSTEM - MANY-TO-MANY RELATIONSHIP (N:N)
 * Using a junction table 'vote_participation' to handle the voting logic.
 * A User can vote for many Participations, and a Participation can be voted by many Users.
 */

// Link from Participation to its Voters
Participation.belongsToMany(User, {
  through: "vote_participation", // The intermediate table name
  foreignKey: "participation_id",
  otherKey: "user_id",
  as: "voters"
});

// Link from User to their Voted Participations
User.belongsToMany(Participation, {
  through: "vote_participation", // The intermediate table name
  foreignKey: "user_id",
  otherKey: "participation_id",
  as: "votedParticipations"
});

export { Challenge, Game, Participation, User, sequelize };