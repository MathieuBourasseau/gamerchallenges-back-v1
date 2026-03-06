import { User } from "../Models/index.js";

export const userController = {
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
};
