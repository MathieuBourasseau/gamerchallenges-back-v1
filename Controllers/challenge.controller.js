import {
  Challenge,
  Game,
  Participation,
  User,
  sequelize,
} from "../Models/index.js";
import { fn, col, Op } from "sequelize";

export const challengeController = {
  async getAllChallenges(req, res) {
    try {
      const { gameId } = req.query; // facultatif : si on veut afficher le jeu associé
      const challenges = await Challenge.findAll({
        where: gameId ? { game_id: gameId } : undefined, // filtre optionnel pour afficher le jeu associé
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
        group: [
          // group pour éviter les doublons et n'afficher que les votes
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
						attributes: ["id", "cover"], // Get image bounded to the game
					},
					{
						model: User,
						as: "creator",
						attributes: ["id", "username"], // Get the creator that posted the challenge
					},
				],
			});

			// Error message sent if the challenge does not exist
			if (!challenge) {
				console.error("Le challenge demandé n'existe pas.");
				return res
					.status(404)
					.json({ error: "Le challenge demandé n'existe pas." });
			}

			// Sent to front the challenge selected
			return res.status(200).json(challenge);
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

			res.json(userChallenges);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
