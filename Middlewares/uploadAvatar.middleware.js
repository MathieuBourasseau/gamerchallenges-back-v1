// Spoiler alert: oui j'ai absolument copié ce middleware depuis Blablabook

import multer from "multer";
import path from "path";

const avatarStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.join(process.cwd(), "uploads", "avatars");
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, "avatar-" + uniqueSuffix + ext);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
	if (allowedTypes.includes(file.mimetype)) cb(null, true);
	else cb(new Error("Type de fichier non autorisé"));
};

const avatarUpload = multer({ storage: avatarStorage, fileFilter });

export default avatarUpload;
