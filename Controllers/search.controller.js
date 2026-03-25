import { Op } from "sequelize";
import { Game, User, Challenge } from "../Models/index.js";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const searchController = {
  async search(req, res) {
    try {
      const { type, query } = req.query;

      // Validate query (minimum length)
      if (!query || query.length < 2) {
        return res.status(httpStatusCodes.OK).json([]);
      }

      // Prepare search in Games
      const searchGames = Game.findAll({
        where: { title: { [Op.iLike]: `%${query}%` } },
        attributes: ["id", "title", "cover"],
      });

      // Prepare search in Users
      const searchUsers = User.findAll({
        where: { username: { [Op.iLike]: `%${query}%` } },
        attributes: ["id", "username", "avatar"],
      });

      // Prepare search in Challenges (with related Game)
      const searchChallenges = Challenge.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
        attributes: ["id", "name"],
        include: [
          {
            model: Game,
            as: "game",
            attributes: ["id", "title", "cover"],
          },
        ],
      });

      // Global search: run all queries in parallel
      if (type === "all") {
        const [games, users, challenges] = await Promise.all([
          searchGames,
          searchUsers,
          searchChallenges,
        ]);

        // Merge results and tag each item with its type
        return res.status(httpStatusCodes.OK).json([
          ...games.map((g) => ({ ...g.toJSON(), type: "game" })),
          ...users.map((u) => ({ ...u.toJSON(), type: "user" })),
          ...challenges.map((c) => ({ ...c.toJSON(), type: "challenge" })),
        ]);
      }

      // Search only in Games
      if (type === "games") {
        const games = await searchGames;
        return res.status(httpStatusCodes.OK).json(games);
      }

      // Search only in Users
      if (type === "users") {
        const users = await searchUsers;
        return res.status(httpStatusCodes.OK).json(users);
      }

      // Search only in Challenges
      if (type === "challenges") {
        const challenges = await searchChallenges;
        return res.status(httpStatusCodes.OK).json(challenges);
      }

      // Invalid search type (Erreur 400)
      return res.status(httpStatusCodes.BAD_REQUEST).json({ 
        status: httpStatusCodes.BAD_REQUEST,
        error: "Type de recherche invalide." 
      });

    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      
      // Erreur 500 standardisée
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR] 
      });
    }
  },
};