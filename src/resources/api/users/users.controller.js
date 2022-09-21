import { User } from "../../../database/models";
import { comparePassword, hashPassword } from "../../../helpers/auth";

export const createOne = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword("12345"),
  });

  return res.status(201).json({
    status: 201,
    message: "User has been created successfully",
  });
};

export const getAll = async (req, res) => {
  const { page = 1, limit = 100, order = "DESC" } = req.query;
  const offset = limit * (page - 1);

  const users = await User.findAndCountAll({
    order: [["created_at", order]],
    offset,
    limit,
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "gender",
      "birth_date",
      "age",
      "created_at",
      "updated_at",
    ],
  });

  const pages = Math.ceil(users.count / limit);

  const meta = {
    total: users.count,
    page,
    pages,
  };

  return res.status(200).json({
    status: 200,
    data: users.rows,
    meta,
  });
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "gender",
      "birth_date",
      "age",
      "created_at",
      "updated_at",
    ],
  });

  return res.status(200).json({
    status: 200,
    data: user,
  });
};

export const updateOne = async (req, res) => {
  const {
    body: { first_name, last_name, email, birth_date, gender },
    currentUser: { email: currentUserEmail },
  } = req;

  if (currentUserEmail !== email) {
    return res.status(403).json({
      status: 403,
      message: "Wrong email or password",
    });
  }

  await User.update(
    {
      first_name,
      last_name,
      birth_date,
      gender,
    },
    { where: { email: currentUserEmail }, individualHooks: true }
  );

  return res.status(200).json({
    status: 200,
    message: "User have been updated successully",
  });
};
