const request = require("supertest");

const {
	testGetData,
	testPostValid,
	testPostInvalidUser,
	testPostInvalidTime,
	testDeleteValid,
	testDeleteInvalid404,
} = require("./app.test.data");

describe("Tests for Express API Endpoints", function () {
	let expect;
	beforeEach(async function () {
		const chai = await import("chai");
		expect = chai.expect;
		app = require("../app");
		app.data = testGetData;
	});

	describe("GET /", function () {
		it("should return all entries when no ID is provided", function (done) {
			request(app)
				.get("/")
				.expect("Content-Type", /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.an("array").that.has.lengthOf(3);
					expect(res.body).to.deep.equal(testGetData);
					return done();
				});
		});

		it("should return a single entry if ID is provided", function (done) {
			request(app)
				.get("/?id=deb04d02-1c74-4415-91fd-ae4c53576640")
				.expect("Content-Type", /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.an("object");
					expect(res.body).to.deep.equal(testGetData[0]);
					return done();
				});
		});
	});

	describe("POST /", function () {
		it("should add new entry and return it", function (done) {
			request(app)
				.post("/")
				.send(testPostValid)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.deep.equal(testPostValid);
					done();
				});
		});

		it("should throw an error if the username is not provided", function (done) {
			request(app)
				.post("/")
				.send(testPostInvalidUser)
				.expect(400)
				.expect("Content-Type", /json/)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.error).to.equal('"user" is required');
					return done();
				});
		});

		it("should throw an error if the end time is earlier than the start time", function (done) {
			request(app)
				.post("/")
				.send(testPostInvalidTime)
				.expect(400)
				.expect("Content-Type", /json/)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.error).to.equal(
						'"endDateTime" must be greater than "ref:startDateTime"'
					);
					return done();
				});
		});
	});

	describe("DELETE /", function () {
		it("should delete the entry with the id provided", function (done) {
			request(app)
				.delete(`/?id=${testDeleteValid}`)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.deep.equal({
						message: "Entry has been successfully deleted!",
					});
					done();
				});
		});

		it("should throw an error if no id is provided", function (done) {
			request(app)
				.delete("/")
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.deep.equal({
						error: '"id" is required',
					});
					done();
				});
		});

		it("should throw a 404 error if id cannot be found", function (done) {
			request(app)
				.delete(`/?id=${testDeleteInvalid404}`)
				.expect(404)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.deep.equal({
						error: "Entry not found!",
					});
					done();
				});
		});

		it("should throw an error if id is not a valid uuid", function (done) {
			request(app)
				.delete(`/?id=123`)
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.deep.equal({
						error: '"id" must be a valid GUID',
					});
					done();
				});
		});
	});
});
