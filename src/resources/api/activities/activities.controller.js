import { Activity, User } from "../../../database/models";

export const getAll = async (req, res) => {
  const { page = 1, limit = 100, order = "DESC" } = req.query;
  const offset = limit * (page - 1);

  const activities = await Activity.findAndCountAll({
    order: [["created_at", order]],
    offset,
    limit,
    include: [
      {
        model: User,
        as: "creator",
        require: false,
        attributes: ["id", "first_name", "last_name", "email"],
      },
    ],
  });

  const pages = Math.ceil(activities.count / limit);

  const meta = {
    total: activities.count,
    page,
    pages,
  };

  return res.status(200).json({
    status: 200,
    data: activities.rows,
    meta,
  });
};
