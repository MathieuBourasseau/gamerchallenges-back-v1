import { Participation, Challenge, Game, sequelize } from "../Models/index.js";

export const homeController = {
  async getBestParticipations(req, res) {
    try {
      const topParticipations = await Participation.findAll({
        attributes: {
          include: [
            [
              // Bon, avec un peu d'aide... apparemment sequelize ne sait pas compter les votes dans une relation many-to-many, donc on utilise une "sous-requête" (???) SQL pour calculer un champ "voteCount" à partir de la table de liaison "vote_participation"...
              // Sequelize NE PEUT PAS(quel incapable...mdr)compter automatiquement les votes dans une relation many-to-many .
              sequelize.literal(`(
                SELECT COUNT(*)
                FROM vote_participation AS vp
                WHERE vp.participation_id = "Participation"."id"
              )`),
              "voteCount",
            ],
          ],
        },

        // On inclut le challenge lié à la participation avec les champs dont on a besoin et aussi le jeu lié au fameux challenge (ici pas bsoin des descriptions pour le template de l'accueil)
        include: [
          {
            model: Challenge,
            as: "challenge",
            attributes: ["id", "name"],
            include: [
              {
                model: Game,
                as: "game",
                attributes: ["id", "title", "cover"],
              },
            ],
          },
        ],
        // ensuite on fait le tri des participations en fonction du nbre de votes, ici avec "votecount" qui est crée dans notre sous-requête plus haut
        order: [[sequelize.literal(`"voteCount"`), "DESC"]],

        // et on limite aux 3 meilleures participations
        limit: 3,
      });

      res.json(topParticipations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
// Punaise c'etait pas évident de faire ça j'ai vraiment dû m'aider avec une IA pour faire cette fameuse "sous-requête" SQL pour compter les votes ... arrachage de cheveux ....
