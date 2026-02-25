import { Challenge } from "./challenge.model.js";
import { Game } from "./game.model.js";
import { Participation } from "./participation.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";


// challenge + user
User.hasMany(Challenge, {foreignKey: "user_id", as: "challenges"} );
Challenge.belongsTo(User, {foreignKey: "user_id", as: "creator"});

// challenge + game
Challenge.belongsTo(Game, {foreignKey: "game_id", as: "game"});
Game.hasMany(Challenge, {foreignKey: "game_id", as: "challenges"});

// participation + user