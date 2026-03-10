import { Op } from "sequelize";
import { Game, User, Challenge } from "../Models/index.js";

export const searchController = {
  async search(req, res) {
    try {
      const { type, query } = req.query;

      // Validate query (minimum length)
      if (!query || query.length < 2) {
        return res.json([]);
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
        return res.json([
          ...games.map((g) => ({ ...g.toJSON(), type: "game" })),
          ...users.map((u) => ({ ...u.toJSON(), type: "user" })),
          ...challenges.map((c) => ({ ...c.toJSON(), type: "challenge" })),
        ]);
      }

      // Search only in Games
      if (type === "games") {
        const games = await searchGames;
        return res.json(games);
      }

      // Search only in Users
      if (type === "users") {
        const users = await searchUsers;
        return res.json(users);
      }

      // Search only in Challenges
      if (type === "challenges") {
        const challenges = await searchChallenges;
        return res.json(challenges);
      }

      // Invalid search type
      return res.status(400).json({ error: "Invalid search type" });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
};
