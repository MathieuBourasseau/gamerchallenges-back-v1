import { User } from "../Models/index.js";
import argon2 from "argon2";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const userController = {
  // Since we now have a dedicated authentication controller, the existing methods in this controller
  // are considered admin-level operations.
  // Below are the new methods allowing a regular user to manage their own account via /me routes.

  async updateMe(req, res) {
    try {
      const userId = req.user.id;

      // Fetch user
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }

      // Clone request body
      const validatedData = { ...req.body };

      // If avatar uploaded → store RELATIVE path
      if (req.file) {
        validatedData.avatar = `uploads/avatars/${req.file.filename}`;
      }

      // Hash password if updated
      if (validatedData.password) {
        validatedData.password = await argon2.hash(validatedData.password);
      }

      // Update user
      await user.update(validatedData);

      // Build public avatar URL
      let avatarUrl = null;
      if (user.avatar) {
        avatarUrl = `${req.protocol}://${req.get("host")}/${user.avatar}`;
      }

      // Return updated user with full avatar URL
      return res.status(httpStatusCodes.OK).json({
        ...user.toJSON(),
        avatar: avatarUrl,
      });
    } catch (error) {
      console.error("updateMe error:", error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
          status: httpStatusCodes.SERVER_ERROR,
          error: "Erreur lors de la mise à jour de l'utilisateur" 
      });
    }
  },

  // Change his own password :
  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }

      // Verify old password
      const isMatch = await argon2.verify(user.password, oldPassword);
      if (!isMatch) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({ 
            status: httpStatusCodes.BAD_REQUEST,
            error: "L'ancien mot de passe est incorrect" 
        });
      }

      // Hash new password
      const hashedPassword = await argon2.hash(newPassword);

      // Update user password
      await user.update({ password: hashedPassword });

      return res.status(httpStatusCodes.OK).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      console.error("changePassword error:", error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
          status: httpStatusCodes.SERVER_ERROR,
          error: "Erreur lors du changement de mot de passe" 
      });
    }
  },

  // Delete his own account :
  async deleteMe(req, res) {
    try {
      const userId = req.user.id;
      const deletedCount = await User.destroy({ where: { id: userId } });

      if (deletedCount === 0) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }

      return res.status(httpStatusCodes.OK).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: "Une erreur est survenue lors de la suppression du compte",
      });
    }
  },
  
  // All users list
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "avatar"],
      });

      return res.status(httpStatusCodes.OK).json(users);
    } catch (error) {
      console.error(error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
          status: httpStatusCodes.SERVER_ERROR,
          error: responseMessages[httpStatusCodes.SERVER_ERROR] 
      });
    }
  },

  // get all user infos
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
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }
      
      return res.status(httpStatusCodes.OK).json(user);
    } catch (error) {
      console.error(error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
          status: httpStatusCodes.SERVER_ERROR,
          error: responseMessages[httpStatusCodes.SERVER_ERROR] 
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedCount = await User.destroy({ where: { id } });

      if (deletedCount === 0) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }

      return res.status(httpStatusCodes.OK).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: "Une erreur est survenue lors de la suppression du compte",
      });
    }
  },

  // ⚠️ method to complete with security before validating changes in "mon compte", according to the auth method
  async editUserAccount(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({ 
            status: httpStatusCodes.BAD_REQUEST,
            error: "L'ID utilisateur est requis" 
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ 
            status: httpStatusCodes.NOT_FOUND,
            error: "Utilisateur non trouvé" 
        });
      }

      const validatedData = { ...req.body };

      if (req.file) {
        validatedData.avatar = req.file.path;
      }

      if (validatedData.password) {
        validatedData.password = await argon2.hash(validatedData.password);
      }

      await user.update(validatedData);

      return res.status(httpStatusCodes.OK).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(httpStatusCodes.SERVER_ERROR).json({ 
          status: httpStatusCodes.SERVER_ERROR,
          error: "Erreur lors de la modification des informations" 
      });
    }
  },
};