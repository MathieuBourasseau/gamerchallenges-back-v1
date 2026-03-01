import { Challenge, Game, sequelize } from "../Models/index.js";

export const challengeController = {
  async getAllChallenges(req, res) {
    try {
      const challenges = await Challenge.findAll({
        include: [
          {
            model: Game,
            as: "game",
            attributes: ["id", "title", "cover"],
          },
        ],
        // order: sequelize.random(), on verra pour le tri avec les copains
      });
      res.json(challenges);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
