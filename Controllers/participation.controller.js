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
				return res.status(404).json({ error: "Le challenge demandé n'existe pas." })
			};

			return res.status(200).json(challenge)

		} catch (error) {

			console.error("Erreur de serveur lors de la recherche d'une participation à un challenge", error.message);
			return res.status(500).json({ error: "Un problème est survenu avec le serveur." });

		}
	},

	// Share participation with url
	async shareParticipation(req, res) {

		try {

			// Catch user id from request
			// const user_id = req.user

			const { title, url } = req.body;

			const participation = await Participation.create({
				title,
				url,
				// user_id
			});

			return res.status(201).json({ message: "Votre vidéo a été ajoutée ! " })

		} catch (error) {
			console.error("Erreur lors du partage de la participation", error.message);
			return res.status(500).json({ error: "Une erreur interne au serveur s'est produite. Veuillez réessayer ultérieurement." })
		}
	}

}
