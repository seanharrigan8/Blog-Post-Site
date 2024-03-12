// match the user js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Post extends Model {}
// create the Post model

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Pass the sequelize instance here
    freezeTableName: true,
    underscored: true,
    modelName: "post",
    timestamps: false,
  }
);

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});



module.exports = Post;
