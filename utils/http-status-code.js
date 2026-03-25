export const httpStatusCodes = {
	OK: 200,
	CREATED: 201,
	REDIRECT: 301,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500
};

export const responseMessages = {
	[httpStatusCodes.OK]: "Opération réussie.",
	[httpStatusCodes.CREATED]: "Ressource créée avec succès.",
	[httpStatusCodes.BAD_REQUEST]: "Requête invalide.",
	[httpStatusCodes.FORBIDDEN]: "Accès refusé.",
	[httpStatusCodes.NOT_FOUND]: "Ressource non trouvée.",
	[httpStatusCodes.CONFLICT]: "Conflit avec une ressource existante",
	[httpStatusCodes.SERVER_ERROR]: "Une erreur interne au serveur est survenue."
};
