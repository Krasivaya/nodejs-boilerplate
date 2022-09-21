import { celebrate, Joi } from "celebrate";

export const createOneRule = Joi.object().keys({
  first_name: Joi.string().max(30).required(),
  last_name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const getAllRule = Joi.object().keys({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
  order: Joi.string().valid("ASC", "DESC").default("DESC"),
});

export const getOneRule = Joi.object().keys({
  id: Joi.number().integer().required(),
});

export const updateOneRule = celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    first_name: Joi.string().max(30),
    last_name: Joi.string().max(30),
    gender: Joi.string().max(15),
    birth_date: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
