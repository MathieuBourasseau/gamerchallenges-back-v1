import { User, Participation } from "../Models/index.js";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const userVotesController = {
    // Vote for a participation
    async addVote(req, res) {
        try {
            const { participationId } = req.params;
            const userId = req.user.id;

            if (!participationId) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({ 
                    status: httpStatusCodes.BAD_REQUEST,
                    error: "L'ID de la participation est requis" 
                });
            }

            const participation = await Participation.findByPk(participationId, {
                include: { model: User, as: "voters" },
            });
            
            if (!participation) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ 
                    status: httpStatusCodes.NOT_FOUND,
                    error: "Participation non trouvée" 
                });
            }

            // User can not vote for his own participation
            if (participation.user_id === userId) {
                return res.status(httpStatusCodes.FORBIDDEN).json({
                    status: httpStatusCodes.FORBIDDEN,
                    error: "Vous ne pouvez pas voter pour votre propre participation",
                });
            }

            // On vérifie si l'utilisateur a déjà voté
            const hasVoted = participation.voters.some(
                (voter) => voter.id === userId,
            );
            
            if (hasVoted) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({ 
                    status: httpStatusCodes.BAD_REQUEST,
                    error: "Vous avez déjà voté pour cette participation" 
                });
            }

            await participation.addVoter(userId);
            return res.status(httpStatusCodes.CREATED).json({ message: "Vote ajouté avec succès" });
            
        } catch (error) {
            console.error("Erreur lors de l'ajout du vote :", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR, 
                error: responseMessages[httpStatusCodes.SERVER_ERROR],
            });
        }
    },

    // Delete a vote
    async removeVote(req, res) {
        try {
            const { participationId } = req.params;
            const userId = req.user.id;

            const participation = await Participation.findByPk(participationId);
            
            if (!participation) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ 
                    status: httpStatusCodes.NOT_FOUND,
                    error: "Participation non trouvée" 
                });
            }

            await participation.removeVoter(userId);
            return res.status(httpStatusCodes.OK).json({ message: "Vote retiré avec succès" });
            
        } catch (error) {
            console.error("Erreur lors du retrait du vote :", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR, 
                error: "Une erreur est survenue lors du retrait du vote." 
            });
        }
    },

    // Check if user already vote : to change button color in front page
    async checkVote(req, res) {
        try {
            const { participationId } = req.params;
            const userId = req.user.id;

            const participation = await Participation.findByPk(participationId, {
                include: { model: User, as: "voters", attributes: ["id"] },
            });
            
            if (!participation) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ 
                    status: httpStatusCodes.NOT_FOUND,
                    error: "Participation non trouvée" 
                });
            }

            const hasVoted = participation.voters.some(
                (voter) => voter.id === userId,
            );
            
            return res.status(httpStatusCodes.OK).json({ hasVoted });
            
        } catch (error) {
            console.error("Erreur lors de la vérification du vote :", error);
            return res.status(httpStatusCodes.SERVER_ERROR).json({ 
                status: httpStatusCodes.SERVER_ERROR, 
                error: "Impossible de vérifier le statut du vote." 
            });
        }
    },
};