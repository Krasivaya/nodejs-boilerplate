import { Joi } from "celebrate";

export const getAllRule = Joi.object().keys({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
  order: Joi.string().valid("ASC", "DESC").default("DESC"),
});
