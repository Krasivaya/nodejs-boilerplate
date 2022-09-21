import { User, Activity } from "../../../database/models";
import { hashPassword } from "../../../helpers/auth";

export const createOne = async (req, res) => {
  const {
    body: { first_name, last_name, email },
    currentUser,
  } = req;

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword("12345"),
  });

  await Activity.create({
    creator_id: currentUser.id,
    resource_id: newUser.id,
    resource: "user",
    action: "Created",
    description: `${currentUser.first_name} ${currentUser.last_name} created a new user ${first_name} ${last_name}`,
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
    currentUser,
  } = req;

  const user = await User.findOne({ where: { email } });

  await user.update(
    {
      first_name,
      last_name,
      birth_date,
      gender,
    },
    { where: { email: currentUser.email }, individualHooks: true }
  );

  await Activity.create({
    creator_id: currentUser.id,
    resource_id: user.id,
    resource: "user",
    action: "Updated",
    description: `${currentUser.first_name} ${currentUser.last_name} updated profile information`,
  });

  return res.status(200).json({
    status: 200,
    message: "User have been updated successully",
  });
};
