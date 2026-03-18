import { Participation, Challenge, Game, sequelize } from "../Models/index.js";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const homeController = {
  async getBestParticipations(req, res) {
    try {
      const topParticipations = await Participation.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*)
                FROM vote_participation AS vp
                WHERE vp.participation_id = "Participation"."id"
              )`),
              "voteCount",
            ],
          ],
        },

        // Include the challenge linked to the participation with the required fields, 
        // as well as the game linked to the challenge (descriptions are not needed for the home template)
        include: [
          {
            model: Challenge,
            as: "challenge",
            attributes: ["id", "name"],
            include: [
              {
                model: Game,
                as: "game",
                attributes: ["id", "title", "cover"],
              },
            ],
          },
        ],

        // Then, sort the participations based on the number of votes, 
        // using "voteCount" created in the subquery above
        order: [[sequelize.literal(`"voteCount"`), "DESC"]],

        // And limit to the top 3 best participations
        limit: 3,
      });

      // Send the participations with a 200 OK status
      return res.status(httpStatusCodes.OK).json(topParticipations);

    } catch (error) {
      console.error("Error fetching top participations:", error);

      // Standardized error response matching the frontend requirements
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR]
      });
    }
  },
};