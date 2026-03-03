import {
	Challenge,
	Game,
	Participation,
	User,
	sequelize,
} from "../Models/index.js";
import { fn, col } from "sequelize";

export const challengeController = {
	async getAllChallenges(req, res) {
		try {
			const challenges = await Challenge.findAll({
				include: [
					{
						model: Game,
						as: "game",
						attributes: ["id", "title", "cover"],
					},
					// Créateur du challenge
					{
						model: User,
						as: "creator",
						attributes: ["id", "username", "avatar"],
					},
					// Participations associées
					{
						model: Participation,
						as: "participations",
						attributes: [
							"id",
							"title",
							"url",
							// Compter le nombre de votes par participation
							[fn("COUNT", col("participations->voters.id")), "voteCount"],
							// on cible la colonne id des personnes qui ont voté pour cette participation puis on affiche le total
						],
						include: [
							// Joueur ayant soumis sa participation
							{
								model: User,
								as: "player",
								attributes: ["id", "username", "avatar"],
							},
							// Votes sur cette participation
							{
								model: User,
								as: "voters",
								attributes: [], // est-ce qu'on veut afficher le détail des votants ? Si oui, ajouter id et username
								through: { attributes: [] }, // supprime les infos de la table de liaison
							},
						],
					},
				],
				group: [ // group pour éviter les doublons et n'afficher que les votes
					"Challenge.id",
					"game.id",
					"creator.id",
					"participations.id",
					"participations->player.id",
				],
				// order: sequelize.random(), on verra pour le tri avec les copains
			});

			res.json(challenges);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
