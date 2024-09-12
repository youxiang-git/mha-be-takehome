const { v4: uuidv4 } = require("uuid");

function fetchDataOnStartup(data) {
	const dataWithId = data.map((entry) => {
		return {
			id: uuidv4(),
			...entry,
		};
	});
	return dataWithId;
}

module.exports = { fetchDataOnStartup };
