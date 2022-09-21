module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      creator_id: DataTypes.INTEGER,
      resource_id: DataTypes.INTEGER,
      resource: DataTypes.STRING,
      action: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      tableName: "activities",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Activity.associate = function (models) {
    Activity.belongsTo(models.User, {
      foreignKey: "creator_id",
      as: "creator",
    });
  };
  return Activity;
};
