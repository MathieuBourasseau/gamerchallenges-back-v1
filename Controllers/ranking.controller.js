import { User, Participation } from "../Models/index.js";
import { fn, col } from "sequelize";

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
				subQuery: false, // évite les requêtes imbriquées et les bugs : une seule requête SQL avec tous les JOIN dans le FROM
			});

			res.json(ranking);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
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

			res.json(ranking);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
