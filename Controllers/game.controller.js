import { Game, Challenge, Participation, User } from "../Models/index.js";
import { fn, col, Sequelize } from "sequelize";

export const gameController = {
	async getAllGames(req, res) {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 6;
		const offset = (page - 1) * limit;

		try {
			const games = await Game.findAll({
				order: [["title", "ASC"]],
				limit,
				offset,
			});

			const totalGames = await Game.count();
			const totalPages = Math.ceil(totalGames / limit);

			res.json({
				page,
				totalPages,
				totalGames,
				games,
			});
		} catch (error) {
			console.error("Erreur Sequelize :", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des jeux" });
		}
	},

	async getGameById(req, res) {
		try {
			const game = await Game.findByPk(req.params.id, {
				include: [
					{
						model: Challenge,
						as: "challenges",
						attributes: [
							"id",
							"name",
							"created_at",
							// Total of votes on every participation of the challenge
							[
								fn("COUNT", col("challenges->participations->voters.id")),
								"totalVotes",
							],
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
					},
				],
				group: ["Game.id", "challenges.id"],
				subQuery: false,
			});

			if (!game) return res.status(404).json({ error: "Jeu non trouvé" });
			res.json(game);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
};
