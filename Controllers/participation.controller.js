import { User, Challenge, Participation, Game } from "../Models/index.js";

export const participationController = {

	//  User's participations
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

	// Get participations bound to a challenge 
	async getParticipationsByChallenge(req, res) {

		try {

			// Catch id from params
			const { id } = req.params;

			// Search challenge and participation bound to it
			const challenge = await Challenge.findByPk(id, {
				include: "participations"
			});

			// If the challenge does not exist 
			if (!challenge) {
				console.error("L'id du challenge demandé n'existe pas.")
				return res.status(404).json({ error: "Le challenge demandé n'existe pas." })
			};

			return res.status(200).json(challenge)

		} catch (error) {

			console.error("Erreur de serveur lors de la recherche d'une participation à un challenge", error.message);
			return res.status(500).json({ error: "Un problème est survenu avec le serveur."});

		}
	}
};
