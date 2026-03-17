export const httpStatusCodes = {
	OK: 200,
	CREATED: 201,
	REDIRECT: 301,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500
};

export const responseMessages = {
	[httpStatusCodes.OK]: "Opération réussie.",
	[httpStatusCodes.CREATED]: "Ressource créée avec succès.",
	[httpStatusCodes.FORBIDDEN]: "Accès refusé.",
	[httpStatusCodes.NOT_FOUND]: "Ressource non trouvée.",
	[httpStatusCodes.SERVER_ERROR]: "Une erreur interne est survenue."
};
