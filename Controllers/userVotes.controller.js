import { User, Participation } from "../models/index.js";

export const userVotesController = {
	// Vote for a participation
	async addVote(req, res) {
		try {
			const { participationId } = req.params;
			const userId = req.user.id;

			if (!participationId)
				return res.status(400).json({ message: "participationId requis" });

			const participation = await Participation.findByPk(participationId, {
				include: { model: User, as: "voters" },
			});
			if (!participation)
				return res.status(404).json({ message: "Participation non trouvée" });

			if (participation.user_id === userId) {
				return res.status(403).json({
					message: "Vous ne pouvez pas voter pour votre propre participation",
				});
			}

			const hasVoted = participation.voters.some(
				(voter) => voter.id === userId,
			);
			if (hasVoted)
				return res
					.status(400)
					.json({ message: "Vous avez déjà voté pour cette participation" });

			await participation.addVoter(userId);
			res.status(201).json({ message: "Vote ajouté avec succès" });
		} catch (error) {
			res.status(500).json({ error: "Erreur serveur", message: error.message });
		}
	},

	// Delete a vote
	async removeVote(req, res) {
		try {
			const { participationId } = req.params;
			const userId = req.user.id;

			const participation = await Participation.findByPk(participationId);
			if (!participation)
				return res.status(404).json({ message: "Participation non trouvée" });

			await participation.removeVoter(userId);
			res.status(200).json({ message: "Vote retiré avec succès" });
		} catch (error) {
			res.status(500).json({ error: "Erreur serveur", message: error.message });
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
			if (!participation)
				return res.status(404).json({ message: "Participation non trouvée" });

			const hasVoted = participation.voters.some(
				(voter) => voter.id === userId,
			);
			res.status(200).json({ hasVoted });
		} catch (error) {
			res.status(500).json({ error: "Erreur serveur", message: error.message });
		}
	},
};
