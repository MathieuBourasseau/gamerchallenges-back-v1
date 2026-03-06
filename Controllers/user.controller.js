import { User, Challenge, Participation, Game } from "../Models/index.js";

export const userController = {
  //  obtenir un user par son ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["id", "username", "email", "avatar"],
      });
      if (!user) {
        return res.status(404).json({ message: "User non trouvé" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
  //  les challenges créés par un user
  async getChallengesByUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User non trouvé" });
      }

      const userChallenges = await Challenge.findAll({
        where: { user_id: id },
        include: [
          {
            model: Game,
            as: "game",
            attributes: ["id", "title", "cover"],
          },
        ],
      });

      res.json(userChallenges);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  //  les participations d’un user
  async getParticipationsByUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User non trouvé" });
      }

      const userParticipations = await Participation.findAll({
        where: { user_id: id },
        include: [
          {
            model: User,
            as: "player",
            attributes: ["id", "username", "avatar"],
          },
          {
            model: Challenge,
            as: "challenge",
            include: [
              {
                model: Game,
                as: "game",
                attributes: ["id", "title", "cover"],
              },
            ],
          },
        ],
      });

      res.json(userParticipations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
