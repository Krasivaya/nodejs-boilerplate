import { Joi } from "celebrate";

export const signupRule = Joi.object().keys({
  first_name: Joi.string().max(30).required(),
  last_name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().max(15).required(),
  birth_date: Joi.date(),
});
