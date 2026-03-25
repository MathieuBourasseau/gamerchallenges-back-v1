import { User, Participation } from "../Models/index.js";
import { httpStatusCodes } from "../utils/http-status-code.js";

export const userVotesController = {
	async addVote(req, res) {
		try {
			const { participationId } = req.params;
			const userId = req.user.id;

			if (!participationId)
				return res
					.status(httpStatusCodes.BAD_REQUEST)
					.json({ error: "L'ID de la participation est requis" });

			const participation = await Participation.findByPk(participationId, {
				include: { model: User, as: "voters", attributes: ["id"] },
			});
			if (!participation)
				return res
					.status(httpStatusCodes.NOT_FOUND)
					.json({ error: "Participation non trouvée" });

			if (participation.user_id === userId)
				return res
					.status(httpStatusCodes.FORBIDDEN)
					.json({
						error: "Vous ne pouvez pas voter pour votre propre participation",
					});

			const hasVoted = participation.voters.some(
				(voter) => voter.id === userId,
			);
			if (hasVoted)
				return res
					.status(httpStatusCodes.BAD_REQUEST)
					.json({ error: "Vous avez déjà voté pour cette participation" });

			await participation.addVoter(userId);

			// Recharger les votes pour renvoyer le compteur exact
			const updatedParticipation = await Participation.findByPk(
				participationId,
				{
					include: { model: User, as: "voters", attributes: ["id"] },
				},
			);

			return res.status(httpStatusCodes.CREATED).json({
				message: "Vote ajouté avec succès",
				voteCounted: updatedParticipation.voters.length,
			});
		} catch (error) {
			console.error(error);
			return res
				.status(httpStatusCodes.SERVER_ERROR)
				.json({ error: "Erreur serveur" });
		}
	},

	async removeVote(req, res) {
		try {
			const { participationId } = req.params;
			const userId = req.user.id;

			const participation = await Participation.findByPk(participationId, {
				include: { model: User, as: "voters", attributes: ["id"] },
			});
			if (!participation)
				return res
					.status(httpStatusCodes.NOT_FOUND)
					.json({ error: "Participation non trouvée" });

			await participation.removeVoter(userId);

			const updatedParticipation = await Participation.findByPk(
				participationId,
				{
					include: { model: User, as: "voters", attributes: ["id"] },
				},
			);

			return res.status(httpStatusCodes.OK).json({
				message: "Vote retiré avec succès",
				voteCounted: updatedParticipation.voters.length,
			});
		} catch (error) {
			console.error(error);
			return res
				.status(httpStatusCodes.SERVER_ERROR)
				.json({ error: "Erreur serveur" });
		}
	},

	async checkVote(req, res) {
		try {
			const { participationId } = req.params;
			const userId = req.user.id;

			const participation = await Participation.findByPk(participationId, {
				include: { model: User, as: "voters", attributes: ["id"] },
			});
			if (!participation)
				return res
					.status(httpStatusCodes.NOT_FOUND)
					.json({ error: "Participation non trouvée" });

			const hasVoted = participation.voters.some(
				(voter) => voter.id === userId,
			);

			return res.status(httpStatusCodes.OK).json({
				hasVoted,
				voteCounted: participation.voters.length,
			});
		} catch (error) {
			console.error(error);
			return res
				.status(httpStatusCodes.SERVER_ERROR)
				.json({ error: "Impossible de vérifier le statut du vote." });
		}
	},
};
