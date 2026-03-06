import { User } from "../Models/index.js";

export const userController = {
	// modèle Blablabook pouvant servir pour la partie register/login
	// async createUser(req, res) {
	//   try {
	//     const data = Joi.attempt(req.body, createUserSchema);
	//     const user = await User.create(data);
	//     res.status(201).json(user);
	//   } catch (error) {
	//     console.error(error);
	//     res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
	//   }
	// },

	// async loginUser(req, res) {
	//   const { username, password } = req.body;
	//   const user = await User.findOne({ where: { username: username } });
	//   if (!user || user.password !== password) {
	//     return res.status(401).json({ error: 'Utilisateur non valide' });
	//   }
	// },

	//  get all user infos
	async getUserById(req, res) {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id, {
				attributes: [
					"id",
					"username",
					"email",
					"avatar",
					"favouriteGame",
					"twitch",
					"youtube",
					"discord",
				],
			});
			if (!user) {
				return res.status(404).json({ message: "User non trouvé" });
			}
			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	// delete user
	async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const authUserId = req.user.id;

			if (parseInt(id) !== authUserId) {
				return res
					.status(403)
					.json({ error: "Vous ne pouvez pas supprimer ce compte" });
			}

			const deletedCount = await User.destroy({ where: { id } });

			if (deletedCount === 0) {
				return res.status(404).json({ error: "Utilisateur non trouvé" });
			}

			return res.status(200).json({ message: "Compte supprimé avec succès" });
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({
					error: "Une erreur est survenue lors de la suppression du compte",
				});
		}
	},
};
