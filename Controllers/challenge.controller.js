import {
  Challenge,
  Game,
  Participation,
  User,
  sequelize,
} from "../Models/index.js";
import { fn, col, Op } from "sequelize";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const challengeController = {
  async getAllChallenges(req, res) {
    try {
      const challenges = await Challenge.findAll({
        // order: sequelize.random(), on verra pour le tri avec les copains
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

      res.status(httpStatusCodes.OK).json(challenges);

    } catch (error) {
      console.error(error);
      res.status(httpStatusCodes.SERVER_ERROR).json({
        statusCode: httpStatusCodes.SERVER_ERROR,
        message: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },

  //  --- METHOD TO GET A CHALLENGE BY ITS ID ---
  async getChallengeById(req, res) {

    try {

      // Get id from params
      const { id } = req.params;

      // Check if the challenge is existing in DB
      const challenge = await Challenge.findByPk(id, {

        attributes: {
          // Calculate the sum of votes received in each participations and save the result in a new column of Challenge named "voteCounted"
          include: [
            [fn("COUNT", col("participations->voters.id")), "voteCounted"]
          ],
        },

        include: [
          // Include Game model to get the image associated
          {
            model: Game,
            as: "game",
            attributes: ["id", "cover"]
          },
          // Include Participation model to get videos participations associated to it
          {
            model: Participation,
            as: "participations",
            attributes: ["id", "url"],

            // Include User model to get the voters on each participation
            include: [
              {
                model: User,
                as: "voters",
                attributes: [],
                through: { attributes: [] }
              }
            ]
          }
        ],
        // Group by these IDs to ensure the COUNT function calculates the total 
        // without merging all participations or game info into a single row.
        group: [
          "Challenge.id",      // Keep the main challenge unique
          "game.id",           // Keep associated game info linked
          "participations.id"  // Prevent the list of participation videos from being collapsed
        ],

        // Disable subqueries to allow the COUNT function to access 
        // the joined tables (Participations -> Voters) directly.
        subQuery: false
      });

      // Error message sent if the challenge does not exist
      if (!challenge) {
        console.error("Le challenge demandé n'existe pas.");
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ 
            statusCode: httpStatusCodes.NOT_FOUND,
            error: responseMessages[httpStatusCodes.NOT_FOUND]
          });
      }

      // Sent to front the challenge selected
      return res.status(httpStatusCodes.OK).json(challenge);

    } catch (error) {
      console.error("Erreur lors de la recherche du challenge", error.message);
      res.status(httpStatusCodes.SERVER_ERROR).json({
        statusCode: httpStatusCodes.SERVER_ERROR,
        message: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },

  //  Challenges created by user
  async getChallengesByUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
          statusCode: httpStatusCodes.NOT_FOUND,
          message: responseMessages[httpStatusCodes.NOT_FOUND]
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

      res.status(httpStatusCodes.OK).json(userChallenges);
      
    } catch (error) {
      console.error(error);
      res.status(httpStatusCodes.SERVER_ERROR).json({
        statusCode: httpStatusCodes.SERVER_ERROR,
        message: responseMessages[httpStatusCodes.SERVER_ERROR],
      });
    }
  },
};
