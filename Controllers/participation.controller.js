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
	getParticipationsByChallenge (req, res) {
		
	}
};
