const express = require("express");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const localData = require("./data.json");
const { fetchDataOnStartup } = require("./utils");
const app = express();

const port = 3000;
let data = {};

const schema = Joi.object({
	user: Joi.string().alphanum().min(5).max(10).required(),
	startDateTime: Joi.date().required(),
	endDateTime: Joi.date()
		.max("now")
		.greater(Joi.ref("startDateTime"))
		.required(),
});

app.use(express.json());

app.get("/", (req, res) => {
	const searchId = req.query.id;
	if (!searchId) return res.json(data);

	const entryById = data.find((entry) => entry.id === searchId);

	if (!entryById) {
		return res
			.status(404)
			.json({ error: `Entry with ${searchId} not found!` });
	}
	return res.json(entryById);
});

app.get("/:id", (req, res) => {
	const searchId = req.params.id;
	const entryById = data.find((entry) => entry.id === searchId);

	if (!entryById) {
		return res
			.status(404)
			.json({ error: `Entry with ${searchId} not found!` });
	}
	return res.json(entryById);
});

app.post("/", (req, res) => {
	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	data = [...data, { id: uuidv4(), ...req.body }];

	return res.json(req.body);
});

app.delete("/", (req, res) => {
	const searchId = req.query.id;

	if (!searchId)
		return res.status(400).json({
			error: "Must provide the ID of entry to delete",
		});

	const entryToDelete = data.find((entry) => entry.id === searchId);

	if (!entryToDelete)
		return res.status(404).json({ error: "Entry not found!" });

	data = data.filter((entry) => entry.id !== searchId);

	return res
		.status(200)
		.json({ message: "Entry has been successfully deleted!" });
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);

	try {
		data = fetchDataOnStartup(localData);
		console.log("Data has been loaded");
	} catch (e) {
		console.log("Error loading local data");
		console.log(e);
		return;
	}
});
