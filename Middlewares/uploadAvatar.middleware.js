import multer from "multer";
import path from "path";

// Store files in a RELATIVE folder (not absolute)
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Folder served by Express: /uploads/avatars
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "avatar-" + unique + ext);
  },
});

// Allow only image formats
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("File type not allowed"));
};

export const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter,
});
