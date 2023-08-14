import Joi from "joi";

export const serviceSchema = Joi.object({
  name: Joi.string().required(),
  photo: Joi.string().required(),
  description: Joi.string().required(),
});
