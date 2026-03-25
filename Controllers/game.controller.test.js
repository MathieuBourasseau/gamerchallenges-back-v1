import { jest, test, describe, beforeEach, expect } from "@jest/globals";
import { gameController } from "./game.controller.js";
import { Game } from "../Models/index.js";

// mock = fake request

describe("gameController.getAllGames", () => {
	// Run before each test to reset all mocks
	beforeEach(() => {
		jest.restoreAllMocks(); // reset any previous spies/mocks
	});

	test("returns list of games with pagination", async () => {
		// Mock Game.findAll to return games
		jest.spyOn(Game, "findAll").mockResolvedValue([
			{ id: 1, title: "Jeu 1" },
			{ id: 2, title: "Jeu 2" },
		]);

		// Mock Game.count to return total number of games
		jest.spyOn(Game, "count").mockResolvedValue(2);

		// Create a fake request object with query params
		const req = {
			query: { page: "1", limit: "2" }, // pagination params
			session: {}, // empty session to avoid errors
		};

		// Create a fake response object with json & status functions
		const res = {
			json: jest.fn(), // mock json function to track calls
			status: jest.fn().mockReturnThis(), // mock status function to chain .json
		};

		// Call the controller function with fake req & res
		await gameController.getAllGames(req, res);

		// Check that Game.findAll was called with correct arguments
		expect(Game.findAll).toHaveBeenCalledWith({
			order: [["title", "ASC"]], // ordering by title ascending
			limit: 2, // limit from query
			offset: 0, // calculated offset (page 1)
		});

		// Check that Game.count was called
		expect(Game.count).toHaveBeenCalled();

		// Check that res.json was called with correct response
		expect(res.json).toHaveBeenCalledWith({
			page: 1, // current page
			totalPages: 1, // total pages calculated from totalGames / limit
			totalGames: 2, // total games returned by count
			games: [
				// list of games returned by findAll
				{ id: 1, title: "Jeu 1" },
				{ id: 2, title: "Jeu 2" },
			],
		});
	});
});

// 'npm test' in terminal
