const express = require("express");
const pinoHttp = require("pino-http");
const pino = require("pino");
const { v4: uuidv4 } = require("uuid");
const { schema, idReqSchema } = require("./lib/schema");
const { StatsService } = require("./lib/StatsService");
const localData = require("./data.json");
const { fetchDataOnStartup } = require("./lib/utils");

const app = express();
const logger = pino({
	transport: {
		target: "pino-pretty",
	},
});
const pinoHttpLogger = pinoHttp({ logger });
const port = 8080;
const statsService = new StatsService();
const injectStatsService = (statsService) => (req, res, next) => {
	req.statsService = statsService;
	next();
};

app.data = [];

// Middleware declared here
app.use(express.json()); // Use express.json to automatically parse request body to JSON format
app.use(pinoHttpLogger); // Use pino-http to automatically log all request to our backend
app.use(injectStatsService(statsService)); // Custom Middleware for Dependency Injection

try {
	app.data = fetchDataOnStartup(localData);
	logger.info("Data has been loaded");
} catch (e) {
	logger.error("Error loading local data: ", e);
	return;
}

app.get("/", (req, res) => {
	const searchId = req.query.id;
	if (!searchId) return res.json(app.data);

	const entryById = app.data.find((entry) => entry.id === searchId);

	if (!entryById) {
		return res
			.status(404)
			.json({ error: `Entry with ${searchId} not found!` });
	}
	return res.json(entryById);
});

app.get("/:user", (req, res) => {
	const searchUser = req.params.user;
	if (!searchUser)
		return res
			.status(400)
			.json({ error: "Please provide a username to filter by!" });

	const userEntries = app.data.filter((entry) => entry.user === searchUser);

	const userEntriesWithStats = req.statsService.generateAllStats(userEntries);

	if (!userEntries || userEntries.length === 0) {
		return res.status(404).json({ error: `User ${searchUser} not found!` });
	}
	return res.json(userEntriesWithStats);
});

app.post("/", (req, res) => {
	const { error } = schema.validate(req.body);

	if (error) {
		logger.error(error);
		return res.status(400).json({ error: error.message });
	}

	app.data = [...app.data, { id: uuidv4(), ...req.body }];

	return res.json(req.body);
});

app.delete("/", (req, res) => {
	const { error } = idReqSchema.validate(req.query);

	if (error) {
		logger.error(error);
		return res.status(400).json({
			error: error.message,
		});
	}

	const searchId = req.query.id;
	const entryToDelete = app.data.find((entry) => entry.id === searchId);

	if (!entryToDelete)
		return res.status(404).json({ error: "Entry not found!" });

	app.data = app.data.filter((entry) => entry.id !== searchId);

	return res
		.status(200)
		.json({ message: "Entry has been successfully deleted!" });
});

if (!module.parent) {
	app.listen(port, () => {
		logger.info(`Server running on port: ${port}`);
	});
}

module.exports = app;
