import {
  Challenge,
  Game,
  Participation,
  User,
} from "../Models/index.js";
import { fn, col, literal } from "sequelize";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

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
          {
            model: User,
            as: "creator",
            attributes: ["id", "username"],
          },
        ],
      });

      return res.status(httpStatusCodes.OK).json(challenges);
    } catch (error) {
      console.error("Erreur lors de la récupération des challenges :", error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },

  async getTopChallenges(req, res) {
    try {
      const topChallenges = await Challenge.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "created_at",
          [fn("COUNT", col("participations.id")), "participationCount"],
        ],
        include: [
          {
            model: Game,
            as: "game",
            attributes: ["id", "title", "cover"],
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "username"],
          },
          {
            model: Participation,
            as: "participations",
            attributes: [],
          },
        ],
        group: ["Challenge.id", "game.id", "creator.id"],
        order: [[literal('"participationCount"'), "DESC"]],
        limit: 3,
        subQuery: false,
      });

      return res.status(httpStatusCodes.OK).json(topChallenges);
    } catch (error) {
      console.error("Erreur lors de la récupération des top challenges :", error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },

  async getChallengeById(req, res) {
    try {
      const { id } = req.params;

      const challenge = await Challenge.findByPk(id, {
        include: [
          {
            model: Game,
            as: "game",
            attributes: ["id", "cover"],
          },
          {
            model: Participation,
            as: "participations",
            attributes: [
              "id",
              "url",
              [fn("COUNT", col("participations->voters.id")), "voteCounted"],
            ],
            include: [
              {
                model: User,
                as: "voters",
                attributes: [],
                through: { attributes: [] },
              },
            ],
          },
        ],
        group: [
          "Challenge.id",
          "game.id",
          "participations.id",
        ],
        subQuery: false,
      });

      if (!challenge) {
        return res.status(httpStatusCodes.NOT_FOUND).json({
          status: httpStatusCodes.NOT_FOUND,
          error: "Le challenge demandé n'existe pas.",
        });
      }

      const challengeData = challenge.toJSON();

      challengeData.totalChallengeVotes = challengeData.participations.reduce(
        (total, participation) => {
          return total + Number(participation.voteCounted);
        },
        0
      );

      return res.status(httpStatusCodes.OK).json(challengeData);
    } catch (error) {
      console.error("Erreur lors de la récupération du challenge :", error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },

  async getChallengesByUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({
          status: httpStatusCodes.NOT_FOUND,
          error: "User non trouvé",
        });
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

      return res.status(httpStatusCodes.OK).json(userChallenges);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des challenges du user :",
        error,
      );
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },
};