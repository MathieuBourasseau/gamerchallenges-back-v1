import { User } from "../Models/index.js";
import argon2 from "argon2";

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
	//   const { username, email, password } = req.body;
	//   const user = await User.findOne({ where: { username: username } });
	//   if (!user || user.password !== password) {
	//     return res.status(401).json({ error: 'Utilisateur non valide' });
	//   }
	// },

	// Liste de tous les users
	async getAllUsers(req, res) {
		try {
			const users = await User.findAll({
				attributes: ["id", "username", "avatar"],
			});

			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

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

	async deleteUser(req, res) {
		try {
			const { id } = req.params;

			const deletedCount = await User.destroy({ where: { id } });

			if (deletedCount === 0) {
				return res.status(404).json({ error: "Utilisateur non trouvé" });
			}

			return res.status(200).json({ message: "Compte supprimé avec succès" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error: "Une erreur est survenue lors de la suppression du compte",
			});
		}
	},

	// ⚠️ method to complete with security before validating changes in "mon compte", according to the auth method
	async editUserAccount(req, res) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ error: "L'ID utilisateur est requis" });
			}

			const user = await User.findByPk(id);
			if (!user)
				return res.status(404).json({ error: "Utilisateur non trouvé" });

			const validatedData = { ...req.body };

			if (req.file) {
				validatedData.avatar = req.file.path;
			}

			if (validatedData.password) {
				validatedData.password = await argon2.hash(validatedData.password);
			}

			await user.update(validatedData);

			res.status(200).json({ user });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: "Erreur lors de la modification des informations" });
		}
	},
};
