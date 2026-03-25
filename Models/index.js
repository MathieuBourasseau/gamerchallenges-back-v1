import { Challenge } from "./challenge.model.js";
import { Game } from "./game.model.js";
import { Participation } from "./participation.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";


// challenge - user
User.hasMany(Challenge, {foreignKey: "user_id", as: "challenges"} ); 
Challenge.belongsTo(User, {foreignKey: "user_id", as: "creator"});

// challenge - game
Challenge.belongsTo(Game, {foreignKey: "game_id", as: "game"});
Game.hasMany(Challenge, {foreignKey: "game_id", as: "challenges"});

// participation proposée - user
Participation.belongsTo(User, {foreignKey: "user_id", as: "player"});
User.hasMany(Participation, {foreignKey: "user_id", as: "participations"});


// participation - challenge 
Participation.belongsTo(Challenge, {foreignKey: "challenge_id", as: "challenge"});
Challenge.hasMany(Participation, {foreignKey: "challenge_id", as: "participations"});


// Link tables
Participation.belongsToMany(User, {
  through: "vote_participation",
  foreignKey: "participation_id",
  otherKey: "user_id",
  as: "voters"
});
User.belongsToMany(Participation, {
  through: "vote_participation",
  foreignKey: "user_id",
  otherKey: "participation_id",
  as: "votedParticipations"
});

export { Challenge, Game, Participation, User, sequelize}; 