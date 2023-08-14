import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
