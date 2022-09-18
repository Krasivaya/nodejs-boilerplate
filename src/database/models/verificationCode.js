module.exports = (sequelize, DataTypes) => {
  const VerificationCode = sequelize.define(
    "VerificationCode",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      code: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "verification_codes",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return VerificationCode;
};
