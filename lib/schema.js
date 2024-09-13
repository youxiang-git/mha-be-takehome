const Joi = require("joi");

const schema = Joi.object({
	user: Joi.string().alphanum().min(5).max(10).required(),
	startDateTime: Joi.date().required(),
	endDateTime: Joi.date()
		.max("now")
		.greater(Joi.ref("startDateTime"))
		.required(),
});

const idReqSchema = Joi.object({
	id: Joi.string().uuid().required(),
});

module.exports = { schema, idReqSchema };
