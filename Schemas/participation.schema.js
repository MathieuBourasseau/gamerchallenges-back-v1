import Joi from "joi";

const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

 export const participationSchema = Joi.object({
    title: Joi.string().trim().min(6).required(),
    url: Joi.string().uri().pattern(youtubeRegex).required(),
});