const testGetData = [
	{
		id: "deb04d02-1c74-4415-91fd-ae4c53576640",
		user: "testuser1",
		startDateTime: "August 16, 2024 12:00:00",
		endDateTime: "August 16, 2024 12:01:00",
	},
	{
		id: "c8900553-2544-4e1f-aa84-be6d828e5d5b",
		user: "testuser2",
		startDateTime: "August 24, 2024 14:00:00",
		endDateTime: "August 24, 2024 14:02:00",
	},
	{
		id: "ab727e3e-8fb4-4d34-9f5f-fba719fe7f1e",
		user: "testuser3",
		startDateTime: "August 24, 2024 16:47:00",
		endDateTime: "August 24, 2024 16:57:00",
	},
];

const testPostValid = {
	user: "testuser4",
	startDateTime: "August 20, 2024 14:14:00",
	endDateTime: "August 20, 2024 14:14:30",
};

const testPostInvalidUser = {
	startDateTime: "August 20, 2024 14:14:00",
	endDateTime: "August 20, 2024 14:14:30",
};

const testPostInvalidTime = {
	user: "testuser3",
	startDateTime: "August 20, 2024 14:14:00",
	endDateTime: "August 20, 2024 14:13:30",
};

const testDeleteValid = "c8900553-2544-4e1f-aa84-be6d828e5d5b";
const testDeleteInvalid404 = "cf2492fa-b05a-4092-9a39-c941a00d9341";

module.exports = {
	testGetData,
	testPostValid,
	testPostInvalidUser,
	testPostInvalidTime,
	testDeleteValid,
	testDeleteInvalid404,
};
