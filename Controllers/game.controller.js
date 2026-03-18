import { Game, Challenge } from "../Models/index.js";
import { Sequelize } from "sequelize";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

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

			res.status(httpStatusCodes.OK).json({
				page,
				totalPages,
				totalGames,
				games,
			});
		} catch (error) {
			console.error("Erreur Sequelize :", error);
			res.status(httpStatusCodes.SERVER_ERROR).json({
					status: responseMessages[httpStatusCodes.SERVER_ERROR],
					error: "Erreur lors de la récupération des jeux"
				});
		}
	},

	async getGameById(req, res) {
		
		try {

			const game = await Game.findByPk(req.params.id, {
				include: [
					{
						model: Challenge,
						as: "challenges",
						attributes: ["id", "name", "created_at"],
						// order: [["created_at", "DESC"]],
					},
				],
			});

			if (!game) return res.status(httpStatusCodes.NOT_FOUND).json({
				status: httpStatusCodes.NOT_FOUND, 
				error: "Jeu non trouvé" 
			});

			res.status(httpStatusCodes.OK).json(game);

		} catch (error) {
			res.status(500).json({
				status: httpStatusCodes.SERVER_ERROR,
				error: "Erreur lors de la récupération des jeux"
			});
		}
	},
};
