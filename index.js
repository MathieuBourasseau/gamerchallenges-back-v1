import "dotenv/config";
import express from "express";
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import { apiRouter } from "./Routers/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(xss());

app.use(apiRouter);

app.listen(PORT, () => {
	console.log(`GamerChallenges is "streaming" 🎮 on http://localhost:${PORT}`);
});
