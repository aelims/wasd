module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "likes",
    {
      likes_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,autoIncrement: true,
        allowNull: false,
      },

      // likes_count: {
      //   type: DataTypes.INTEGER,
      //   // autoIncrement: true,
      //   allowNull: false
      // }

    },

    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
};
