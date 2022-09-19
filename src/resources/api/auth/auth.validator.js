import { Joi } from "celebrate";

export const signupRule = Joi.object().keys({
  first_name: Joi.string().max(30).required(),
  last_name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().max(15),
  birth_date: Joi.date(),
});

export const loginRule = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordRule = Joi.object().keys({
  old_password: Joi.string().required(),
  new_password: Joi.string().required(),
});

export const resetCodeRule = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const resetPasswordRule = Joi.object().keys({
  password: Joi.string().required(),
  confirm_password: Joi.string().required(),
  code: Joi.number().required(),
});
