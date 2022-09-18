import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password.toString(), 10);
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
