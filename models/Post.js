//match the user js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}
//create the Post model

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
    // user_Id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
