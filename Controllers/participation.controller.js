import { User, Challenge, Participation, Game } from "../Models/index.js";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const participationController = {

    //  User's participations
    async getParticipationsByUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            
            if (!user) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ 
                    status: httpStatusCodes.NOT_FOUND,
                    error: "Utilisateur non trouvé" 
                });
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

            return res.status(httpStatusCodes.OK).json(userParticipations);
            
        } catch (error) {
            console.error("Erreur serveur lors de la récupération des participations de l'utilisateur :", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR,
                error: responseMessages[httpStatusCodes.SERVER_ERROR]
            });
        }
    },

    // Get participations bound to a challenge 
    async getParticipationsByChallenge(req, res) {

        try {

            // Catch id from params
            const { id } = req.params;

            // Search challenge and participation bound to it
            const challenge = await Challenge.findByPk(id, {

                include: {
                    model: Participation,
                    as: "participations",

                    // To show in front the username and avatar of the player
                    include: {
                        model: User,
                        as: "player",
                        attributes: ["id", "username", "avatar"]
                    }
                }
            });

            // If the challenge does not exist 
            if (!challenge) {
                console.error("L'id du challenge demandé n'existe pas.")
                return res.status(httpStatusCodes.NOT_FOUND).json({ 
                    status: httpStatusCodes.NOT_FOUND,
                    error: "Le challenge demandé n'existe pas." 
                });
            };

            return res.status(httpStatusCodes.OK).json(challenge);

        } catch (error) {

            console.error("Erreur de serveur lors de la recherche d'une participation à un challenge", error.message);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR,
                error: responseMessages[httpStatusCodes.SERVER_ERROR] 
            });

        }
    },

    // Share participation with url
    async shareParticipation(req, res) {

        try {

            const { id } = req.user

            const { title, url } = req.body;

            const participation = await Participation.create({
                title,
                url,
                user_id: id,
            });

            return res.status(httpStatusCodes.CREATED).json({ 
                message: "Votre vidéo a été ajoutée !" 
            });

        } catch (error) {
            console.error("Erreur lors du partage de la participation", error.message);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR,
                error: responseMessages[httpStatusCodes.SERVER_ERROR] 
            });
        }
    }
};
