import Game from "../Models/index.js";
import { Sequelize } from "sequelize";

export const gameController = {
	async getAllGames(req, res) {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 6;
		const offset = (page - 1) * limit;

		try {
			const games = await Game.findAll({
				order: [["release_date", "ASC"]],
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
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des jeux" });
		}
	},
};
