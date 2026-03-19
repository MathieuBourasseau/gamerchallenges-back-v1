import {
	Challenge,
	Game,
	Participation,
	User,
	sequelize,
} from "../Models/index.js";
import { fn, col, Op } from "sequelize";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const challengeController = {
	async getAllChallenges(req, res) {
		try {
			const challenges = await Challenge.findAll({
				// order: sequelize.random(), on verra pour le tri avec les copains
				include: [
					{
						model: Game,
						as: "game",
						attributes: ["id", "title", "cover"],
					},
					{
						model: User,
						as: "creator",
						attributes: ["id", "username"],
					},
				],
			});

			res.json(challenges);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	//  --- METHOD TO GET A CHALLENGE BY ITS ID ---
	//  --- METHOD TO GET A CHALLENGE BY ITS ID ---
	async getChallengeById(req, res) {
		try {
			// Get id from params
			const { id } = req.params;

			// Check if the challenge is existing in DB
			const challenge = await Challenge.findByPk(id, {
				// The attributes configuration calculating the global COUNT has been removed
				// because it conflicts with the "group by participations.id" below.
				// We will calculate the total in JavaScript instead.
				include: [
					// Include Game model to get the image associated
					{
						model: Game,
						as: "game",
						attributes: ["id", "cover"],
					},
					// Include Participation model to get videos participations associated to it
					{
						model: Participation,
						as: "participations",
						attributes: [
							"id",
							"url",
							// Calculate the vote count per participation and save it in "voteCounted"
							// This COUNT works perfectly because it respects the "group: ['participations.id']"
							[fn("COUNT", col("participations->voters.id")), "voteCounted"],
						],

						// Include User model to get the voters on each participation
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
				// Group by these IDs to ensure the COUNT function calculates the total
				// without merging all participations or game info into a single row.
				group: [
					"Challenge.id", // Keep the main challenge unique
					"game.id", // Keep associated game info linked
					"participations.id", // Prevent the list of participation videos from being collapsed
				],

				// Disable subqueries to allow the COUNT function to access
				// the joined tables (Participations -> Voters) directly.
				subQuery: false,
			});

			// Error message sent if the challenge does not exist
			if (!challenge) {
				console.error("Le challenge demandé n'existe pas.");
				return res
					.status(404)
					.json({ error: "Le challenge demandé n'existe pas." });
			}

			// Convert the Sequelize instance into a plain JavaScript object
			// to allow us to modify it and add the new total property
			const challengeData = challenge.toJSON();

			// Calculate the total number of votes for the entire challenge
			// We use .reduce() to iterate over the participations array and sum all the 'voteCounted'
			challengeData.totalChallengeVotes = challengeData.participations.reduce(
				(total, participation) => {
					// We cast to Number() because PostgreSQL COUNT results can sometimes be returned as strings by Sequelize
					return total + Number(participation.voteCounted);
				},
				0 // 0 is the initial value of the 'total' accumulator
			);

			// Sent to front the challenge selected, including the new calculated total
			return res.status(200).json(challengeData);

		} catch (error) {
			console.error("Erreur lors de la recherche du challenge", error.message);
			return res
				.status(500)
				.json({ error: "Un problème est survenu avec le serveur." });
		}
	},

	//  les challenges créés par un user
	async getChallengesByUser(req, res) {
		try {
			const { id } = req.params;

			const user = await User.findByPk(id);
			if (!user) {
				return res.status(404).json({ message: "User non trouvé" });
			}

			const userChallenges = await Challenge.findAll({
				where: { user_id: id },
				include: [
					{
						model: Game,
						as: "game",
						attributes: ["id", "title", "cover"],
					},
				],
			});

			res.status(httpStatusCodes.OK).json(userChallenges);

		} catch (error) {
			console.error(error);
			res.status(httpStatusCodes.SERVER_ERROR).json({
				status: httpStatusCodes.SERVER_ERROR,
				message: responseMessages[httpStatusCodes.SERVER_ERROR],
			});
		}
	},
};
