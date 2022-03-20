import Joi from "joi";

const userData = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().max(8).min(4).required()
});

export { userData };