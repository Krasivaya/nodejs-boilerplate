import moment from "moment";
import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: DataTypes.STRING,
      birth_date: {
        type: DataTypes.DATE,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get: () => Math.ceil(moment().diff(this.birth_date, "years")),
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  User.prototype.hashPassword = (password) => {
    return bcrypt.hashSync(password.toString(), 10);
  };

  User.prototype.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  };

  User.beforeCreate(async (user) => {
    if (user.birth_date) {
      const age = Math.ceil(moment().diff(this.birth_date, "years"));
      user.age = age;
    }
  });

  User.beforeUpdate(async (record) => {
    if (record.birth_date) {
      const age = Math.ceil(moment().diff(this.birth_date, "years"));
      record.age = age;
    }
  });

  return User;
};
