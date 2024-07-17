

"use strict";

const { Sequelize, DataTypes } = require("sequelize");
// connection
const sequelize = new Sequelize(
  "sqlite:" + (process.env.SQLITE || "./db.sqlite3"),
);

const Todo = sequelize.define("todos", {
  // id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     unique: true,
  //     defaultValue: 0
  //     // autoIncrement: true,
  //     // primaryKey: true,
  //     // comment: 'yorum ekleyebiliriz',
  //     // field: 'custom field name'
  // },
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },

  description: DataTypes.TEXT,
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// sequelize.sync({alter:true})

sequelize
  .authenticate()
  .then(() => console.log("** db connected **"))
  .catch(() => console.log("** db not connected **"));


module.exports = Todo