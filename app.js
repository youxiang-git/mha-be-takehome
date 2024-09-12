const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});
