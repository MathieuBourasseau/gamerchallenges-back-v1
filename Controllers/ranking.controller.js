import { User, Participation } from "../Models/index.js";
import { fn, col } from "sequelize";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const rankingController = {
    async rankByParticipations(req, res) {
        try {
            const ranking = await User.findAll({
                attributes: [
                    "id",
                    "username",
                    "avatar",
                    [fn("COUNT", col("participations.id")), "participationCount"],
                ],
                include: [
                    {
                        model: Participation,
                        as: "participations",
                        attributes: [],
                    },
                ],
                group: ["User.id"],
                order: [[fn("COUNT", col("participations.id")), "DESC"]],
                limit: 3,
                subQuery: false,
            }); // Avoid subqueries and bugs: do all JOINs in a single SQL query

            return res.status(httpStatusCodes.OK).json(ranking);
            
        } catch (error) {
            console.error("Error fetching ranking by participations:", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR,
                error: responseMessages[httpStatusCodes.SERVER_ERROR]
            });
        }
    },

    async rankByVotes(req, res) {
        try {
            const ranking = await User.findAll({
                attributes: [
                    "id",
                    "username",
                    "avatar",
                    [fn("COUNT", col("participations->voters.id")), "voteCount"],
                ],
                include: [
                    {
                        model: Participation,
                        as: "participations",
                        attributes: [],
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
                group: ["User.id"],
                order: [[fn("COUNT", col("participations->voters.id")), "DESC"]],
                limit: 3,
                subQuery: false,
            });

            return res.status(httpStatusCodes.OK).json(ranking);
            
        } catch (error) {
            console.error("Error fetching ranking by votes:", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR,
                error: responseMessages[httpStatusCodes.SERVER_ERROR]
            });
        }
    },
};