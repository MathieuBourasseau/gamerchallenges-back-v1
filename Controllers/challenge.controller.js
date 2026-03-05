import { Challenge, sequelize } from "../Models/index.js";

export const challengeController = {
	async getAllChallenges(req, res) {
		try {
			const challenges = await Challenge.findAll({
				// order: sequelize.random(), on verra pour le tri avec les copains
			});

			res.json(challenges);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	//  --- METHOD TO GET A CHALLENGE BY ITS ID ---
	async getOneChallenge(req, res) {

		try {

			// Get id from params 
			const { id } = req.params;

			// Check if the challenge is existing in DB
			const challenge = await Challenge.findByPk(id, {

				include: [
					{
						model: Game,
						as: "game",
						attributes: ["id", "cover"] // Get image bounded to the game 
					},
					{
						model: User,
						as: "creator",
						attributes: ["id", "username"] // Get the creator that posted the challenge
					}
				]
			});

			// Error message sent if the challenge does not exist
			if (!challenge) {
				console.error("Le challenge demandé n'existe pas.")
				return res.status(404).json({ error: "Le challenge demandé n'existe pas." })
			};

			// Sent to front the challenge selected
			return res.status(200).json(challenge);


		} catch (error) {
			console.error("Erreur lors de la recherche du challenge", error.message);
			return res.status(500).json({ error: "Un problème est survenu avec le serveur." });
		}
	}
};
